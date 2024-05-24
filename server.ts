import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"; //hantera miljövariabler från .env-filen
import { Client } from "pg"; //skapar en PostgreSQL-klient
import bodyParser from "body-parser" //hantera POST-data

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

app.get("/", async (_req: Request, res: Response) => {
  try {
    const pgRes = await client.query("SELECT * FROM messages");
    const { rows } = pgRes;
    res.send(rows);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error executing query", err.message);
      res.status(500).send("Internal Server Error");
    } else {
      console.error("Unknown error", err);
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

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});