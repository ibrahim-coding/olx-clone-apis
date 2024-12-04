require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname + "/images")));
// db connnsction
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => console.log(error));
// user realeted  API
app.use("/user", userRouter);
//product releted routes
app.use("/product/", productRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}....`);
});
