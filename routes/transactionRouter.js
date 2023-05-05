const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/:walletId", transactionController.createTransactionWrapper);

module.exports = router