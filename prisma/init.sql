-- This file will be executed when PostgreSQL container starts
-- It will create the database and run migrations

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE mane_haghighi_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mane_haghighi_db')\gexec

-- Connect to the database
\c mane_haghighi_db;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
