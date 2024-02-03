const express = require("express");
const connectDB = require("../middlewares/connectDB");
const router = express.Router();
const Category = require("../models/modelsProducts/productCategory");

router.post("/category", connectDB, async (req, res) => {
  //#swagger.tag('Produto/Categoria')
  const { category, order } = req.body;

  try {
    const categoryProducts = await Category.create({ category, order });
    return res.status(200).json(categoryProducts);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "Erro ao tentar cadastrar categoria",
      error: error.message,
    });
  }
});

router.get("/category", connectDB, async (req, res) => {
  //#swagger.tag('Produto/Categoria')

  try {
    const getCategory = await Category.find();
    return res.status(200).json(getCategory);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Erro ao tentar buscar as categorias de produtos" });
  }
});

router.get("/category/:id", connectDB, async (req, res) => {
  //#swagger.tag('Produto/Categoria')
  const { id } = req.params;
  try {
    const getOneCategory = await Category.findById(id);
    return res.status(200).json(getOneCategory);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message:
        "Categoria não encontada verifique os dados e tente novamente por favor.",
    });
  }
});

router.put("/category/:id", connectDB, async (req, res) => {
  //#swagger.tag('Produto/Categoria')
  const body = req.body;

  const { id } = req.params;

  try {
    const updateCategory = await Category.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateCategory);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message:
        "Erro ao editar a categoria verifique se vc preencheu os dados adequadamente por favor.",
      error: error.message,
    });
  }
});

router.delete("/category/:id", connectDB, async (req, res) => {
  //#swagger.tag('Produto/Categoria')
  const { id } = req.params;

  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    return res.status(200).json(deleteCategory);
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .json({ message: "Erro ao tentar deletar a categoria." });
  }
});

module.exports = router;
