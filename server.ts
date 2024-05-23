import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"; //hantera miljövariabler från .env-filen
import { Client } from "pg"; //skapar en PostgreSQL-klient

dotenv.config(); // Läs in konfigurationen från .env-filen och gör den tillgänglig via process.env


const client = new Client({ //// Skapa en ny instans av en PostgreSQL-klient med anslutningssträngen från .env-filen
  connectionString: process.env.PGURI,
});

client.connect().catch((err) => {
  console.error("Error connecting to the database", err.stack);
});

const app = express(); //ny instans av express-applikationen

app.use(cors()); //förhindra CORS-fel

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

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});