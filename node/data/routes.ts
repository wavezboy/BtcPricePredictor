import express from "express";
import * as cont from "./controller";

const router = express.Router();

router.get("/fetch-data", async (req, res) => {
  try {
    await cont.fetchData("User");

    // Add more tables as needed
    res.send("Data fetched and saved.");
  } catch (err) {
    res.status(500).send("Error fetching data.");
  }
});

export default router;
