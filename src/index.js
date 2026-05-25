import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./lib/socket.js";
import { connnectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "https://chat-app-szgp.onrender.com",
  credentials: true,
}));

// ← API routes FIRST
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ← static files and catch-all LAST
app.use(express.static(path.join(__dirname, "../public")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

server.listen(PORT, () => {
  console.log("Server is running on PORT:" + PORT);
  connnectDB();
});
