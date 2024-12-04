import express, { urlencoded } from "express";
// import dotenv from "dotenv";
import UserRouter from "./routes/usuario.route.js";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", UserRouter);

app.listen(PORT, () => {
  console.log("servidor puerto:", PORT);
});
