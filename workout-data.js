// Workout Program Data Structure
// Phase 1: Accumulation 1 (3 weeks)

const workoutProgram = {
  phase1: {
    name: "Phase 1: Accumulation 1",
    weeks: 3,
    days: {
      monday: {
        name: "Chest and Back",
        exercises: [
          {
            id: "mon_a1",
            name: "30° Incline DB Press - pronated",
            type: "A1",
            weeks: {
              week1: { sets: 5, reps: "8", rest: 10, tempo: "3110" },
              week2: { sets: 5, reps: "8", rest: 10, tempo: "3110" },
              week3: { sets: 5, reps: "8", rest: 10, tempo: "3110" }
            }
          },
          {
            id: "mon_a2",
            name: "Flat DB Flyes",
            type: "A2",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "mon_b1",
            name: "Neutral Grip Pull Ups",
            type: "B1",
            weeks: {
              week1: { sets: 5, reps: "6", rest: 10, tempo: "3010" },
              week2: { sets: 5, reps: "6", rest: 10, tempo: "3010" },
              week3: { sets: 5, reps: "6", rest: 10, tempo: "3010" }
            }
          },
          {
            id: "mon_b2",
            name: "Bent Over BB Row - Pronated Grip",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 45, tempo: "2210" },
              week2: { sets: 3, reps: "10-12", rest: 45, tempo: "2210" },
              week3: { sets: 3, reps: "10-12", rest: 45, tempo: "2210" }
            }
          },
          {
            id: "mon_c1",
            name: "EZ Bar Triceps Extensions - Flat",
            type: "C1",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "mon_c2",
            name: "EZ Bar BB Curl - Supinated Mid Grip",
            type: "C2",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 45, tempo: "3010" },
              week2: { sets: 3, reps: "10-12", rest: 45, tempo: "3010" },
              week3: { sets: 3, reps: "10-12", rest: 45, tempo: "3010" }
            }
          },
          {
            id: "mon_d",
            name: "Standing DB Lateral Raises",
            type: "D",
            weeks: {
              week1: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "mon_e1",
            name: "Decline Bench Crunch",
            type: "E1",
            weeks: {
              week1: { sets: 4, reps: "12-15", rest: 10, tempo: "2010" },
              week2: { sets: 4, reps: "12-15", rest: 10, tempo: "2010" },
              week3: { sets: 4, reps: "12-15", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "mon_e2",
            name: "Plank Hold",
            type: "E2",
            weeks: {
              week1: { sets: 4, reps: "45 secs", rest: 60, tempo: "" },
              week2: { sets: 4, reps: "45 secs", rest: 60, tempo: "" },
              week3: { sets: 4, reps: "45 secs", rest: 60, tempo: "" }
            }
          }
        ]
      },
      tuesday: {
        name: "Lower 1",
        exercises: [
          {
            id: "tue_a1",
            name: "High Bar Squats - Heels Elevated",
            type: "A1",
            weeks: {
              week1: { sets: 5, reps: "8", rest: 10, tempo: "4010" },
              week2: { sets: 5, reps: "8", rest: 10, tempo: "4010" },
              week3: { sets: 5, reps: "8", rest: 10, tempo: "4010" }
            }
          },
          {
            id: "tue_a2",
            name: "Leg Extensions",
            type: "A2",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "tue_b1",
            name: "BB Romanian Deadlifts",
            type: "B1",
            weeks: {
              week1: { sets: 5, reps: "8", rest: 10, tempo: "4010" },
              week2: { sets: 5, reps: "8", rest: 10, tempo: "4010" },
              week3: { sets: 5, reps: "8", rest: 10, tempo: "4010" }
            }
          },
          {
            id: "tue_b2",
            name: "Lying Leg Curl",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "20", rest: 45, tempo: "2010" },
              week2: { sets: 3, reps: "20", rest: 45, tempo: "2010" },
              week3: { sets: 3, reps: "20", rest: 45, tempo: "2010" }
            }
          },
          {
            id: "tue_c",
            name: "Leg Press - duck stance",
            type: "C",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "tue_d",
            name: "Seated Calf Raises",
            type: "D",
            weeks: {
              week1: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "20", rest: 60, tempo: "2010" }
            }
          }
        ]
      },
      wednesday: {
        name: "Shoulders and Arms",
        exercises: [
          {
            id: "wed_a1",
            name: "Seated DB Arnold Press",
            type: "A1",
            weeks: {
              week1: { sets: 4, reps: "8", rest: 10, tempo: "3110" },
              week2: { sets: 4, reps: "8", rest: 10, tempo: "3110" },
              week3: { sets: 4, reps: "8", rest: 10, tempo: "3110" }
            }
          },
          {
            id: "wed_a2",
            name: "65º Prone Lateral Raises",
            type: "A2",
            weeks: {
              week1: { sets: 4, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 4, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 4, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "wed_b1",
            name: "Smith Machine Shoulder Press",
            type: "B1",
            weeks: {
              week1: { sets: 4, reps: "8", rest: 10, tempo: "3010" },
              week2: { sets: 4, reps: "8", rest: 10, tempo: "3010" },
              week3: { sets: 4, reps: "8", rest: 10, tempo: "3010" }
            }
          },
          {
            id: "wed_b2",
            name: "30º Prone DB Lateral Raises",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 10, tempo: "2210" },
              week2: { sets: 3, reps: "15", rest: 10, tempo: "2210" },
              week3: { sets: 3, reps: "15", rest: 10, tempo: "2210" }
            }
          },
          {
            id: "wed_c1",
            name: "Dips - Head Forward Triceps Emphasis",
            type: "C1",
            weeks: {
              week1: { sets: 4, reps: "8-10", rest: 120, tempo: "2010" },
              week2: { sets: 4, reps: "8-10", rest: 120, tempo: "2010" },
              week3: { sets: 4, reps: "8-10", rest: 120, tempo: "2010" }
            }
          },
          {
            id: "wed_c2",
            name: "65° Incline Zottman DB Curl",
            type: "C2",
            weeks: {
              week1: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week2: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week3: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" }
            }
          },
          {
            id: "wed_d1",
            name: "Straight Bar Cable Push down",
            type: "D1",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 10, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 10, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "wed_d2",
            name: "Straight Bar Cable Curl",
            type: "D2",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 60, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 60, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "wed_e1",
            name: "Hanging Leg Raises",
            type: "E1",
            weeks: {
              week1: { sets: 4, reps: "10-12", rest: 10, tempo: "2010" },
              week2: { sets: 4, reps: "10-12", rest: 10, tempo: "2010" },
              week3: { sets: 4, reps: "10-12", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "wed_e2",
            name: "Side Plank Hold",
            type: "E2",
            weeks: {
              week1: { sets: 4, reps: "30 secs", rest: 60, tempo: "" },
              week2: { sets: 4, reps: "30 secs", rest: 60, tempo: "" },
              week3: { sets: 4, reps: "30 secs", rest: 60, tempo: "" }
            }
          }
        ]
      },
      friday: {
        name: "Posterior Chain",
        exercises: [
          {
            id: "fri_a1",
            name: "Rack Pulls Below the Knee",
            type: "A1",
            weeks: {
              week1: { sets: 5, reps: "8-10", rest: 10, tempo: "2210" },
              week2: { sets: 5, reps: "8-10", rest: 10, tempo: "2210" },
              week3: { sets: 5, reps: "8-10", rest: 10, tempo: "2210" }
            }
          },
          {
            id: "fri_a2",
            name: "Lying Leg Curl - Toes up",
            type: "A2",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "fri_b1",
            name: "DB Front Foot Elevated Split Squat",
            type: "B1",
            weeks: {
              week1: { sets: 5, reps: "8-10", rest: 10, tempo: "2110" },
              week2: { sets: 5, reps: "8-10", rest: 10, tempo: "2110" },
              week3: { sets: 5, reps: "8-10", rest: 10, tempo: "2110" }
            }
          },
          {
            id: "fri_b2",
            name: "Leg Press - Feet Middle",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "fri_c",
            name: "45º Back Extensions - DB on chest",
            type: "C",
            weeks: {
              week1: { sets: 3, reps: "20", rest: 60, tempo: "2010" },
              week2: { sets: 3, reps: "20", rest: 60, tempo: "2010" },
              week3: { sets: 3, reps: "20", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "fri_d",
            name: "Standing Calf Raises",
            type: "D",
            weeks: {
              week1: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "20", rest: 60, tempo: "2010" }
            }
          }
        ]
      },
      saturday: {
        name: "Chest and Back 2",
        exercises: [
          {
            id: "sat_a1",
            name: "Wide Pronated Pull Ups",
            type: "A1",
            weeks: {
              week1: { sets: 5, reps: "6", rest: 10, tempo: "3010" },
              week2: { sets: 5, reps: "6", rest: 10, tempo: "3010" },
              week3: { sets: 5, reps: "6", rest: 10, tempo: "3010" }
            }
          },
          {
            id: "sat_a2",
            name: "Seated Row Neutral Grip",
            type: "A2",
            weeks: {
              week1: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 5, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 5, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "sat_b1",
            name: "Flat DB Bench Press - Neutral",
            type: "B1",
            weeks: {
              week1: { sets: 5, reps: "8", rest: 10, tempo: "3110" },
              week2: { sets: 5, reps: "8", rest: 10, tempo: "3110" },
              week3: { sets: 5, reps: "8", rest: 10, tempo: "3110" }
            }
          },
          {
            id: "sat_b2",
            name: "30° Incline DB Flyes - pronated",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 150, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 150, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 150, tempo: "2010" }
            }
          },
          {
            id: "sat_c1",
            name: "DB Triceps Extensions - flat",
            type: "C1",
            weeks: {
              week1: { sets: 5, reps: "8-10", rest: 45, tempo: "2110" },
              week2: { sets: 5, reps: "8-10", rest: 45, tempo: "2110" },
              week3: { sets: 5, reps: "8-10", rest: 45, tempo: "2110" }
            }
          },
          {
            id: "sat_c2",
            name: "Standing DB Curl - alternating - supinated",
            type: "C2",
            weeks: {
              week1: { sets: 3, reps: "8-10", rest: 45, tempo: "3010" },
              week2: { sets: 3, reps: "8-10", rest: 45, tempo: "3010" },
              week3: { sets: 3, reps: "8-10", rest: 45, tempo: "3010" }
            }
          },
          {
            id: "sat_d",
            name: "Seated Rope Pull to Neck",
            type: "D",
            weeks: {
              week1: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "10-12", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "sat_e1",
            name: "Hanging Leg Raises",
            type: "E1",
            weeks: {
              week1: { sets: 4, reps: "10-12", rest: 10, tempo: "" },
              week2: { sets: 4, reps: "10-12", rest: 10, tempo: "" },
              week3: { sets: 4, reps: "10-12", rest: 10, tempo: "" }
            }
          },
          {
            id: "sat_e2",
            name: "Rope Crunch",
            type: "E2",
            weeks: {
              week1: { sets: 4, reps: "15,12,10,8", rest: 60, tempo: "" },
              week2: { sets: 4, reps: "15,12,10,8", rest: 60, tempo: "" },
              week3: { sets: 4, reps: "15,12,10,8", rest: 60, tempo: "" }
            }
          }
        ]
      }
    }
  },
  phase2: {
    name: "Phase 2: Intensification 1",
    weeks: 3,
    days: {
      monday: {
        name: "Upper 1",
        exercises: [
          {
            id: "mon_p2_a1",
            name: "BB Incline Bench Press",
            type: "A1",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" }
            }
          },
          {
            id: "mon_p2_a2",
            name: "Supinated Pull Up",
            type: "A2",
            notes: "Weighted for 3-5 + bodyweight for max reps",
            weeks: {
              week1: { sets: "4+1", reps: "Max", rest: 90, tempo: "3010" },
              week2: { sets: "4+1", reps: "Max", rest: 90, tempo: "3010" },
              week3: { sets: "4+1", reps: "Max", rest: 90, tempo: "3010" }
            }
          },
          {
            id: "mon_p2_b1",
            name: "Dip - Triceps Emphasis",
            type: "B1",
            weeks: {
              week1: { sets: 3, reps: "6-8", rest: 75, tempo: "3110" },
              week2: { sets: 3, reps: "6-8", rest: 75, tempo: "3110" },
              week3: { sets: 3, reps: "6-8", rest: 75, tempo: "3110" }
            }
          },
          {
            id: "mon_p2_b2",
            name: "Bent Over BB Row",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "12", rest: 10, tempo: "2010" },
              week2: { sets: 3, reps: "12", rest: 10, tempo: "2010" },
              week3: { sets: 3, reps: "12", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "mon_p2_c1",
            name: "Rope Triceps Pushdowns",
            type: "C1",
            notes: "Last set - drop set - drop 20% weight and continue to failure",
            weeks: {
              week1: { sets: 3, reps: "6-8", rest: 75, tempo: "2010" },
              week2: { sets: 3, reps: "6-8", rest: 75, tempo: "2010" },
              week3: { sets: 3, reps: "6-8", rest: 75, tempo: "2010" }
            }
          },
          {
            id: "mon_p2_c2",
            name: "Rope Hammer Curl",
            type: "C2",
            notes: "Last set - drop set x 1 - drop 20% weight and continue to failure",
            weeks: {
              week1: { sets: 3, reps: "12", rest: 60, tempo: "2010" },
              week2: { sets: 3, reps: "12", rest: 60, tempo: "2010" },
              week3: { sets: 3, reps: "12", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "mon_p2_d",
            name: "Machine Shoulder Press",
            type: "D",
            weeks: {
              week1: { sets: 3, reps: "12", rest: 45, tempo: "2010" },
              week2: { sets: 3, reps: "12", rest: 45, tempo: "2010" },
              week3: { sets: 3, reps: "12", rest: 45, tempo: "2010" }
            }
          },
          {
            id: "mon_p2_e1",
            name: "Rope Crunch",
            type: "E1",
            weeks: {
              week1: { sets: 4, reps: "15,12,10,8", rest: 45, tempo: "" },
              week2: { sets: 4, reps: "15,12,10,8", rest: 45, tempo: "" },
              week3: { sets: 4, reps: "15,12,10,8", rest: 45, tempo: "" }
            }
          },
          {
            id: "mon_p2_e2",
            name: "Lying Leg Raises",
            type: "E2",
            weeks: {
              week1: { sets: 4, reps: "10", rest: 60, tempo: "" },
              week2: { sets: 4, reps: "10", rest: 60, tempo: "" },
              week3: { sets: 4, reps: "10", rest: 60, tempo: "" }
            }
          }
        ]
      },
      tuesday: {
        name: "Quads",
        exercises: [
          {
            id: "tue_p2_a1",
            name: "High Bar Squats - Heels Elevated",
            type: "A1",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" }
            }
          },
          {
            id: "tue_p2_a2",
            name: "Standing One Leg Curl - toe neutral",
            type: "A2",
            notes: "Last set rest pause x 2",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "4010" }
            }
          },
          {
            id: "tue_p2_b1",
            name: "DB Back Foot Elevated Split Squat",
            type: "B1",
            weeks: {
              week1: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" },
              week2: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" },
              week3: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" }
            }
          },
          {
            id: "tue_p2_b2",
            name: "BB Paused Romanian Deadlift",
            type: "B2",
            notes: "2 sec pause at top",
            weeks: {
              week1: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" },
              week2: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" },
              week3: { sets: 4, reps: "6-8", rest: 60, tempo: "2210" }
            }
          },
          {
            id: "tue_p2_c",
            name: "Leg Extensions",
            type: "C",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 45, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 45, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 45, tempo: "2010" }
            }
          },
          {
            id: "tue_p2_d",
            name: "Seated Calf Raises",
            type: "D",
            weeks: {
              week1: { sets: 4, reps: "10", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "10", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "10", rest: 60, tempo: "2010" }
            }
          }
        ]
      },
      thursday: {
        name: "Upper 2",
        exercises: [
          {
            id: "thu_p2_a1",
            name: "Flat BB Bench Press",
            type: "A1",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" }
            }
          },
          {
            id: "thu_p2_a2",
            name: "Pull Ups - Wide Pronated",
            type: "A2",
            notes: "Weighted for 3-5 + bodyweight for max reps",
            weeks: {
              week1: { sets: "4+1", reps: "3-5 + MAX", rest: 90, tempo: "3010" },
              week2: { sets: "4+1", reps: "3-5 + MAX", rest: 90, tempo: "3010" },
              week3: { sets: "4+1", reps: "3-5 + MAX", rest: 90, tempo: "3010" }
            }
          },
          {
            id: "thu_p2_b1",
            name: "45° Incline DB Bench Press - 1 & 1/4 reps - Neutral",
            type: "B1",
            notes: "Last set drop set - drop 20%",
            weeks: {
              week1: { sets: 3, reps: "6-8", rest: 75, tempo: "3010" },
              week2: { sets: 3, reps: "6-8", rest: 75, tempo: "3010" },
              week3: { sets: 3, reps: "6-8", rest: 75, tempo: "3010" }
            }
          },
          {
            id: "thu_p2_b2",
            name: "One Arm DB Row - Neutral",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "6-8", rest: 75, tempo: "2110" },
              week2: { sets: 3, reps: "6-8", rest: 75, tempo: "2110" },
              week3: { sets: 3, reps: "6-8", rest: 75, tempo: "2110" }
            }
          },
          {
            id: "thu_p2_c1",
            name: "65° Prone Lateral Raises",
            type: "C1",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 10, tempo: "2010" },
              week2: { sets: 3, reps: "10-12", rest: 10, tempo: "2010" },
              week3: { sets: 3, reps: "10-12", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "thu_p2_c2",
            name: "Seated Rope Pull to neck",
            type: "C2",
            notes: "Last set drop set - drop 20%",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 60, tempo: "2011" },
              week2: { sets: 3, reps: "10-12", rest: 60, tempo: "2011" },
              week3: { sets: 3, reps: "10-12", rest: 60, tempo: "2011" }
            }
          },
          {
            id: "thu_p2_d1",
            name: "Barbell Curl",
            type: "D1",
            weeks: {
              week1: { sets: 2, reps: "10-12", rest: 10, tempo: "2010" },
              week2: { sets: 2, reps: "10-12", rest: 10, tempo: "2010" },
              week3: { sets: 2, reps: "10-12", rest: 10, tempo: "2010" }
            }
          },
          {
            id: "thu_p2_d2",
            name: "15° DB Triceps Extensions",
            type: "D2",
            weeks: {
              week1: { sets: 2, reps: "10-12", rest: 60, tempo: "2010" },
              week2: { sets: 2, reps: "10-12", rest: 60, tempo: "2010" },
              week3: { sets: 2, reps: "10-12", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "thu_p2_e1",
            name: "Hanging Leg Raises/Toes to bar",
            type: "E1",
            weeks: {
              week1: { sets: 4, reps: "6-8", rest: 30, tempo: "2010" },
              week2: { sets: 4, reps: "6-8", rest: 30, tempo: "2010" },
              week3: { sets: 4, reps: "6-8", rest: 30, tempo: "2010" }
            }
          },
          {
            id: "thu_p2_e2",
            name: "Toe Crunch",
            type: "E2",
            weeks: {
              week1: { sets: 3, reps: "12-16", rest: 60, tempo: "2010" },
              week2: { sets: 3, reps: "12-16", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "12-16", rest: 60, tempo: "2010" }
            }
          }
        ]
      },
      friday: {
        name: "Posterior Chain",
        exercises: [
          {
            id: "fri_p2_a1",
            name: "Deadlifts or Trap Bar Deadlifts",
            type: "A1",
            notes: "Final set is tap and go 2010 tempo",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "2210" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "2210" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "2210" }
            }
          },
          {
            id: "fri_p2_a2",
            name: "DB Front foot Elevated Split Squat",
            type: "A2",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "3110" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "3110" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 100, tempo: "3110" }
            }
          },
          {
            id: "fri_p2_b1",
            name: "Lying Leg Curls 1 & 1/4 reps bottom",
            type: "B1",
            notes: "Last set - drop set - drop 20% and do normal reps to failure",
            weeks: {
              week1: { sets: 4, reps: "6-8", rest: 90, tempo: "4010" },
              week2: { sets: 4, reps: "6-8", rest: 90, tempo: "4010" },
              week3: { sets: 4, reps: "6-8", rest: 90, tempo: "4010" }
            }
          },
          {
            id: "fri_p2_b2",
            name: "Hack Squat",
            type: "B2",
            weeks: {
              week1: { sets: 4, reps: "6-8", rest: 90, tempo: "3010" },
              week2: { sets: 4, reps: "6-8", rest: 90, tempo: "3010" },
              week3: { sets: 4, reps: "6-8", rest: 90, tempo: "3010" }
            }
          },
          {
            id: "fri_p2_c",
            name: "Peterson Leg Press",
            type: "C",
            weeks: {
              week1: { sets: 3, reps: "15", rest: 60, tempo: "2010" },
              week2: { sets: 3, reps: "15", rest: 60, tempo: "2010" },
              week3: { sets: 3, reps: "15", rest: 60, tempo: "2010" }
            }
          },
          {
            id: "fri_p2_d",
            name: "Seated Calf Raises",
            type: "D",
            notes: "Last set drop set x 1 - drop 20%",
            weeks: {
              week1: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week2: { sets: 4, reps: "20", rest: 60, tempo: "2010" },
              week3: { sets: 4, reps: "20", rest: 60, tempo: "2010" }
            }
          }
        ]
      },
      saturday: {
        name: "Shoulders Arms",
        exercises: [
          {
            id: "sat_p2_a1",
            name: "Seated BB Overhead Press",
            type: "A1",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" }
            }
          },
          {
            id: "sat_p2_a2",
            name: "45° Incline DB Curl",
            type: "A2",
            notes: "Last set - rest pause x 1",
            weeks: {
              week1: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week2: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" },
              week3: { sets: "4+1", reps: "4-6 + 10-12", rest: 90, tempo: "4010" }
            }
          },
          {
            id: "sat_p2_b1",
            name: "65° Arnold DB Press - 1 & 1/4 reps Grip",
            type: "B1",
            weeks: {
              week1: { sets: 3, reps: "6-8", rest: 60, tempo: "3010" },
              week2: { sets: 3, reps: "6-8", rest: 60, tempo: "3010" },
              week3: { sets: 3, reps: "6-8", rest: 60, tempo: "3010" }
            }
          },
          {
            id: "sat_p2_b2",
            name: "EZ Bar Reverse Curl",
            type: "B2",
            weeks: {
              week1: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week2: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week3: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" }
            }
          },
          {
            id: "sat_p2_c1",
            name: "45° Prone Y Raises",
            type: "C1",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 60, tempo: "3010" },
              week2: { sets: 3, reps: "10-12", rest: 60, tempo: "3010" },
              week3: { sets: 3, reps: "10-12", rest: 60, tempo: "3010" }
            }
          },
          {
            id: "sat_p2_c2",
            name: "EZ Bar Skull Crushers 1 & 1/4 reps",
            type: "C2",
            notes: "Last set - rest pause x 1",
            weeks: {
              week1: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week2: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" },
              week3: { sets: 3, reps: "8-10", rest: 60, tempo: "3010" }
            }
          },
          {
            id: "sat_p2_d1",
            name: "Tricep Pushdowns - cross overs",
            type: "D1",
            notes: "Last set drop set x 1",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 45, tempo: "2011" },
              week2: { sets: 3, reps: "10-12", rest: 45, tempo: "2011" },
              week3: { sets: 3, reps: "10-12", rest: 45, tempo: "2011" }
            }
          },
          {
            id: "sat_p2_d2",
            name: "Machine Preacher curl",
            type: "D2",
            weeks: {
              week1: { sets: 3, reps: "10-12", rest: 45, tempo: "2010" },
              week2: { sets: 3, reps: "10-12", rest: 45, tempo: "2010" },
              week3: { sets: 3, reps: "10-12", rest: 45, tempo: "2010" }
            }
          }
        ]
      }
    }
  }
};

module.exports = workoutProgram;
