// Requiring all the modules.
var express      = require("express"),
methodOverride   = require("method-override"),
expressSanitizer = require("express-sanitizer")
bodyparser       = require("body-parser"),
mongoose         = require("mongoose"),
flash            = require("connect-flash");
app              = express();

// Using the .env file
require("dotenv").config({ path: "./.env" });

// Connecting to the database
mongoose.connect(process.env.Mongodb_URL, { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// Express session required
app.use(require("express-session")({
    secret: "Aything with the designer",
    resave: false,
    saveUninitialized: false,
}));


// Enable the app to use the Flash
app.use(flash());

// Local Storage variables
app.use(function(req, res, next){
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

// Requiring the routes
var indexRoutes = require("./routes/index.js");
var apiRoutes = require("./routes/api.js");

// Using the routes
app.use("/", indexRoutes);
app.use("/api/", indexRoutes);

const PORT = process.env.PORT || 80;
// Listening the app to the port
app.listen(PORT, function(){
    console.log(`The App is listening on ${PORT}`);
})