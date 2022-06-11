const jwt = require("jsonwebtoken");

//const config = process.env;
const JWT_SECRET = 'helloworld'

const fetchuser = (req, res, next) => {
  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log(decoded)
    req.user = decoded;
    //console.log(req.user)
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
 
};

module.exports = fetchuser;