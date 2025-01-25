CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY,
    email VARCHAR(256) UNIQUE NOT NULL,
    telegram VARCHAR(256),
    password VARCHAR(1024) NOT NULL
);

CREATE TABLE IF NOT EXISTS Subscribtions (
    subscriber_id INT REFERENCES Users(id),
    publisher_id INT REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS UserResources (
    user_id INT REFERENCES Users(id),
    resource_id VARCHAR(128) NOT NULL UNIQUE
);