# Workout Tracker Feature - Documentation

## Overview
Your Workout Buddy app now includes a comprehensive workout tracking system for the Post Exhaustion Method program.

## What's Been Added

### 1. **Workout Program Structure**
- **Phase 1: Accumulation 1** (3 weeks)
- **5 Training Days per Week:**
  - Monday: Chest and Back
  - Tuesday: Lower 1
  - Wednesday: Shoulders and Arms
  - Friday: Posterior Chain
  - Saturday: Chest and Back 2

### 2. **Exercise Data**
Each exercise includes:
- Sets, Reps, Rest time, Tempo
- Exercise type (A1, A2, B1, B2, C1, C2, D, E1, E2)
- Week-specific variations (Week 1, 2, 3)

### 3. **Features**

#### Workout Tracker Page
- **Day Selection**: Choose from 5 training days
- **Phase & Week Selector**: Navigate between phases and weeks
- **Exercise Cards**: Display all exercises with specifications
- **Set Logging**: Input weight and reps for each set
- **Progress Tracking**: Completed sets are highlighted in green
- **Auto-save**: Each exercise saves independently
- **Success Notifications**: Visual confirmation when workouts are saved

#### API Endpoints
- `GET /api/workout/program` - Get full workout program
- `GET /api/workout/status` - Get user's current phase/week
- `PUT /api/workout/status` - Update current phase/week
- `GET /api/workout/logs/:day` - Get logs for specific day
- `POST /api/workout/logs` - Save workout log

## How to Use

### For Users:
1. **Login** to your account (amar/prem)
2. Click **"📊 Workout Tracker"** button on dashboard
3. **Select a day** (Monday - Saturday)
4. View your exercises for the selected day
5. **Log your workout**:
   - Enter weight for each set
   - Enter reps completed for each set
   - Click "Save Exercise" button
6. **Track progress**:
   - Change week using the dropdown (Week 1, 2, 3)
   - All 3 weeks maintain the same exercises
   - Your logged data is saved per week

### Example Workout Session:
**Monday - Chest and Back, Week 1**
- Exercise: 30° Incline DB Press - pronated
- Specs: 5 sets × 8 reps, 10s rest, 3110 tempo
- Log:
  - Set 1: 50 lbs × 8 reps
  - Set 2: 50 lbs × 8 reps
  - Set 3: 55 lbs × 7 reps
  - etc.

## Data Storage
Currently uses **in-memory storage** (data resets on server restart).

### For Production:
To make data persistent, you should:
1. Add a database (PostgreSQL, MongoDB, etc.)
2. Update the workout logs storage to use the database
3. Modify API endpoints to read/write from database

## Future Enhancements (To Add Later)

1. **Additional Phases**: Add Phase 2, 3, 4 data
2. **Progress Charts**: Visualize weight/rep progression over time
3. **Calendar View**: See workout history on a calendar
4. **Rest Timer**: Built-in timer for rest periods
5. **Tempo Guide**: Visual guide for tempo execution
6. **Exercise Library**: Videos/images of each exercise
7. **Personal Records**: Track PRs for each exercise
8. **Notes**: Add notes to each workout session
9. **Export Data**: Download workout history as CSV

## Files Modified/Created

### New Files:
- `workout-data.js` - Complete Phase 1 workout program data
- `public/workout-tracker.html` - Workout tracking interface

### Modified Files:
- `server.js` - Added workout tracking API endpoints
- `public/dashboard.html` - Added workout tracker button

## Live URL
https://workout-buddy-app-5f8003f321b5.herokuapp.com/

## Test Credentials
**User 1:**
- Username: amar
- Password: amar123!@#

**User 2:**
- Username: prem
- Password: prem456$%^

## Next Steps

### To add Phase 2, 3, 4:
1. Add phase data to `workout-data.js` following the same structure
2. The UI already supports phase selection (dropdown)
3. No code changes needed - just data!

### To add database persistence:
1. Install database package (e.g., `npm install pg` for PostgreSQL)
2. Create tables for: users, workout_logs, workout_status
3. Replace in-memory `workoutLogs` object with database queries
4. Update Heroku to add database add-on

## Notes
- Each week uses the same exercises but you can track different weights/reps
- Data is currently stored per-user in memory
- Phase selector allows for 4 phases (you can add Phase 2-4 data later)
- The structure supports easy expansion to more phases and exercises
