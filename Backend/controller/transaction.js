const User = require("../model/user");
const Account = require("../model/account");

exports.moneyTransfer = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { to, amount } = req.body;
        const accountBalanceCheck = await Account.findOne({ userId: req.user.userId, balance: { $gte: amount } }).session(session);
        if (!accountBalanceCheck) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                {
                    success: false,
                    message: "Not enought money in the bank"
                }
            )
        }
        const accountExist = await Account.findOne({ userId: to }).session(session);
        if (!accountExist) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                {
                    success: false,
                    message: "Reciever doesn't exists",
                }
            )
        }
        await Account.findByIdAndUpdate(accountBalanceCheck._id, { $inc: { balance: -amount } }).session(session);
        await Account.findByIdAndUpdate(accountExist._id, { $inc: { balance: amount } }).session(session);
        await session.commitTransaction();
        session.endSession();
        return res.json(
            {
                success: true,
                message: "Transaction was successful",
            }
        )
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("Error occured in the transaction");
        return res.status(500).json(
            {
                success: false,
                message: "Transaction was unsuccessful",
                error
            }
        )
    }
}