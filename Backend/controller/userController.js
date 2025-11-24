const User = require("../model/user");
const Account = require("../model/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const zod = require("zod");
require("dotenv").config();

const signupSchema = zod.object(
    {
        username: zod.string().email(),
        firstName: zod.string().max(30),
        lastName: zod.string().max(30),
        password: zod.string().min(3),
    }
)
const signinSchema = zod.object(
    {
        username: zod.string().email(),
        password: zod.string().min(3),
    }
)
exports.signup = async (req, res) => {

    try {
        const { username, firstName, lastName, password } = req.body;
        const response = signupSchema.safeParse({ username, firstName, lastName, password });
        if (!response.success) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Couldn't signup -> inputs are not correct"
                }
            )
        }

        const alreadyExistingUser = await User.findOne({ username });
        if (alreadyExistingUser) {
            return res.status(409).json(
                {
                    success: false,
                    message: "Username already registered"
                }
            )
        }

        let hashedpassword;
        try {
            hashedpassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Error while hashing the password"
                }
            )
        }
        const newUser = await User.create(
            {
                username, firstName, lastName,
                password: hashedpassword,
            }
        )
        const newAccount = await Account.create(
            {
                userId: newUser._id,
                balance: Math.floor(Math.random() * 1000),
            }
        )
        // newUser.password = undefined
        return res.json(
            {
                success: true,
                message: "New user successfully added",
                newUser,
                newAccount,
            }
        )

    } catch (error) {
        console.log("Error while signing up", error);
        return res.status(500).json(
            {
                success: false,
                message: "Error while signing up",
                error
            }
        )
    }
}


exports.signin = async (req, res) => {

    try {
        const { username, password } = req.body;
        const response = signinSchema.safeParse({ username, password });
        if (!response.success) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Couldn't signin -> inputs are not correct"
                }
            )
        }

        const alreadyExistingUser = await User.findOne({ username });
        if (!alreadyExistingUser) {
            return res.status(409).json(
                {
                    success: false,
                    message: "Username is not registered -> signup first"
                }
            )
        }

        const payload = {
            userId: alreadyExistingUser._id,
            username
        }
        if (! await bcrypt.compare(password, alreadyExistingUser.password)) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Password is not correct",
                }
            )
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        })
        // alreadyExistingUser.password = undefined;
        const account = await Account.findOne({ userId: alreadyExistingUser._id });

        return res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }).json(
            {
                success: true,
                message: "User logged in successfully",
                alreadyExistingUser,
                token,
                account,
            }
        )
    } catch (error) {
        console.log("Error while signing in", error);
        return res.status(500).json(
            {
                success: false,
                message: "Error while signing in",
                error
            }
        )
    }
}


exports.updateDetails = async (req, res) => {
    try {
        const { password, lastName, firstName } = req.body;
        if (!zod.string().min(3).safeParse(password).success || !zod.string().max(30).safeParse(firstName).success || !zod.string.max(30).safeParse(lastName).success) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Couldn't signin -> inputs are not correct"
                }
            )
        }
        const id = req.user.userId;
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User doesn't exist in the Database"
                }
            )
        }

        let hashedpassword;
        if (password) {
            try {
                hashedpassword = await bcrypt.hash(password, 10);
            } catch (error) {
                return res.status(500).json(
                    {
                        success: false,
                        message: "Error while hashing the password"
                    }
                )
            }
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            firstName: firstName || foundUser.firstName, lastName: lastName || foundUser.lastName, password: hashedpassword || foundUser.password
        }, { new: true });
        res.json(
            {
                success: true,
                message: "Credentials updated successfully",
                updatedUser
            }
        )
    } catch (error) {
        console.log("Error while updating credentials", error);
        return res.status(500).json(
            {
                success: false,
                message: "Error while updating credentials",
                error
            }
        )
    }
}

exports.searchUser = async (req, res) => {
    try {
        const filter = req.query.filter;
        const id = req.user.userId;
        const users = await User.find(
            {
                $or: [{ lastName: { $regex: filter, $options: "i" } }, { firstName: { $regex: filter, $options: "i" } }],
                _id: { $ne: id }
            }
        ).select("username firstName lastName _id")
        return res.json(
            {
                success: true,
                message: "Successfully fetched the users",
                users
            }
        )
        // Here $and is not needed as when multiple queries are inside find in mongodb then mongodb treats it as and operation
    } catch (error) {
        console.log("Error while searching", error);
        return res.status(500).json(
            {
                success: false,
                message: "Unsuccessfull while fetching the users",
                error
            }
        )
    }
}


exports.getBalance = async (req, res) => {
    try {
        const id = req.user.userId;
        const accountFound = await Account.findOne({ userId: id });
        if (!accountFound) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Couldn't find the account",
                }
            )
        }
        return res.json(
            {
                success: true,
                message: "Successfully fetched the Bank Balance",
                balance: accountFound.balance,
            }
        )
    } catch (error) {
        console.log("Error while fetching the balance", error);
        return res.status(500).json(
            {
                success: false,
                message: "Error while fetching the balance",
                error
            }
        )
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const id = req.user.userId;
        const allUsers = await User.find({ _id: { $ne: id } });
        return res.json(
            {
                success: true,
                message: "successfully fetched all the users",
                allUsers
            }
        )
    } catch (error) {
        console.log("Error while fetching the users", error);
        return res.status(500).json({
            success: false,
            message: 'Error while fetching the users'
        })
    }
}

exports.me = async (req, res) => {
    try {
        const id = req.user.userId;
        const me = await User.findOne({ _id: id });
        const account = await Account.findOne({ userId: id });
        return res.json(
            {
                success: true,
                message: "Successfully fetched your details",
                me,
                account,
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Couldn't fetch your details",
                error: error.message,
            }
        )
    }
}


exports.logout = async (req, res) => {
    res.clearCookie("token"); 
    return res.json({
        success: true,
        message: "Logged out successfully"
    });
};
