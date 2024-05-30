DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    username VARCHAR(50),
    name VARCHAR(100),
    is_online BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    message_text TEXT,
    message_image BYTEA, 
    message_gif BYTEA,   
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id)
);

INSERT INTO users (email, password, username, name, is_online)
VALUES ('johndoeee@example.com', 'password12345', 'johndoee', 'John Doee', FALSE);
INSERT INTO users (email, password, username, name, is_online)
VALUES ('jaaanedoe@example.com', 'password123456', 'jaanedoe', 'Jaane Doe', FALSE);


-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS messages;

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE users (
--     user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     email VARCHAR(100) NOT NULL,
--     password VARCHAR(255),
--     username VARCHAR(50),
--     name VARCHAR(100),
--     is_online BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE messages (
--     message_id SERIAL PRIMARY KEY,
--     sender_id INT NOT NULL,
--     receiver_id INT NOT NULL,
--     message_text TEXT,
--     message_image BYTEA, 
--     message_gif BYTEA,   
--     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (sender_id) REFERENCES users(user_id),
--     FOREIGN KEY (receiver_id) REFERENCES users(user_id)
-- );

-- INSERT INTO users (email, password, username, name, is_online)
-- VALUES ('johndoe@example.com', 'password123', 'johndoe', 'John Doe', FALSE);
-- INSERT INTO users (email, password, username, name, is_online)
-- VALUES ('janedoe@example.com', 'password123', 'janedoe', 'Jane Doe', FALSE);

-- INSERT INTO messages (sender_id, receiver_id, message_text)
-- VALUES (1, 2, 'Hello, this is a test message!');