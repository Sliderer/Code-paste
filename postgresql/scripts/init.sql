SELECT 'CREATE DATABASE codepaste'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'codepaste');