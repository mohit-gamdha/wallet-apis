const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    walletId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("TransactionModel", transactionSchema);

module.exports = transactionModel;