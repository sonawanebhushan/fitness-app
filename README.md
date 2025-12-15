# 💪 Workout Buddy

A comprehensive fitness tracking web application designed for serious athletes following structured training programs. Built for the Post Exhaustion Method by Mark Carroll, featuring 4-phase progressive workout tracking with calendar views, detailed exercise logging, and mobile-optimized interface.

## 🌟 Live Demo

**Live Application:** [https://workout-buddy-app-5f8003f321b5.herokuapp.com/](https://workout-buddy-app-5f8003f321b5.herokuapp.com/)

**Test Credentials:**
- Username: `amar` / Password: `amar123!@#`
- Username: `prem` / Password: `prem456$%^`

## ✨ Features

### 🏋️ Workout Tracking
- **4-Phase Progressive Program** - Complete Post Exhaustion Method implementation
  - Phase 1: Accumulation 1 (3 weeks)
  - Phase 2: Intensification 1 (3 weeks)
  - Phase 3: Accumulation 2 - Tempo Contrast (3 weeks)
  - Phase 4: Intensification 2 - Wave Loading (3 weeks)
- **5 Training Days Per Week** - Structured split routine
- **Exercise-by-Exercise Logging** - Track sets, reps, and weight for every exercise
- **Date-Specific Tracking** - Edit workouts for any date (past, present, or future)
- **Auto-Save System** - Individual exercise saves with visual confirmation
- **Progress Indicators** - Completed sets highlighted in green

### 📅 Calendar Views
- **Monthly Calendar** - Color-coded workout history at a glance
- **Mini Calendar** - Integrated sidebar in workout tracker
- **Workout Type Color Coding:**
  - 🔴 Red - Chest & Back
  - 🔵 Teal - Lower Body 1
  - 🟦 Blue - Shoulders & Arms
  - 🟢 Green - Posterior Chain
  - 🟡 Yellow - Chest & Back 2
  - 🟣 Purple - Lower Body 2
- **Completion Percentage** - Visual progress bars on each workout day
- **Clickable Dates** - Jump to any date to view/edit workouts

### 👤 User Profiles
- **Personal Metrics Tracking:**
  - Age, Weight, Height
  - Muscle Mass, Body Fat %
  - Fitness Goals
- **Profile Management** - Update metrics as you progress
- **Persistent Data** - PostgreSQL database ensures data never resets

### 📱 Mobile Optimized
- **iPhone & iOS Friendly:**
  - 16px input font-size (prevents auto-zoom)
  - Touch-friendly buttons (44-48px minimum)
  - Responsive layouts for all screen sizes
  - Native date picker support
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3 (Vanilla)
- JavaScript (ES6+)
- Responsive Design with Media Queries
- No framework dependencies - Pure performance

**Backend:**
- Node.js 18.x
- Express.js - Web framework
- PostgreSQL - Persistent database
- bcryptjs - Password hashing
- JWT - Authentication
- Cookie-based sessions

**Deployment:**
- Heroku - Application hosting
- Heroku Postgres - Database (Essential-0 tier)
- Git-based deployment workflow

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn package manager

## 🚀 Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sonawanebhushan/fitness-app.git
   cd fitness-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create a PostgreSQL database
   createdb workout_buddy

   # Set environment variable
   export DATABASE_URL="postgresql://username:password@localhost:5432/workout_buddy"
   ```

4. **Initialize the database**
   ```bash
   node init-db.js
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env` file (optional) or set these environment variables:

```env
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/workout_buddy
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## 📖 Usage Guide

### Getting Started

1. **Login** - Use one of the test accounts or create your own
2. **Update Profile** - Add your current stats (age, weight, etc.)
3. **Go to Workout Tracker** - Click the "📊 Workout Tracker" button
4. **Select a Date** - Use the date picker (defaults to today)
5. **Choose Your Workout Day** - Click a day button (Monday, Tuesday, etc.)
6. **Log Your Sets** - Enter weight and reps for each set
7. **Save** - Click "Save Exercise" for each exercise completed
8. **View Progress** - Check the calendar to see your workout history

### Workout Program Structure

**Training Days:**
- **Monday** - Chest and Back
- **Tuesday** - Lower Body 1
- **Wednesday** - Shoulders and Arms
- **Thursday** - Rest or Specialized Day (phase-dependent)
- **Friday** - Posterior Chain
- **Saturday** - Chest and Back 2
- **Sunday** - Rest

**Each Phase:**
- 3 weeks duration
- Same exercises each week
- Progressive overload through weight/reps
- Logged separately by phase/week/date

### Advanced Features

**Date Selection:**
- Pick any date to edit past workouts
- Plan future workouts in advance
- Calendar shows all logged workout days

**Phase/Week Navigation:**
- Switch between phases (1-4)
- Change weeks (1-3)
- View different phase structures

**Calendar Features:**
- Click calendar dates to jump to that day
- See completion percentage per workout
- Color-coded by muscle group

## 📁 Project Structure

```
workout-buddy/
├── public/
│   ├── calendar.html          # Monthly calendar view
│   ├── dashboard.html         # User dashboard
│   ├── login.html            # Login page
│   └── workout-tracker.html  # Main workout tracking interface
├── init-db.js                # Database schema initialization
├── migrate-add-phase.js      # Database migration script
├── server.js                 # Express server & API routes
├── workout-data.js           # Complete 4-phase workout program
├── package.json              # Dependencies
├── Procfile                  # Heroku deployment config
└── README.md                 # This file
```

## 🗄️ Database Schema

**Tables:**

1. **users** - User accounts and profiles
   - username, password, name, age, weight, height, muscle_mass, body_fat, goal

2. **workout_status** - Current phase/week tracking
   - username, current_phase, current_week

3. **workout_logs** - Exercise logging
   - username, exercise_id, phase, week, sets (JSONB), logged_at
   - Unique constraint: (username, exercise_id, phase, week)

## 🔐 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Authentication** - Secure token-based auth
- **HTTP-Only Cookies** - Prevents XSS attacks
- **Parameterized Queries** - SQL injection protection
- **Session Management** - 24-hour token expiration

## 🚢 Deployment

### Heroku Deployment

The app is configured for one-click Heroku deployment:

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Deploy
git push heroku master

# Initialize database
heroku run node init-db.js

# Open app
heroku open
```

### Environment Variables on Heroku

```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

## 🎯 Future Enhancements

Potential features for future development:

- **Export Data** - Download workout history as CSV/PDF
- **Progress Charts** - Visualize strength gains over time
- **Rest Timer** - Built-in countdown between sets
- **Tempo Guide** - Visual metronome for tempo execution
- **Exercise Library** - Videos and instructions for each exercise
- **Personal Records** - Track all-time PRs for each exercise
- **Workout Notes** - Add notes to individual sessions
- **Social Features** - Share workouts with training partners
- **Nutrition Tracking** - Integrate meal planning
- **Progressive Overload Calculator** - Auto-suggest weight increases

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Mark Carroll** - Post Exhaustion Method program design
- **Workout Program** - Based on structured training principles
- Built with ❤️ for serious athletes who track their progress

## 📞 Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Contact: [Your contact info]

---

**Built with Node.js, PostgreSQL, and dedication to gains! 💪**

Last Updated: December 2024
