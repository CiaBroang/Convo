import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"; //hantera miljövariabler från .env-filen
import { Client } from "pg"; //skapar en PostgreSQL-klient
import bodyParser from "body-parser" //hantera POST-data
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = "123"; 


dotenv.config(); // Läs in konfigurationen från .env-filen och gör den tillgänglig via process.env

const client = new Client({ //// Skapa en ny instans av en PostgreSQL-klient med anslutningssträngen från .env-filen
  connectionString: process.env.PGURI,
});

client.connect().catch((err) => {
  console.error("Error connecting to the database", err.stack);
});

const app = express(); //ny instans av express-applikationen
app.use(cors()); //förhindra CORS-fel
app.use(bodyParser.json());

app.get("/fetchConversation", async (req: Request, res: Response) => {
  const { person1, person2 } = req.query;

  console.log("SQL query:", "SELECT * FROM messages WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)", [person1, person2]);
  try {
    const pgRes = await client.query(
      "SELECT * FROM messages WHERE (sender_id=$1 AND receiver_id=$2) OR (sender_id=$2 AND receiver_id=$1)",
      [person1, person2]
    );

    const { rows } = pgRes;
    res.send(rows);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error executing query", error.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.error("Unknown error", error);
      res.status(500).send("Internal Server Error");
    }
  }
});


app.post("/messages", async (req: Request, res: Response) => {
  const { sender_id, receiver_id, message_text, message_image, message_gif } = req.body;

  if (!sender_id || !receiver_id) {
    return res.status(400).send("sender_id, receiver_id are required");
  }
  // Validera för att meddelandet innehåller någonting!

  try {
    await client.query(
      "INSERT INTO messages (sender_id, receiver_id, message_text, message_image, message_gif) VALUES ($1, $2, $3, $4, $5)",
      [sender_id, receiver_id, message_text, message_image, message_gif]
    );
    res.status(201).send("Message added");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error inserting message", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.error("Unknown error", err);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/addUsers", async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if (!email || !password) {
    return res.status(400).send("email and password are required");
  }
  
  try {
    const userCheck = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const result = await client.query(
      "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING user_id",
      [email, hashedPassword, username]
    );

    const userId = result.rows[0].user_id;

    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });

  } catch (err) {
    if (err instanceof Error) {
      console.error("Error adding user ", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.error("Unknown error", err);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});