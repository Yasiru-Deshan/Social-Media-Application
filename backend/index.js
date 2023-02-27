const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const awsRoutes = require("./routes/aws-route");
const reCaptchaRoutes = require("./routes/reCaptch-route");
const eventRoutes = require("./routes/EventRoutes");

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/aws", awsRoutes);
app.use("/api/recaptcha", reCaptchaRoutes);
app.use("/api/event", eventRoutes);



const PORT = process.env.PORT || 8071;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
