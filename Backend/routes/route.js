const express = require("express")
const router = express.Router();

const { moneyTransfer } = require("../controller/transaction")
const { signup, signin, updateDetails, searchUser, getBalance, getAllUser, me, logout } = require("../controller/userController")
const { auth } = require("../middleware/auth")

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateDetails", auth, updateDetails);
router.get("/searchUser", auth, searchUser);
router.get("/getBalance", auth, getBalance);
router.post("/moneyTransfer", auth, moneyTransfer);
router.get("/getAllUser", auth, getAllUser);
router.get("/me", auth, me);
router.post("/logout", auth, logout);

module.exports = router; 