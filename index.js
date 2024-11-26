import express from "express";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";
import chapterRoutes from "./routes/chapter.js";
import memberRoutes from "./routes/member.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import http2 from "http2";
import fs from "fs";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
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
app.use("/api/members", memberRoutes);


app.listen(8800, () => {
  console.log("Server is connected and running on port 8800 with HTTP/2");
});
