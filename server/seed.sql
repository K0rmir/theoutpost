-- Creates the difficulty table --
CREATE TABLE IF NOT EXISTS difficulty (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
)
-- Inserts rows into the difficulty table --
INSERT INTO difficulty(type) VALUES('Easy');
INSERT INTO difficulty(type) VALUES('Moderate');
INSERT INTO difficulty(type) VALUES('Hard');
INSERT INTO difficulty(type) VALUES('Insane');

-- Creates the posts/quests table--
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    difficulty_id INTEGER REFERENCES difficulty(id)
)
-- Inserts data into the posts/quests table--
INSERT INTO posts(title, content, difficulty_id) VALUES('Power Surge', 'Investigate the sub station and find out why The Outposts power keeps tripping', 2);
INSERT INTO posts(title, content, difficulty_id) VALUES('The Silent Thieves', 'A band of thieves has stolen crucial medial supplies from The Outpost. Track them down and return the supplies to ensure The Outposts well-being.', 3);
INSERT INTO posts(title, content, difficulty_id) VALUES('Ghosts', 'Old Al says there is ghosts in his attic. I say he is full of shit. Go over to his place and shut him up for me?', 1);
INSERT INTO posts(title, content, difficulty_id) VALUES('Salvage Operation', 'A cargo ship from the city crash landed about 10 clicks from here not long ago. Corpo is yet to clean it up. Head over there asap and salvage what you can for The Outpost.', 4);

--Creates the users/npcs table--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    posts_id INTEGER REFERENCES posts(id)
)
--Inserts data into the users/npcs table--
INSERT INTO users(name, posts_id) VALUES('Lyra Nova', 2);
INSERT INTO users(name, posts_id) VALUES('JAxon Orion', 1);
INSERT INTO users(name, posts_id) VALUES('Dax Drifter', 4);
INSERT INTO users(name, posts_id) VALUES('Serin Skysong', 3);

-- Selects quest title, quest content, npc name and difficulty--
SELECT posts.title, posts.content, users.name, difficulty.type FROM users
JOIN posts ON users.posts_id = posts.id
JOIN difficulty ON posts.difficulty_id = difficulty.id