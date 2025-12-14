const { Pool } = require('pg');

// Database initialization script
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
  const client = await pool.connect();

  try {
    console.log('Starting database initialization...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        username VARCHAR(50) PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        age INTEGER,
        weight VARCHAR(20),
        height VARCHAR(20),
        muscle_mass VARCHAR(20),
        body_fat VARCHAR(20),
        goal TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');

    // Create workout_status table
    await client.query(`
      CREATE TABLE IF NOT EXISTS workout_status (
        username VARCHAR(50) PRIMARY KEY REFERENCES users(username) ON DELETE CASCADE,
        current_phase INTEGER DEFAULT 1,
        current_week INTEGER DEFAULT 1,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Workout status table created');

    // Create workout_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS workout_logs (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE,
        exercise_id VARCHAR(100) NOT NULL,
        phase INTEGER NOT NULL,
        week INTEGER NOT NULL,
        sets JSONB NOT NULL,
        logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(username, exercise_id, phase, week)
      )
    `);
    console.log('✓ Workout logs table created');

    // Insert default users (amar and prem)
    await client.query(`
      INSERT INTO users (username, password, name, age, weight, height, muscle_mass, body_fat, goal)
      VALUES
        ('amar', '$2a$10$hBBax2vceby7vP6zrrNNbeCdvdfpGRQvUTQ2oHV/Q5NZopK9KIkhK', 'Amar Kumar', 28, '165 lbs', '5''9"', '70 lbs', '15%', 'Build muscle and increase strength'),
        ('prem', '$2a$10$N2muACox6NFgqCc3qfZSk.s4/gtKwtZZ220PqLQ65aljofoZ5fvcO', 'Prem Singh', 32, '180 lbs', '5''11"', '77 lbs', '18%', 'Lose weight and improve cardiovascular health')
      ON CONFLICT (username) DO NOTHING
    `);
    console.log('✓ Default users inserted');

    // Insert default workout status for users
    await client.query(`
      INSERT INTO workout_status (username, current_phase, current_week)
      VALUES
        ('amar', 1, 1),
        ('prem', 1, 1)
      ON CONFLICT (username) DO NOTHING
    `);
    console.log('✓ Default workout status inserted');

    console.log('\n✅ Database initialized successfully!');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
