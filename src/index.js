import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { app, server } from "./lib/socket.js"; // ← import app & server from socket.js
import { connnectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// use server.listen (not app.listen) so socket.io works
server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connnectDB();
});
