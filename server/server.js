import express, { response } from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config(); //This allows us to use environment variables like the DATABASE_URL

// Set up for the server //
const PORT = 8080;
const app = express();
app.use(cors());

// Connect to Supabase database //
const dbConnectionString = process.env.DATABASE_URL;
console.log(dbConnectionString);
const db = new pg.Pool({ connectionString: dbConnectionString});


// API Endpoints // 
app.get("/", (request, response) => {response.json("This is a response from the server. Hello. <(^.^)>")});

app.get("/quests", async (request, response) => {
    const result = await db.query(`SELECT posts.title, posts.content, users.name, difficulty.type FROM users
    JOIN posts ON users.posts_id = posts.id
    JOIN difficulty ON posts.difficulty_id = difficulty.id`);
    response.json(result.rows);
});

// Start the server //
app.listen(PORT, () => console.log(`You're listening to PORT ${PORT}`));

