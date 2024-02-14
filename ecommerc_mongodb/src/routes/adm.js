const express = require("express");
const connectBD = require("../middlewares/connectDB");
const ADM = require("../models/modelAdm/adm");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authAdm = require("../middlewares/authAdm");

router.post("/admincreate", connectBD, async (req, res) => {
  //#swagger.tags=['Admin']
  let { name, email, password } = req.body;

  try {
    if (
      req.body.email &&
      req.body.email !== "" &&
      !/\S+@\S+\.\S+/.test(req.body.email)
    ) {
      throw new Error(req.body.email + " não é um formato de email válido");
    }

    if (req.body.password === "") {
      throw new Error("A senha não pode estar vazia.");
    }

    const hash = 10;
    const passwordCrypt = await bcrypt.hash(password, hash);
    const adm = await ADM.create({ name, email, password: passwordCrypt });
    return res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", connectBD, async (req, res) => {
  //#swagger.tags=['Admin']
  let { email, password } = req.body;
  try {
    if (!req.body.email) {
      throw new Error("O campo e-mail é obrigatório");
    }

    if (!req.body.password) {
      throw new Error("O campo senha é obrigatório");
    }

    let returnBD = await ADM.findOne({ email }).select("+password");

    if (!returnBD) {
      throw new Error("Email ou senha incorretos");
    }

    const realPassword = await bcrypt.compare(password, returnBD.password);

    if (!realPassword) {
      throw new Error("Email ou senha incorretos");
    }

    let token = jwt.sign({ id: returnBD._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.header("x-auth-token", token);

    return res.status(200).json({
      message: "Login realizado com sucesso",
      response: "x-auth-token",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

router.put("/alter/:id", connectBD, async (req, res) => {
  //#swagger.tags=['Admin']
  let { name, email, password } = req.body;
  const { id } = req.params;

  try {
    if (req.body.name === "") {
      throw new Error("A nome não pode estar vazia.");
    }

    if (req.body.email === "") {
      throw new Error("O e-mail não pode estar vazia.");
    }

    if (
      req.body.email &&
      req.body.email !== "" &&
      !/\S+@\S+\.\S+/.test(req.body.email)
    ) {
      throw new Error(req.body.email + " não é um formato de email válido");
    }

    if (req.body.password === "") {
      throw new Error("A senha não pode estar vazia.");
    }
    const putAdmin = await ADM.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    return res.status(200).json({ putAdmin });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: error.message });
  }
});

router.delete("/admin/:id", authAdm, connectBD, async (req, res) => {
  //#swagger.tags=['Admin']
  const { id } = req.params;
  try {
    const deleteAdmin = await ADM.findByIdAndDelete(id);
    return res.status(200).json({ deleteAdmin });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: error.message });
  }
});

module.exports = router;


