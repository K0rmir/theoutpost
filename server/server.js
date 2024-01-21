import express, { request, response } from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config(); //This allows us to use environment variables like the DATABASE_URL

// Set up for the server //
const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

// Connect to Supabase database //
const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString});


// API Endpoints // 
app.get("/", (request, response) => {response.json("This is a response from the server. Hello. <(^.^)>")});

app.get("/quests", async (request, response) => {
    const result = await db.query(`SELECT * FROM users
    JOIN posts ON users.posts_id = posts.id
    JOIN difficulty ON posts.difficulty_id = difficulty.id`);
    response.json(result.rows);
});

app.get("/quest/:id", async (request, response) => {
    const id = request.params.id
    const result = await db.query(`SELECT * FROM users
    JOIN posts ON users.posts_id = posts.id
    JOIN difficulty ON posts.difficulty_id = difficulty.id
    WHERE posts.id = $1`, [id]);
    return response.json(result.rows[0]);
})
// Function for handling data being passed to Supabase database from Job Form //
app.post("/quests", async function (request, response) {
    const title = request.body.jobname;
    const content = request.body.description;
    const user = request.body.npcname;
    const difficulty = request.body.difficulty;

    let difficulty_id = 0;
    if (difficulty === "Easy") { 
        difficulty_id = 1
    } else if (difficulty === "Moderate") {
        difficulty_id = 2
    } else if (difficulty === "Hard") {
        difficulty_id = 3
    } else if (difficulty === "Insane") {
        difficulty_id = 4
    }
    const insertNewJob = await db.query(        
        `INSERT INTO posts (title, content, difficulty_id) VALUES ($1, $2, $3) RETURNING id`, [title, content, difficulty_id]); 

    const newJob = insertNewJob.rows[0];
    const postsId = newJob.id;
    
   await db.query(
        `INSERT INTO users (name, posts_id) VALUES ($1, $2)`, [user, postsId]);   
    response.json("Job Created");
});

// Function to handle accepting a quest, removing it from the main posts table and adding it to 'Saved' //
app.post("/quest/:id", async (request, response) => {
    const id = request.params.id
    const result = await db.query(`INSERT INTO saved (title, content, difficulty_id)
    SELECT title, content, difficulty_id
    FROM posts
    WHERE posts.id = $1`, [id]);

    await db.query(`UPDATE users 
    SET posts_id = NULL 
    WHERE posts_id = $1`, [id]);

    await db.query(`DELETE FROM posts
    WHERE posts.id = $1`, [id]);
   
});

// Start the server //
app.listen(PORT, () => console.log(`You're listening to PORT ${PORT}`));

