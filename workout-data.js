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
  }
};

module.exports = workoutProgram;
