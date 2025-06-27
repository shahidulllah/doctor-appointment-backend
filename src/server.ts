import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DATABASE_URI as string;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
