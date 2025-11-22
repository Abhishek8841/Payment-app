const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

require("./config/database").dbConnect()

const router = require("./routes/route");
app.use("/api/v1", router);


app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})
