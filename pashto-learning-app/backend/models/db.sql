-- USERS (authentication info)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  role VARCHAR(50) DEFAULT 'student', -- student, teacher, admin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROFILE (extra user details, 1-to-1 with user)
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  age INT,
  gender VARCHAR(20),
  level VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
  bio TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LESSONS (course content)
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) DEFAULT 'beginner', -- beginner, intermediate, advanced
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EXERCISES (linked to lessons)
CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'translation', -- translation, multiple-choice, fill-blank
  options TEXT[], -- for multiple-choice questions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER PROGRESS (tracks lessons completed by users)
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'in-progress', -- in-progress, completed
  completed_at TIMESTAMP
);

-- USER EXERCISES (tracks attempts & scores)
CREATE TABLE user_exercises (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
  is_correct BOOLEAN,
  score INT DEFAULT 0,
  attempt_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
