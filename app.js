const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require('express-session'); 
const flash = require('connect-flash');
require('dotenv').config();



const ownerRouter = require("./routes/ownersRouter");
const usersRouter =  require("./routes/usersRouter");
const productRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose-connection");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(
    expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));





app.use("/", indexRouter)
app.use("/owners",ownerRouter);
app.use("/users",usersRouter);
app.use("/products",productRouter);
app.get('/admin', ownerRouter);


app.listen(3001);
