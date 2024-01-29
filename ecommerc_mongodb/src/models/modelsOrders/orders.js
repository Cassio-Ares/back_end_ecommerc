const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required:"para concluir seu pedido é preciso fazer o cadastrado para que possamos enviar seu pedido com segurança.",
    },
    orderDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetails",
    },
    orderStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderStatus",
    },
    deliveryDate: {
      type: Date,
    },
    returnDeadline: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const SchemaOrders = mongoose.models.Orders || mongoose.model("Orders", schema);

module.exports = SchemaOrders;
