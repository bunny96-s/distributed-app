-- Create database if not exists
CREATE DATABASE IF NOT EXISTS app_db;

-- Connect to the database
\c app_db;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert some sample data
INSERT INTO users (username, email) VALUES
    ('johndoe', 'john.doe@example.com'),
    ('janedoe', 'jane.doe@example.com'),
    ('testuser', 'test@example.com')
ON CONFLICT DO NOTHING;