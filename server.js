const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");
const port = process.env.PORT || 3000;
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to mongoose"));

app.use("/", indexRouter)

app.listen(port, () => console.log("Server is up and running on PORT 3000"))