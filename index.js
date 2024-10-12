import express from "express";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";
import chapterRoutes from "./routes/chapter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import http2 from "http2";
import fs from "fs";

const app = express();

const corsOptions = {
  origin: "https://ccourses.vercel.app",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Security headers
app.use(helmet());

// GZIP compression
app.use(compression());

// CORS Configuration
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// Cookie Parser
app.use(cookieParser());

// JSON parsing with limited size
app.use(express.json({ limit: "1mb" }));

// Static file caching (if needed)
app.use(express.static("public", { maxAge: "1d", etag: false }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/chapter", chapterRoutes);

// HTTP/2 Server for improved performance
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("server-key.pem"),
    cert: fs.readFileSync("server-cert.pem"),
  },
  app
);

server.listen(8800, () => {
  console.log("Server is connected and running on port 8800 with HTTP/2");
});
