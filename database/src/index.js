import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Auth from "../routes/auth.route.js";

const app = express();
const port = 6969;
app.use(express());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/api', Auth)

app.listen(port, () => {
  console.log(`Server is running on port  http://localhost:${port}`);
});
