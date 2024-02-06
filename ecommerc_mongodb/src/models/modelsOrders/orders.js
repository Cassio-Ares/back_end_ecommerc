const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    client: {
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
      ref: "Status",
    },
    deliveryDate: {
      type: Date,
    },
    returnDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const SchemaOrders = mongoose.models.Orders || mongoose.model("Orders", schema);

module.exports = SchemaOrders;
