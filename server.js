const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Pool } = require('pg');
const OpenAI = require('openai');
const workoutProgram = require('./workout-data');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'workout-buddy-secret-key-2025';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Initialize OpenAI client
const openai = OPENAI_API_KEY ? new OpenAI({ apiKey: OPENAI_API_KEY }) : null;

if (openai) {
  console.log('✅ OpenAI client initialized successfully');
} else {
  console.warn('⚠️  OpenAI API key not found - voice input will not work');
}

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

// Read active user from cookie
const authenticateToken = (req, res, next) => {
  const activeUser = req.cookies.activeUser;
  if (!activeUser) {
    // For API routes, return 401; for pages, redirect to home
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'No user selected' });
    }
    return res.redirect('/');
  }
  req.user = { username: activeUser };
  next();
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set active user and redirect to dashboard
app.get('/select-user/:username', (req, res) => {
  const { username } = req.params;
  res.cookie('activeUser', username, {
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
  res.redirect('/dashboard');
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
  const { exerciseId, phase, week, sets, date } = req.body;

  try {
    // Validate required fields
    if (!exerciseId || !phase || !week || !sets) {
      return res.status(400).json({ error: 'Missing required fields: exerciseId, phase, week, sets' });
    }

    const loggedAt = date ? `${date} 08:00:00` : null;

    // Use ON CONFLICT to update if already exists (upsert)
    if (loggedAt) {
      await pool.query(
        `INSERT INTO workout_logs (username, exercise_id, phase, week, sets, logged_at)
         VALUES ($1, $2, $3, $4, $5, $6::timestamp)
         ON CONFLICT (username, exercise_id, phase, week)
         DO UPDATE SET sets = $5, logged_at = $6::timestamp`,
        [req.user.username, exerciseId, parseInt(phase), parseInt(week), JSON.stringify(sets), loggedAt]
      );
    } else {
      await pool.query(
        `INSERT INTO workout_logs (username, exercise_id, phase, week, sets)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (username, exercise_id, phase, week)
         DO UPDATE SET sets = $5, logged_at = CURRENT_TIMESTAMP`,
        [req.user.username, exerciseId, parseInt(phase), parseInt(week), JSON.stringify(sets)]
      );
    }

    res.json({
      success: true,
      message: 'Workout logged successfully'
    });
  } catch (error) {
    console.error('Save workout log error:', error);
    res.status(500).json({ error: 'Server error saving workout log' });
  }
});

// Get workout summary for a day (volume, PRs, history)
app.get('/api/workout/summary/:day', authenticateToken, async (req, res) => {
  const { day } = req.params;
  const { phase, week, date } = req.query;

  try {
    const dayPrefix = day.substring(0, 3);

    // Get current day's logs
    let currentQuery = 'SELECT exercise_id, sets, logged_at FROM workout_logs WHERE username = $1 AND exercise_id LIKE $2';
    const currentParams = [req.user.username, `${dayPrefix}%`];
    if (phase) { currentQuery += ` AND phase = $${currentParams.length + 1}`; currentParams.push(parseInt(phase)); }
    if (week) { currentQuery += ` AND week = $${currentParams.length + 1}`; currentParams.push(parseInt(week)); }
    if (date) { currentQuery += ` AND logged_at::date = $${currentParams.length + 1}::date`; currentParams.push(date); }
    const currentResult = await pool.query(currentQuery, currentParams);

    // Get ALL historical logs for these exercises (for PR detection)
    const allLogsResult = await pool.query(
      'SELECT exercise_id, phase, week, sets, logged_at FROM workout_logs WHERE username = $1 AND exercise_id LIKE $2 ORDER BY logged_at ASC',
      [req.user.username, `${dayPrefix}%`]
    );

    // Build per-exercise history
    const exerciseHistory = {};
    allLogsResult.rows.forEach(row => {
      if (!exerciseHistory[row.exercise_id]) exerciseHistory[row.exercise_id] = [];
      exerciseHistory[row.exercise_id].push({
        phase: row.phase, week: row.week, sets: row.sets,
        date: row.logged_at
      });
    });

    // Compute summary for current session
    let totalVolume = 0;
    let totalSets = 0;
    let completedSets = 0;
    const exerciseSummaries = {};
    const prs = [];

    currentResult.rows.forEach(row => {
      const sets = row.sets || [];
      let exerciseVolume = 0;
      let exerciseMaxWeight = 0;
      let exerciseBestSet = null;
      let exerciseSetsCompleted = 0;

      sets.forEach(s => {
        const w = parseFloat(s.weight) || 0;
        const r = parseInt(s.reps) || 0;
        totalSets++;
        if (w > 0 || r > 0) {
          completedSets++;
          exerciseSetsCompleted++;
        }
        const setVolume = w * r;
        exerciseVolume += setVolume;
        if (w > exerciseMaxWeight) {
          exerciseMaxWeight = w;
          exerciseBestSet = { weight: w, reps: r };
        }
      });

      totalVolume += exerciseVolume;

      // Check for PRs against all history
      const history = exerciseHistory[row.exercise_id] || [];
      let allTimeMaxWeight = 0;
      let allTimeMaxVolume = 0;
      let allTimeBestSetVolume = 0;

      history.forEach(h => {
        if (date && new Date(h.date).toISOString().split('T')[0] === date) return; // skip current session
        (h.sets || []).forEach(s => {
          const w = parseFloat(s.weight) || 0;
          const r = parseInt(s.reps) || 0;
          if (w > allTimeMaxWeight) allTimeMaxWeight = w;
          const sv = w * r;
          if (sv > allTimeBestSetVolume) allTimeBestSetVolume = sv;
        });
        const hv = (h.sets || []).reduce((sum, s) => sum + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0), 0);
        if (hv > allTimeMaxVolume) allTimeMaxVolume = hv;
      });

      // Detect PRs
      if (exerciseMaxWeight > allTimeMaxWeight && exerciseMaxWeight > 0) {
        prs.push({ exerciseId: row.exercise_id, type: 'weight', value: exerciseMaxWeight, previous: allTimeMaxWeight });
      }
      if (exerciseVolume > allTimeMaxVolume && exerciseVolume > 0) {
        prs.push({ exerciseId: row.exercise_id, type: 'volume', value: exerciseVolume, previous: allTimeMaxVolume });
      }
      const currentBestSetVolume = sets.reduce((max, s) => {
        const sv = (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0);
        return sv > max ? sv : max;
      }, 0);
      if (currentBestSetVolume > allTimeBestSetVolume && currentBestSetVolume > 0) {
        prs.push({ exerciseId: row.exercise_id, type: 'set', value: currentBestSetVolume, previous: allTimeBestSetVolume });
      }

      exerciseSummaries[row.exercise_id] = {
        volume: exerciseVolume,
        maxWeight: exerciseMaxWeight,
        bestSet: exerciseBestSet,
        setsCompleted: exerciseSetsCompleted,
        totalSets: sets.length,
        previousSessions: history.filter(h => !(date && new Date(h.date).toISOString().split('T')[0] === date)).length
      };
    });

    res.json({
      totalVolume,
      totalSets,
      completedSets,
      completionRate: totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0,
      exerciseCount: currentResult.rows.length,
      prs,
      exercises: exerciseSummaries
    });
  } catch (error) {
    console.error('Get workout summary error:', error);
    res.status(500).json({ error: 'Server error getting workout summary' });
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

// Parse voice input using OpenAI ChatGPT
app.post('/api/parse-voice-input', authenticateToken, async (req, res) => {
  const { transcript, workoutContext } = req.body;

  if (!transcript) {
    return res.status(400).json({ error: 'Transcript is required' });
  }

  if (!openai) {
    return res.status(503).json({
      error: 'OpenAI API is not configured',
      fallback: true
    });
  }

  try {
    console.log('Parsing voice input:', transcript);
    console.log('Workout context:', JSON.stringify(workoutContext, null, 2));

    // Build exercise context for ChatGPT
    const exerciseContext = workoutContext?.exercises?.map((ex, idx) => {
      const nextSet = ex.completedSets.length + 1;
      return `${idx + 1}. "${ex.name}" (ID: ${ex.id}, Type: ${ex.type}, Total Sets: ${ex.totalSets}, Next Set: ${nextSet <= ex.totalSets ? nextSet : 'all complete'})`;
    }).join('\n') || 'No exercises available';

    const systemPrompt = `You are a highly intelligent workout tracking assistant. Your job is to parse the user's voice input and extract:
1. Which exercise they're referring to (match by name, even if partial or misspelled)
2. Which set number (if not specified, use the next incomplete set)
3. Weight in pounds
4. Number of reps

WORKOUT CONTEXT:
Day: ${workoutContext?.day || 'Unknown'}
Phase: ${workoutContext?.phase || 'Unknown'}
Week: ${workoutContext?.week || 'Unknown'}

EXERCISES AVAILABLE:
${exerciseContext}

INSTRUCTIONS:
- Match exercise names using fuzzy matching (handle abbreviations, misspellings, partial names)
- Examples: "incline press" matches "30° Incline DB Press - pronated"
- Examples: "lat pulldown" matches "Lat Pulldown - neutral grip"
- Examples: "chest fly" matches "Flat DB Fly - pronated"
- If set number not mentioned, use the next incomplete set
- Extract weight (always in pounds) and reps
- Handle natural language: "fifty pounds eight reps", "50 by 8", "135 times 5", etc.

IMPORTANT:
- Return the exact exerciseId from the list above
- Return the setNumber (integer 1-${workoutContext?.exercises?.[0]?.totalSets || 5})
- Also return the matched exercise name for confirmation

Respond ONLY with valid JSON in this exact format:
{
  "exerciseId": "mon_a1",
  "exerciseName": "30° Incline DB Press",
  "setNumber": 1,
  "weight": 50,
  "reps": 8
}

If you cannot match an exercise or parse the input, respond with:
{
  "error": "Could not understand which exercise, weight, or reps"
}

NO explanations, just JSON.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: transcript
        }
      ],
      temperature: 0.1,
      max_tokens: 150
    });

    const responseText = completion.choices[0].message.content.trim();
    console.log('OpenAI response:', responseText);

    // Parse the JSON response
    const parsed = JSON.parse(responseText);

    if (parsed.error) {
      return res.json({
        success: false,
        error: parsed.error
      });
    }

    res.json({
      success: true,
      exerciseId: parsed.exerciseId,
      exerciseName: parsed.exerciseName,
      setNumber: parsed.setNumber,
      weight: parsed.weight,
      reps: parsed.reps
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      code: error.code
    });

    res.status(500).json({
      error: 'Failed to parse voice input: ' + (error.message || 'Unknown error'),
      fallback: true
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║         Workout Buddy Server Running!                 ║
╚════════════════════════════════════════════════════════╝

Server URL: http://localhost:${PORT}

Accounts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  - Arun
  - Bhushan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open http://localhost:${PORT} in your browser to get started!
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
