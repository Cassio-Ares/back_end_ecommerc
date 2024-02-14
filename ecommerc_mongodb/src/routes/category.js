const express = require("express");
const connectDB = require("../middlewares/connectDB");
const router = express.Router();
const Category = require("../models/modelsProducts/productCategory");
const authAdm = require("../middlewares/authAdm");

router.post("/category", authAdm, connectDB, async (req, res) => {
  //#swagger.tags =['Produts/Categories']
  const { category, order } = req.body;

  try {
    const exist = await Category.findOne({ category });
    const orderOcup = await Category.findOne({ order });

    if (exist) {
      throw new Error(category + "já existe no banco de dados.");
    }

    if (orderOcup) {
      throw new Error(
        "Já existe uma categoria na posição " +
          order +
          " já existe no banco de dados."
      );
    }

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
  //#swagger.tags =['Produts/Categories']

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
  //#swagger.tags =['Produts/Categories']
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

router.put("/category/:id", authAdm, connectDB, async (req, res) => {
  //#swagger.tags =['Produts/Categories']
  const { category, order } = req.body;
  const { id } = req.params;

  try {
    if (req.body.category === "" || req.body.order === "") {
      throw new Error(
        "Todos os campos tem que estar devidamente preenchidos para alterar a Categoria"
      );
    }

    if (isNaN(req.body.order)) {
      throw new Error("O campo 'order' deve ser um número inteiro.");
    }

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { category, order },
      { new: true }
    );
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

router.delete("/category/:id", authAdm, connectDB, async (req, res) => {
  //#swagger.tags =['Produts/Categories']
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
