import express from "express";
import cors from "cors";
// import { connectDB } from "./DB/Database.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";
import path from "path";

dotenv.config({ path: "./config/config.env" });
const app = express();

const port = process.env.PORT;
const db = process.env.MONGO_URL;
const connectDB = async () => {
  try {
      const { connection } = await mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      console.log(`MongoDB Connected to ${connection.host}`);
  } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      process.exit(1); // Exit process if unable to connect
  }
};

connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
