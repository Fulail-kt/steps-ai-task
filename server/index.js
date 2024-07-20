import express from "express";
import dotenv from "dotenv";
import {dbConnect} from "./config/db.js";
import doctorRouter from "./routes/doctor.js";
import userRouter from "./routes/user.js";
import cors from 'cors'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({origin:'*'}))


app.use("/api/v1/doc", doctorRouter);
app.use("/api/v1/user", userRouter);


const PORT = process.env.PROT || 4000;

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
