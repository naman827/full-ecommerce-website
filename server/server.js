import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userouter from "./Routes/useRoutes.js";
import categoryrouter from './Routes/categoryRoute.js'
import productrouter from './Routes/productRouter.js'
dotenv.config();
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URL;
console.log(URI);
app.get("/", (req, res) => {
  res.send("the server is running");
});
mongoose
  .connect(URI)
  .then(() => {
    console.log("mongodb connected ");
  })
  .catch((err) => {
    console.error(err.message);
  });
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

app.use("/user", userouter);
app.use("/api", categoryrouter);
app.use("/api", productrouter);
