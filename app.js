if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DB_URL
    : process.env.ATLASDB_URL;



main().then(() => {
  console.log("connected to DB");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect(dbUrl);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

let store;

if (process.env.NODE_ENV !== "test") {
  store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 3600,
  });

  store.on("error", () => {
    console.log("error in mongo session store");
  });
}

const sessionOptions = {
  store: process.env.NODE_ENV === "test" ? undefined : store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
};


// app.get("/",(req,res)=>{
//     res.send("Hey! I am GROOT");
// });


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());//passport initialize for each req
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());//Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser());//Generates a function that is used by Passport to deserialize users into the session

app.use((req, res, next) => {
  // console.log("Current User:", req.user);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.get("/demouser", async (req, res) => {
  let fakeUser = new User({
    email: "stundent@gmail.com",
    username: "ALEX MERCER",
  });
  let registerUser = await User.register(fakeUser, "helloworld");//asyncronous
  res.send(registerUser);
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//       title: "NEW VILLA",
//       description: "BY THE BEACH",
//       price:12000,  
//       location:"GOA",
//       country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
// "*" not working due to express compatibility issues
app.get("/trigger-error", (req, res) => {
  throw new ExpressError(400, "This is a test error");
});
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err }); 
});

if (process.env.NODE_ENV !== "test") {
  app.listen(8080, () => {
    console.log("I am Listening");
  });
}

module.exports = app;
