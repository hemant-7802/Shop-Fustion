import express from "express"
import connectToDataBase from "./DB/dbConnection.js";
import app from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;

app.use(express.json())

app.listen(port, () => {
    connectToDataBase();
    console.log("App is listening on port number", port)
})