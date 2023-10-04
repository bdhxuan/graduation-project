const express = require("express");
const cors = require("cors");
const ApiError = require("./app/middleware/api-error");
const product = require("./app/routes/product.route");
const user = require("./app/routes/user.route");
const order = require("./app/routes/order.route");
const filter = require("./app/routes/filter.route");
const feature = require("./app/routes/feature.route");
const category = require("./app/routes/category.route")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { config } = require("dotenv");


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


app.use("/api/v1", product);

app.use("/api/v1", user);

app.use("/api/v1", order);

app.use("/api/v1", filter);

app.use("/api/v1", feature);

app.use("/api/v1", category);



app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
});


module.exports = app;