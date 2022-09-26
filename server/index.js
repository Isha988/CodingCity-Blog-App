const express = require ("express");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const blogRouter = require ("./routes/blogs");
const adminRouter = require ("./routes/admin");
const imagesRouter = require("./routes/images");
const router = require("./routes/routes");

const app = express();
const port = process.env.PORT || 8000;

//dotenv
dotenv.config();

//mongoose connection
mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("connected to database"))
    .catch((error) => console.log("connection failed"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// static files
app.use("/images" , express.static('images'));
app.use("/blog", blogRouter);
app.use("/admin", adminRouter);
app.use("/images", imagesRouter);
app.use("/", router);

app.listen(port, ()=>{
    console.log(`app is running on port :${port}`)
})