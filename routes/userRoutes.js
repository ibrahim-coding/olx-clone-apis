const { Router } = require("express");
const userModel = require("../models/userModel");
const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

router.post("/register", async (req, res) => {
  let { name, password, email, phone } = req.body;

  let existingUser = await userModel.findOne({ email });
  if (existingUser)
    return res.status(409).send({ message: "email already exist" });
  let hashpassword = await bcrypt.hash(password, 10).catch((err) => {
    console.log(err);
  });
  let newUser = await new userModel({
    name,
    password: hashpassword,
    email,
    phone,
  }).save();
  if (!newUser)
    return res.status(500).send({ message: "user can not be created " });

  res.status(201).send({
    message: "user created",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  let existinguser = await userModel.findOne({email});
  if (!existinguser) return res.status(404).send("incorrect email or password");
  const accesstoken = jwt.sign(
    { id: existinguser._id, email: existinguser.email },
    "JWT_SECRET"
  );

  let { password: pass, ...user } = existinguser.toJSON();


  let validpassword = await bcrypt.compare(password, pass);
  if (!validpassword)
    return res.status(404).send({ message: "incorrect email or password" });
  res.status(200).send({
    message: "user successfully loggedin",
    accessToken,
    user,
  });
});

router.put(`/update/:id`, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = await userModel.findOneAndUpdate({ _id: id }, body);
  if (!user) {
    return res.status(500).send({
      message: "Cannot update user",
    });
  }

  res.send({
    message: "user updated",
    id,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  let user = await userModel.findOneAndDelete({ _id: id });

  if (!user)
    return res.status(500).send({
      message: "unable to delete user",
    });

  res.send({
    message: "user deleted",
    id,
  });
});

module.exports = router;
