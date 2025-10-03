import express from "express";
import http from "http";
import cors from "cors";
import registerSocketServer from "./socketServer";
import "dotenv/config";

const app = express();

const server = http.createServer(app);

registerSocketServer(server);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is working...");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`App started listening on port ${PORT}`);
});
