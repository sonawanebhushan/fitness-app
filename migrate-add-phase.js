const { Pool } = require('pg');

// Database migration to add phase column to workout_logs
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function migrate() {
  const client = await pool.connect();

  try {
    console.log('Starting migration: Add phase column to workout_logs...');

    // Check if phase column already exists
    const checkColumn = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name='workout_logs' AND column_name='phase'
    `);

    if (checkColumn.rows.length > 0) {
      console.log('✓ Phase column already exists, skipping migration');
      return;
    }

    // Drop the old unique constraint
    await client.query(`
      ALTER TABLE workout_logs
      DROP CONSTRAINT IF EXISTS workout_logs_username_exercise_id_week_key
    `);
    console.log('✓ Dropped old unique constraint');

    // Add phase column (default to 1 for existing data)
    await client.query(`
      ALTER TABLE workout_logs
      ADD COLUMN phase INTEGER NOT NULL DEFAULT 1
    `);
    console.log('✓ Added phase column');

    // Add new unique constraint including phase
    await client.query(`
      ALTER TABLE workout_logs
      ADD CONSTRAINT workout_logs_username_exercise_id_phase_week_key
      UNIQUE (username, exercise_id, phase, week)
    `);
    console.log('✓ Added new unique constraint with phase');

    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  migrate()
    .then(() => {
      console.log('Migration complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrate };
