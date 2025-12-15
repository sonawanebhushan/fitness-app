const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Pool } = require('pg');
const workoutProgram = require('./workout-data');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'workout-buddy-secret-key-2025';

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please login.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Create and assign token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true when using HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT username, name, age, weight, height, muscle_mass, body_fat, goal FROM users WHERE username = $1',
      [req.user.username]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      username: user.username,
      profile: {
        name: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        muscleMass: user.muscle_mass,
        bodyFat: user.body_fat,
        goal: user.goal
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error getting profile' });
  }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  console.log('PUT /api/profile called');
  console.log('User:', req.user.username);
  console.log('Request body:', req.body);

  try {
    const { age, weight, height, muscleMass, bodyFat, goal } = req.body;

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (age !== undefined) {
      updates.push(`age = $${paramCount++}`);
      values.push(age);
    }
    if (weight !== undefined) {
      updates.push(`weight = $${paramCount++}`);
      values.push(weight);
    }
    if (height !== undefined) {
      updates.push(`height = $${paramCount++}`);
      values.push(height);
    }
    if (muscleMass !== undefined) {
      updates.push(`muscle_mass = $${paramCount++}`);
      values.push(muscleMass);
    }
    if (bodyFat !== undefined) {
      updates.push(`body_fat = $${paramCount++}`);
      values.push(bodyFat);
    }
    if (goal !== undefined) {
      updates.push(`goal = $${paramCount++}`);
      values.push(goal);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Add updated_at timestamp
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    // Add username as last parameter
    values.push(req.user.username);

    const query = `
      UPDATE users
      SET ${updates.join(', ')}
      WHERE username = $${paramCount}
      RETURNING username, name, age, weight, height, muscle_mass, body_fat, goal
    `;

    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Updated profile:', user);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: {
        name: user.name,
        age: user.age,
        weight: user.weight,
        height: user.height,
        muscleMass: user.muscle_mass,
        bodyFat: user.body_fat,
        goal: user.goal
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/dashboard', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Workout tracker page
app.get('/workout-tracker', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'workout-tracker.html'));
});

// Calendar page
app.get('/calendar', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

// Get workout program data
app.get('/api/workout/program', authenticateToken, (req, res) => {
  res.json(workoutProgram);
});

// Get user's current workout status
app.get('/api/workout/status', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT current_phase, current_week FROM workout_status WHERE username = $1',
      [req.user.username]
    );
    const status = result.rows[0];

    if (!status) {
      return res.status(404).json({ error: 'Workout status not found' });
    }

    res.json({
      currentPhase: status.current_phase,
      currentWeek: status.current_week
    });
  } catch (error) {
    console.error('Get workout status error:', error);
    res.status(500).json({ error: 'Server error getting workout status' });
  }
});

// Update user's current workout status
app.put('/api/workout/status', authenticateToken, async (req, res) => {
  const { currentPhase, currentWeek } = req.body;

  try {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (currentPhase !== undefined) {
      updates.push(`current_phase = $${paramCount++}`);
      values.push(currentPhase);
    }
    if (currentWeek !== undefined) {
      updates.push(`current_week = $${paramCount++}`);
      values.push(currentWeek);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.user.username);

    const query = `
      UPDATE workout_status
      SET ${updates.join(', ')}
      WHERE username = $${paramCount}
      RETURNING current_phase, current_week
    `;

    const result = await pool.query(query, values);
    const status = result.rows[0];

    if (!status) {
      return res.status(404).json({ error: 'Workout status not found' });
    }

    res.json({
      success: true,
      currentPhase: status.current_phase,
      currentWeek: status.current_week
    });
  } catch (error) {
    console.error('Update workout status error:', error);
    res.status(500).json({ error: 'Server error updating workout status' });
  }
});

// Get workout logs for specific day
app.get('/api/workout/logs/:day', authenticateToken, async (req, res) => {
  const { day } = req.params;
  const { phase, week, date } = req.query;

  try {
    // Filter logs for the specific day (exercise IDs start with first 3 letters of day)
    const dayPrefix = day.substring(0, 3);

    let query = 'SELECT exercise_id, phase, week, sets, logged_at FROM workout_logs WHERE username = $1 AND exercise_id LIKE $2';
    const params = [req.user.username, `${dayPrefix}%`];

    // Optionally filter by phase
    if (phase) {
      query += ` AND phase = $${params.length + 1}`;
      params.push(parseInt(phase));
    }

    // Optionally filter by week
    if (week) {
      query += ` AND week = $${params.length + 1}`;
      params.push(parseInt(week));
    }

    // Optionally filter by specific date
    if (date) {
      query += ` AND logged_at::date = $${params.length + 1}::date`;
      params.push(date);
    }

    const result = await pool.query(query, params);

    // Convert to object format expected by frontend
    const dayLogs = {};
    result.rows.forEach(row => {
      // Use a key that includes phase for uniqueness
      const logKey = `${row.exercise_id}_p${row.phase}_w${row.week}`;
      dayLogs[row.exercise_id] = {
        phase: row.phase,
        week: row.week,
        sets: row.sets,
        date: row.logged_at
      };
    });

    res.json({ logs: dayLogs });
  } catch (error) {
    console.error('Get workout logs error:', error);
    res.status(500).json({ error: 'Server error getting workout logs' });
  }
});

