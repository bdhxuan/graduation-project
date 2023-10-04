const app = require("./app");
const config = require("./app/config");
const Mongoose = require("./app/utils/mongoose.util");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");


process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit();
});

dotenv.config({path:"backend/app/config/index.js"});

cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
})


async function startServer() {
    try {
        await Mongoose.connect(config.db.uri, {useNewURLParser: true, useUnifiedTopology: true, useCreateIndex: true}).then((data) => {
            console.log("Connected to the database!");
        });
        const PORT = config.app.port;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }catch (error){
        console.log("Cannot connected to the database!", error);
        process.exit();
    }
}

process.on("unhandledRejection", err=> {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit();
    });
});

startServer();