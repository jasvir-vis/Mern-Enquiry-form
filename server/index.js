const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routes/Erouter");
const cors = require("cors");

app.use(express.json());
app.use(cors());

PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.DB_URl || "mongodb://localhost:27017/";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})

}).catch(err => {
    console.log("Error connecting to MongoDB:", err);
});



app.use('/api',router);