// Save workout log for an exercise
app.post('/api/workout/logs', authenticateToken, async (req, res) => {
  const { exerciseId, phase, week, sets } = req.body;

  try {
    // Validate required fields
    if (!exerciseId || !phase || !week || !sets) {
      return res.status(400).json({ error: 'Missing required fields: exerciseId, phase, week, sets' });
    }

    // Use ON CONFLICT to update if already exists (upsert)
    await pool.query(
      `INSERT INTO workout_logs (username, exercise_id, phase, week, sets)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (username, exercise_id, phase, week)
       DO UPDATE SET sets = $5, logged_at = CURRENT_TIMESTAMP`,
      [req.user.username, exerciseId, parseInt(phase), parseInt(week), JSON.stringify(sets)]
    );

    res.json({
      success: true,
      message: 'Workout logged successfully'
    });
  } catch (error) {
    console.error('Save workout log error:', error);
    res.status(500).json({ error: 'Server error saving workout log' });
  }
});

// Get calendar view of workout logs for a specific month
app.get('/api/calendar/logs', authenticateToken, async (req, res) => {
  const { month, year } = req.query;

  try {
    if (!month || !year) {
      return res.status(400).json({ error: 'Month and year are required' });
    }

    // Get all workout logs for the user in the specified month
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = new Date(parseInt(year), parseInt(month), 0);
    const endDateStr = `${year}-${String(month).padStart(2, '0')}-${endDate.getDate()}`;

    const result = await pool.query(
      `SELECT exercise_id, phase, week, sets, logged_at
       FROM workout_logs
       WHERE username = $1 AND logged_at::date >= $2::date AND logged_at::date <= $3::date
       ORDER BY logged_at`,
      [req.user.username, startDate, endDateStr]
    );

    // Group logs by date
    const logsByDate = {};

    result.rows.forEach(row => {
      const dateStr = row.logged_at.toISOString().split('T')[0];

      if (!logsByDate[dateStr]) {
        logsByDate[dateStr] = {
          exercises: [],
          workoutTypes: new Set(),
          totalSets: 0,
          completedSets: 0
        };
      }

      // Parse exercise name and type from exercise_id
      const exerciseName = row.exercise_id;
      const sets = row.sets;

      let completedCount = 0;
      let totalCount = 0;

      if (Array.isArray(sets)) {
        totalCount = sets.length;
        completedCount = sets.filter(s => s.weight && s.reps).length;
      }

      logsByDate[dateStr].exercises.push({
        name: exerciseName,
        phase: row.phase,
        week: row.week,
        totalSets: totalCount,
        setsCompleted: completedCount
      });

      logsByDate[dateStr].totalSets += totalCount;
      logsByDate[dateStr].completedSets += completedCount;

      // Determine workout type from exercise_id prefix
      if (exerciseName.startsWith('mon')) logsByDate[dateStr].workoutTypes.add('monday');
      else if (exerciseName.startsWith('tue')) logsByDate[dateStr].workoutTypes.add('tuesday');
      else if (exerciseName.startsWith('wed')) logsByDate[dateStr].workoutTypes.add('wednesday');
      else if (exerciseName.startsWith('thu')) logsByDate[dateStr].workoutTypes.add('thursday');
      else if (exerciseName.startsWith('fri')) logsByDate[dateStr].workoutTypes.add('friday');
      else if (exerciseName.startsWith('sat')) logsByDate[dateStr].workoutTypes.add('saturday');
    });

    // Calculate completion percentage for each date
    Object.keys(logsByDate).forEach(date => {
      const data = logsByDate[date];
      data.completion = data.totalSets > 0
        ? (data.completedSets / data.totalSets) * 100
        : 0;
      data.workoutTypes = Array.from(data.workoutTypes);
    });

    res.json({ logs: logsByDate });
  } catch (error) {
    console.error('Get calendar logs error:', error);
    res.status(500).json({ error: 'Server error getting calendar logs' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║         Workout Buddy Server Running!                 ║
╚════════════════════════════════════════════════════════╝

Server URL: http://localhost:${PORT}

User Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
User 1:
  Username: amar
  Password: amar123!@#

User 2:
  Username: prem
  Password: prem456$%^
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open http://localhost:${PORT} in your browser to login!
  `);

  // Initialize database if needed
  if (process.env.DATABASE_URL) {
    try {
      console.log('Initializing database...');
      const { initializeDatabase } = require('./init-db');
      await initializeDatabase();
      console.log('✅ Database ready!');

      // Run migration to add phase column
      console.log('Running migration...');
      const { migrate } = require('./migrate-add-phase');
      await migrate();
      console.log('✅ Migration complete!\n');
    } catch (error) {
      console.error('⚠️  Database initialization/migration failed:', error.message);
      console.log('   The server will continue, but database operations may fail.\n');
    }
  }
});
