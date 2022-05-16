import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./app-data-source";
import * as StoreController from "./src/api/StoreController";

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch(err => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.post("/store", StoreController.save);
app.get("/store", StoreController.getAll);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
