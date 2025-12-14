const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const workoutProgram = require('./workout-data');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'workout-buddy-secret-key-2025';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// User database (in-memory for simplicity)
// Passwords: amar123!@#, prem456$%^
const users = {
  amar: {
    username: 'amar',
    password: '$2a$10$hBBax2vceby7vP6zrrNNbeCdvdfpGRQvUTQ2oHV/Q5NZopK9KIkhK', // amar123!@#
    profile: {
      name: 'Amar Kumar',
      age: 28,
      weight: '165 lbs',
      height: '5\'9"',
      muscleMass: '70 lbs',
      bodyFat: '15%',
      goal: 'Build muscle and increase strength'
    }
  },
  prem: {
    username: 'prem',
    password: '$2a$10$N2muACox6NFgqCc3qfZSk.s4/gtKwtZZ220PqLQ65aljofoZ5fvcO', // prem456$%^
    profile: {
      name: 'Prem Singh',
      age: 32,
      weight: '180 lbs',
      height: '5\'11"',
      muscleMass: '77 lbs',
      bodyFat: '18%',
      goal: 'Lose weight and improve cardiovascular health'
    }
  }
};

// Workout tracking data (in-memory for simplicity)
// Structure: { username: { currentPhase: 1, currentWeek: 1, logs: { exerciseId: { week: 1, sets: [{weight, reps}, ...] } } } }
const workoutLogs = {
  amar: {
    currentPhase: 1,
    currentWeek: 1,
    logs: {}
  },
  prem: {
    currentPhase: 1,
    currentWeek: 1,
    logs: {}
  }
};

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

  // Check if user exists
  const user = users[username];
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
});

app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users[req.user.username];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    username: user.username,
    profile: user.profile
  });
});

app.put('/api/profile', authenticateToken, (req, res) => {
  console.log('PUT /api/profile called');
  console.log('User:', req.user.username);
  console.log('Request body:', req.body);

  const user = users[req.user.username];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update profile with new data
  const { age, weight, height, muscleMass, bodyFat, goal } = req.body;

  if (age !== undefined) user.profile.age = age;
  if (weight !== undefined) user.profile.weight = weight;
  if (height !== undefined) user.profile.height = height;
  if (muscleMass !== undefined) user.profile.muscleMass = muscleMass;
  if (bodyFat !== undefined) user.profile.bodyFat = bodyFat;
  if (goal !== undefined) user.profile.goal = goal;

  console.log('Updated profile:', user.profile);

  res.json({
    success: true,
    message: 'Profile updated successfully',
    profile: user.profile
  });
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

// Get workout program data
app.get('/api/workout/program', authenticateToken, (req, res) => {
  res.json(workoutProgram);
});

// Get user's current workout status
app.get('/api/workout/status', authenticateToken, (req, res) => {
  const userLog = workoutLogs[req.user.username];
  if (!userLog) {
    return res.status(404).json({ error: 'Workout log not found' });
  }

  res.json({
    currentPhase: userLog.currentPhase,
    currentWeek: userLog.currentWeek
  });
});

// Update user's current workout status
app.put('/api/workout/status', authenticateToken, (req, res) => {
  const { currentPhase, currentWeek } = req.body;
  const userLog = workoutLogs[req.user.username];

  if (!userLog) {
    return res.status(404).json({ error: 'Workout log not found' });
  }

  if (currentPhase) userLog.currentPhase = currentPhase;
  if (currentWeek) userLog.currentWeek = currentWeek;

  res.json({
    success: true,
    currentPhase: userLog.currentPhase,
    currentWeek: userLog.currentWeek
  });
});

// Get workout logs for specific day
app.get('/api/workout/logs/:day', authenticateToken, (req, res) => {
  const { day } = req.params;
  const userLog = workoutLogs[req.user.username];

  if (!userLog) {
    return res.status(404).json({ error: 'Workout log not found' });
  }

  // Filter logs for the specific day
  const dayLogs = {};
  Object.keys(userLog.logs).forEach(exerciseId => {
    if (exerciseId.startsWith(day.substring(0, 3))) {
      dayLogs[exerciseId] = userLog.logs[exerciseId];
    }
  });

  res.json({ logs: dayLogs });
});

// Save workout log for an exercise
app.post('/api/workout/logs', authenticateToken, (req, res) => {
  const { exerciseId, week, sets } = req.body;
  const userLog = workoutLogs[req.user.username];

  if (!userLog) {
    return res.status(404).json({ error: 'Workout log not found' });
  }

  // Save the log
  userLog.logs[exerciseId] = {
    week: week,
    sets: sets,
    date: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Workout logged successfully'
  });
});

// Start server
app.listen(PORT, () => {
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
});
