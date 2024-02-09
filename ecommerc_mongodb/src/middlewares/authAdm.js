const jwt = require("jsonwebtoken");

async function authAdm(req, res, next) {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res, new Error("Token de autenticação não fornecido");
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.AdmJwt = decoded;

    next();
  } catch (error) {
    console.error(error);   
    return res, new Error("Token de autenticação invalido");
  }
}

module.exports = authAdm;
