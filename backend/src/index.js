import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import workoutRoutes from "./routes/workoutRoutes.js"
import prRoutes from "./routes/prRoutes.js"
import { notFound } from "./middlewares/notFound.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes)
app.use('/workouts', workoutRoutes)
app.use('/pr', prRoutes)

// Error handling middleware
app.use(notFound)


// test route
app.get('/', async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The current database name is: ${result.rows[0].current_database}`)
})


app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
    
})
