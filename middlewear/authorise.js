const jwt = require("jsonwebtoken");
const Authorise = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ message: "unauthorized access" });

  const token = authHeader.split(" ")[1];
  

  try {
    let decode = jwt.verify(token, "JWT_SECRET");
     
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "unauthorise access",
    });
  }
};

module.exports = { Authorise };
