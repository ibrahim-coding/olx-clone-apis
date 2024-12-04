const { Router } = require("express");
const productModel = require("../models/productModel");
const router = Router();
const multer = require("multer");

const options = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const upload = multer({
  storage: options,
});

router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, prize } = req.body;

  const product = await new productModel({
    title,
    description,
    prize,
    image: "http://localhost:4000/images/" + req.file.filename,
  }).save();
  if (!product)
    return res.status(500).send({ message: "product can not be created" });
  res.status(201).send({ message: "product  created", id: product._id });
});

router.get("/", async (req, res) => {
  let products = await productModel.find();

  res.send(products);
});

module.exports = router;
