const { Router } = require("express");
const productModel = require("../models/productModel");
const router = Router();
const multer = require("multer");
const {Authorise} =require('../middlewear/authorise')


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

router.get("/", async (req,res)=>{
  const products = await productModel.find()
  res.send(products)

  if(!products)return res.status(500).send({message:"can not get products"})
})

router.post("/create",Authorise, upload.single("image"), async (req, res) => {
  
  const { title, description, price, type } = req.body;

 
  const product = await new productModel({
    type,
    title,
    description,
    price,
    image: "http://localhost:4000/images/" + req.file.filename,
  }).save();
  if (!product)
    return res.status(500).send({ message: "product can not be created" });
  res.status(201).send({ message: "product  created", id: product._id });
});

router.put("/update/:id",Authorise, upload.single("image"), async (req, res) => {
  const { title, description, price,image } = req.body;
  const { id } = req.params;
  const product = await productModel.findOneAndUpdate(
    { _id: id },
    { title, description, price ,image}
  );
  if (!product)
    return res.status(500).send({ message: "product can not be updated" });
  res.status(200).send({ message: "product created", id});
})

router.delete("/delete/:id",Authorise, async (req, res) => {
  const{ id } = req.params;
  const product = await productModel.findOneAndDelete({ _id: id  }
  );
  if(!product)
    return res.status(500).send({ message: "product can not be deleted"});
  res.status(200).send({message : "product deleted"})
  
})


router.get("/getProduct/:id",Authorise, async (req, res) => {
  const { id } = req.params;
  const product = await productModel.findOne({  id:_id }).populate("userId");
  if (!product)
    return res.status(500).send({ message: "product can not be found" });
  res.send(product);
});




router.get("/getProducts",Authorise, async (req, res) => {
  let filter = {};

  let { type } = req.query;

  if(type){
    filter.type = type
  }

  let products = await productModel.find(filter).populate
  ({
    path: "userId",
    select: "name phone "  
  })
    
router.get("/getPbyid/:_id",Authorise, async (req, res) => {
 const products = await productModel.findById( req.params._id).populate("userId");
  console.log(product)
  if (product)
    return res.status(200).send({ message: "products" });
  if (products.length === 0) 
    return res.status(404).send({ message: "product not found" });
});
  res.send(products);
});

module.exports = router;