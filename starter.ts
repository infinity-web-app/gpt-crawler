import Express from 'express'
import dotenv from "dotenv";
import router from "./src/routes.js";
import * as https from "https";
import * as fs from "fs";

const port = 80
const app = Express()
app.use(Express.urlencoded({extended: false}))
app.use(Express.json())

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
