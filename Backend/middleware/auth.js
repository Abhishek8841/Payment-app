require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.body?.token || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token is missing",
                }
            )
        }

        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(token);
            console.log(decodedPayload);
            req.user = decodedPayload;
        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: "Token is invalid"
                }
            )
        }
        next();
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Error while authenticating",
            }
        )
    }
}