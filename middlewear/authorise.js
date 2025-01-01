const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const rawToken = req.headers.authorization

        if(!rawToken) return res.status(401).send({message: 'Unauthorize access'});


        const token = rawToken.split(" ")[1]


        const decoded = jwt.verify(token, "JWT_SECRET");
       
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate" });
    }
}; 


module.exports = auth