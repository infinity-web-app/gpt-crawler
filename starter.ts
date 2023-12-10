import Express from 'express'
import dotenv from "dotenv";
import router from "./src/routes.js";
import * as https from "https";
import * as fs from "fs";

const timeout = require('express-timeout-handler')

const port = 80
const app = Express()
const options = {timeout: 300000}
app.use(Express.urlencoded({extended: false}))
app.use(Express.json())
app.use(timeout.handler(options))

dotenv.config()

app.use(router)
https.createServer({
    key: fs.readFileSync('privatekey.pem'),
    cert: fs.readFileSync('certificate.pem')
}, app).listen(443, () => {
    console.log(`Listening at port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Listening at port ${port}`);
// })
