const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    balance: {
      type: Number
    }
  },
  { timestamps: true }
);

const walletModel = mongoose.model("WalletModel", walletSchema);

module.exports = walletModel;