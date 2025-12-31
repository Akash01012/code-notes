import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
app.use("/api/notes", noteRoutes);

export default app;
