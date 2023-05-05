const WalletModel = require("../models/walletModel");

const createWallet = async (req, res) => {
  try {
    const result = await WalletModel.create(req.body);
    const respData = {
      id: result.name,
      balance: result.balance.toFixed(4),
      transactionId: result._id,
      name: result.name,
      date: result.createdAt
    }
    res.status(201).json(respData);
  }
  catch (error) {
    console.log("error occured while creating wallet: ", error);
    res.status(500).json({ message: error.message })
  }
}


module.exports = {
  createWallet
}