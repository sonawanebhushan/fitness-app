require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : { rejectUnauthorized: false }
});

async function seed() {
  const client = await pool.connect();

  // Arun: 155 lbs, lighter weights
  // Bhushan: 170 lbs, heavier weights
  const logs = [
    // ===== MONDAY Feb 16 - Chest and Back =====
    // mon_a1: 30° Incline DB Press (5 sets x 8)
    { user: 'arun', id: 'mon_a1', date: '2026-02-16', sets: [{weight:40,reps:8},{weight:40,reps:8},{weight:45,reps:8},{weight:45,reps:7},{weight:40,reps:8}] },
    { user: 'bhushan', id: 'mon_a1', date: '2026-02-16', sets: [{weight:50,reps:8},{weight:50,reps:8},{weight:55,reps:8},{weight:55,reps:7},{weight:50,reps:8}] },
    // mon_a2: Flat DB Flyes (5 sets x 15)
    { user: 'arun', id: 'mon_a2', date: '2026-02-16', sets: [{weight:20,reps:15},{weight:20,reps:15},{weight:20,reps:14},{weight:20,reps:13},{weight:20,reps:12}] },
    { user: 'bhushan', id: 'mon_a2', date: '2026-02-16', sets: [{weight:25,reps:15},{weight:25,reps:15},{weight:25,reps:15},{weight:25,reps:14},{weight:25,reps:13}] },
    // mon_b1: Neutral Grip Pull Ups (5 sets x 6)
    { user: 'arun', id: 'mon_b1', date: '2026-02-16', sets: [{weight:0,reps:6},{weight:0,reps:6},{weight:0,reps:5},{weight:0,reps:5},{weight:0,reps:4}] },
    { user: 'bhushan', id: 'mon_b1', date: '2026-02-16', sets: [{weight:10,reps:6},{weight:10,reps:6},{weight:10,reps:5},{weight:0,reps:6},{weight:0,reps:6}] },
    // mon_b2: Bent Over BB Row (3 sets x 10-12)
    { user: 'arun', id: 'mon_b2', date: '2026-02-16', sets: [{weight:95,reps:12},{weight:95,reps:11},{weight:95,reps:10}] },
    { user: 'bhushan', id: 'mon_b2', date: '2026-02-16', sets: [{weight:115,reps:12},{weight:115,reps:11},{weight:115,reps:10}] },
    // mon_c1: EZ Bar Triceps Extensions (5 sets x 15)
    { user: 'arun', id: 'mon_c1', date: '2026-02-16', sets: [{weight:35,reps:15},{weight:35,reps:15},{weight:35,reps:14},{weight:35,reps:13},{weight:35,reps:12}] },
    { user: 'bhushan', id: 'mon_c1', date: '2026-02-16', sets: [{weight:45,reps:15},{weight:45,reps:15},{weight:45,reps:14},{weight:45,reps:13},{weight:45,reps:12}] },
    // mon_c2: EZ Bar Curl (3 sets x 10-12)
    { user: 'arun', id: 'mon_c2', date: '2026-02-16', sets: [{weight:45,reps:12},{weight:45,reps:11},{weight:45,reps:10}] },
    { user: 'bhushan', id: 'mon_c2', date: '2026-02-16', sets: [{weight:55,reps:12},{weight:55,reps:11},{weight:55,reps:10}] },
    // mon_d: Standing DB Lateral Raises (4 sets x 10-12)
    { user: 'arun', id: 'mon_d', date: '2026-02-16', sets: [{weight:15,reps:12},{weight:15,reps:12},{weight:15,reps:11},{weight:15,reps:10}] },
    { user: 'bhushan', id: 'mon_d', date: '2026-02-16', sets: [{weight:20,reps:12},{weight:20,reps:12},{weight:20,reps:11},{weight:20,reps:10}] },
    // mon_e1: Decline Bench Crunch (4 sets x 12-15)
    { user: 'arun', id: 'mon_e1', date: '2026-02-16', sets: [{weight:0,reps:15},{weight:0,reps:15},{weight:0,reps:14},{weight:0,reps:12}] },
    { user: 'bhushan', id: 'mon_e1', date: '2026-02-16', sets: [{weight:10,reps:15},{weight:10,reps:14},{weight:10,reps:13},{weight:10,reps:12}] },
    // mon_e2: Plank Hold (4 sets x 45 secs)
    { user: 'arun', id: 'mon_e2', date: '2026-02-16', sets: [{weight:0,reps:45},{weight:0,reps:45},{weight:0,reps:40},{weight:0,reps:35}] },
    { user: 'bhushan', id: 'mon_e2', date: '2026-02-16', sets: [{weight:0,reps:45},{weight:0,reps:45},{weight:0,reps:45},{weight:0,reps:40}] },

    // ===== TUESDAY Feb 17 - Lower 1 =====
    // tue_a1: High Bar Squats (5 sets x 8)
    { user: 'arun', id: 'tue_a1', date: '2026-02-17', sets: [{weight:135,reps:8},{weight:135,reps:8},{weight:145,reps:8},{weight:145,reps:7},{weight:135,reps:8}] },
    { user: 'bhushan', id: 'tue_a1', date: '2026-02-17', sets: [{weight:155,reps:8},{weight:155,reps:8},{weight:165,reps:8},{weight:165,reps:7},{weight:155,reps:8}] },
    // tue_a2: Leg Extensions (5 sets x 15)
    { user: 'arun', id: 'tue_a2', date: '2026-02-17', sets: [{weight:70,reps:15},{weight:70,reps:15},{weight:70,reps:14},{weight:70,reps:13},{weight:70,reps:12}] },
    { user: 'bhushan', id: 'tue_a2', date: '2026-02-17', sets: [{weight:85,reps:15},{weight:85,reps:15},{weight:85,reps:15},{weight:85,reps:14},{weight:85,reps:13}] },
    // tue_b1: BB Romanian Deadlifts (5 sets x 8)
    { user: 'arun', id: 'tue_b1', date: '2026-02-17', sets: [{weight:135,reps:8},{weight:135,reps:8},{weight:145,reps:8},{weight:145,reps:7},{weight:135,reps:8}] },
    { user: 'bhushan', id: 'tue_b1', date: '2026-02-17', sets: [{weight:155,reps:8},{weight:155,reps:8},{weight:165,reps:8},{weight:165,reps:8},{weight:155,reps:8}] },
    // tue_b2: Lying Leg Curl (3 sets x 20)
    { user: 'arun', id: 'tue_b2', date: '2026-02-17', sets: [{weight:50,reps:20},{weight:50,reps:18},{weight:50,reps:16}] },
    { user: 'bhushan', id: 'tue_b2', date: '2026-02-17', sets: [{weight:60,reps:20},{weight:60,reps:20},{weight:60,reps:18}] },
    // tue_c: Leg Press duck stance (5 sets x 15)
    { user: 'arun', id: 'tue_c', date: '2026-02-17', sets: [{weight:180,reps:15},{weight:180,reps:15},{weight:200,reps:15},{weight:200,reps:14},{weight:180,reps:15}] },
    { user: 'bhushan', id: 'tue_c', date: '2026-02-17', sets: [{weight:230,reps:15},{weight:230,reps:15},{weight:250,reps:15},{weight:250,reps:14},{weight:230,reps:15}] },
    // tue_d: Seated Calf Raises (4 sets x 20)
    { user: 'arun', id: 'tue_d', date: '2026-02-17', sets: [{weight:70,reps:20},{weight:70,reps:20},{weight:70,reps:18},{weight:70,reps:16}] },
    { user: 'bhushan', id: 'tue_d', date: '2026-02-17', sets: [{weight:90,reps:20},{weight:90,reps:20},{weight:90,reps:20},{weight:90,reps:18}] },

    // ===== WEDNESDAY Feb 18 - Shoulders and Arms =====
    // wed_a1: Seated DB Arnold Press (4 sets x 8)
    { user: 'arun', id: 'wed_a1', date: '2026-02-18', sets: [{weight:30,reps:8},{weight:30,reps:8},{weight:35,reps:7},{weight:30,reps:8}] },
    { user: 'bhushan', id: 'wed_a1', date: '2026-02-18', sets: [{weight:40,reps:8},{weight:40,reps:8},{weight:45,reps:7},{weight:40,reps:8}] },
    // wed_a2: 65° Prone Lateral Raises (4 sets x 15)
    { user: 'arun', id: 'wed_a2', date: '2026-02-18', sets: [{weight:10,reps:15},{weight:10,reps:15},{weight:10,reps:14},{weight:10,reps:13}] },
    { user: 'bhushan', id: 'wed_a2', date: '2026-02-18', sets: [{weight:12,reps:15},{weight:12,reps:15},{weight:12,reps:15},{weight:12,reps:14}] },
    // wed_b1: Smith Machine Shoulder Press (4 sets x 8)
    { user: 'arun', id: 'wed_b1', date: '2026-02-18', sets: [{weight:85,reps:8},{weight:85,reps:8},{weight:95,reps:7},{weight:85,reps:8}] },
    { user: 'bhushan', id: 'wed_b1', date: '2026-02-18', sets: [{weight:105,reps:8},{weight:105,reps:8},{weight:115,reps:7},{weight:105,reps:8}] },
    // wed_b2: 30° Prone DB Lateral Raises (3 sets x 15)
    { user: 'arun', id: 'wed_b2', date: '2026-02-18', sets: [{weight:10,reps:15},{weight:10,reps:14},{weight:10,reps:13}] },
    { user: 'bhushan', id: 'wed_b2', date: '2026-02-18', sets: [{weight:12,reps:15},{weight:12,reps:15},{weight:12,reps:14}] },
    // wed_c1: Dips (4 sets x 8-10)
    { user: 'arun', id: 'wed_c1', date: '2026-02-18', sets: [{weight:0,reps:10},{weight:0,reps:10},{weight:0,reps:9},{weight:0,reps:8}] },
    { user: 'bhushan', id: 'wed_c1', date: '2026-02-18', sets: [{weight:10,reps:10},{weight:10,reps:9},{weight:10,reps:8},{weight:0,reps:10}] },
    // wed_c2: 65° Incline Zottman DB Curl (3 sets x 8-10)
    { user: 'arun', id: 'wed_c2', date: '2026-02-18', sets: [{weight:20,reps:10},{weight:20,reps:9},{weight:20,reps:8}] },
    { user: 'bhushan', id: 'wed_c2', date: '2026-02-18', sets: [{weight:25,reps:10},{weight:25,reps:9},{weight:25,reps:8}] },
    // wed_d1: Straight Bar Cable Pushdown (3 sets x 15)
    { user: 'arun', id: 'wed_d1', date: '2026-02-18', sets: [{weight:40,reps:15},{weight:40,reps:15},{weight:40,reps:14}] },
    { user: 'bhushan', id: 'wed_d1', date: '2026-02-18', sets: [{weight:50,reps:15},{weight:50,reps:15},{weight:50,reps:15}] },
    // wed_d2: Straight Bar Cable Curl (3 sets x 15)
    { user: 'arun', id: 'wed_d2', date: '2026-02-18', sets: [{weight:35,reps:15},{weight:35,reps:14},{weight:35,reps:13}] },
    { user: 'bhushan', id: 'wed_d2', date: '2026-02-18', sets: [{weight:45,reps:15},{weight:45,reps:15},{weight:45,reps:14}] },
    // wed_e1: Hanging Leg Raises (4 sets x 10-12)
    { user: 'arun', id: 'wed_e1', date: '2026-02-18', sets: [{weight:0,reps:12},{weight:0,reps:11},{weight:0,reps:10},{weight:0,reps:10}] },
    { user: 'bhushan', id: 'wed_e1', date: '2026-02-18', sets: [{weight:0,reps:12},{weight:0,reps:12},{weight:0,reps:11},{weight:0,reps:10}] },
    // wed_e2: Side Plank Hold (4 sets x 30 secs)
    { user: 'arun', id: 'wed_e2', date: '2026-02-18', sets: [{weight:0,reps:30},{weight:0,reps:30},{weight:0,reps:25},{weight:0,reps:25}] },
    { user: 'bhushan', id: 'wed_e2', date: '2026-02-18', sets: [{weight:0,reps:30},{weight:0,reps:30},{weight:0,reps:30},{weight:0,reps:28}] },

    // ===== FRIDAY Feb 20 - Posterior Chain =====
    // fri_a1: Rack Pulls Below Knee (5 sets x 8-10)
    { user: 'arun', id: 'fri_a1', date: '2026-02-20', sets: [{weight:185,reps:10},{weight:185,reps:10},{weight:205,reps:9},{weight:205,reps:8},{weight:185,reps:10}] },
    { user: 'bhushan', id: 'fri_a1', date: '2026-02-20', sets: [{weight:225,reps:10},{weight:225,reps:10},{weight:245,reps:9},{weight:245,reps:8},{weight:225,reps:10}] },
    // fri_a2: Lying Leg Curl Toes Up (5 sets x 15)
    { user: 'arun', id: 'fri_a2', date: '2026-02-20', sets: [{weight:45,reps:15},{weight:45,reps:15},{weight:45,reps:14},{weight:45,reps:13},{weight:45,reps:12}] },
    { user: 'bhushan', id: 'fri_a2', date: '2026-02-20', sets: [{weight:55,reps:15},{weight:55,reps:15},{weight:55,reps:15},{weight:55,reps:14},{weight:55,reps:13}] },
    // fri_b1: DB Front Foot Elevated Split Squat (5 sets x 8-10)
    { user: 'arun', id: 'fri_b1', date: '2026-02-20', sets: [{weight:30,reps:10},{weight:30,reps:10},{weight:35,reps:9},{weight:35,reps:8},{weight:30,reps:10}] },
    { user: 'bhushan', id: 'fri_b1', date: '2026-02-20', sets: [{weight:40,reps:10},{weight:40,reps:10},{weight:45,reps:9},{weight:45,reps:8},{weight:40,reps:10}] },
    // fri_b2: Leg Press Feet Middle (3 sets x 15)
    { user: 'arun', id: 'fri_b2', date: '2026-02-20', sets: [{weight:200,reps:15},{weight:200,reps:15},{weight:200,reps:14}] },
    { user: 'bhushan', id: 'fri_b2', date: '2026-02-20', sets: [{weight:250,reps:15},{weight:250,reps:15},{weight:250,reps:15}] },
    // fri_c: 45° Back Extensions (3 sets x 20)
    { user: 'arun', id: 'fri_c', date: '2026-02-20', sets: [{weight:25,reps:20},{weight:25,reps:20},{weight:25,reps:18}] },
    { user: 'bhushan', id: 'fri_c', date: '2026-02-20', sets: [{weight:35,reps:20},{weight:35,reps:20},{weight:35,reps:20}] },
    // fri_d: Standing Calf Raises (4 sets x 20)
    { user: 'arun', id: 'fri_d', date: '2026-02-20', sets: [{weight:110,reps:20},{weight:110,reps:20},{weight:110,reps:18},{weight:110,reps:16}] },
    { user: 'bhushan', id: 'fri_d', date: '2026-02-20', sets: [{weight:140,reps:20},{weight:140,reps:20},{weight:140,reps:20},{weight:140,reps:18}] },
  ];

  try {
    let count = 0;
    for (const log of logs) {
      await client.query(
        `INSERT INTO workout_logs (username, exercise_id, phase, week, sets, logged_at)
         VALUES ($1, $2, $3, $4, $5, $6::timestamp)
         ON CONFLICT (username, exercise_id, phase, week)
         DO UPDATE SET sets = $5, logged_at = $6::timestamp`,
        [log.user, log.id, 1, 1, JSON.stringify(log.sets), log.date + ' 08:00:00']
      );
      count++;
    }
    console.log(`Inserted ${count} workout log entries for Arun and Bhushan.`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
