import express from "express";
import Connection from "./database/db.js";
import routes from "./routes/route.js";
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json())
app.use(cors());
app.use("/", routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
Connection();
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
