const TransactionModel = require("../models/transactionModel");
const WalletModel = require("../models/walletModel");

const Queue = require('bull');
const queue = new Queue('walletTransactions');

queue.process(async (job, done) => {
  console.log(job)
  const result = await createTransaction(job.data);
  done(result);
})

const createTransactionWrapper = async (req, res) => {
  try {

    queue.add({
      walletId: req.params.walletId,
      amount: req.body.amount,
      description: req.body.description
    }).then(() => console.log("task added to queue"))

    queue.on("completed", (data) => {
      res.send(data);
    })

  }
  catch (error) {
    console.log("error in wrapper: ", error)
  }
}


const createTransaction = async (data) => {
  try {
    const { walletId, amount, description } = data;

    // check if walledId is valid
    const result = await WalletModel.findById(walletId);
    if (result) {

      // check if balance is sufficient in case of subtracting the amount
      const currentBalance = result.balance;
      const balanceAfterTransaction = currentBalance + amount;

      if (balanceAfterTransaction < 0) {
        return { statusCode: 500, message: "insufficient balance" };
      }
      else {
        const updateResult = await WalletModel.updateOne({ _id: walletId }, { balance: { $inc: amount } })
        const transactionResult = await TransactionModel.create({
          walletId, amount, description
        });
        const respObj = {
          balance: updateResult, // otherwise fetch the balance from DB again
          transactionId: transactionResult._id
        }
        return { statusCode: 201, data: respObj };
      }
    }
    else {
      return {
        statusCode: 500,
        message: "walletid doesn't exist"
      }
    }


  }
  catch (error) {
    console.log("error occured during transaction: ", error);
    return { statusCode: 500, message: error.message }
  }
}


module.exports = {
  createTransactionWrapper
}