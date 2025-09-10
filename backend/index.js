import express from "express";
import connectToDB from "./utils/connectToDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen(3000, () => {
  connectToDB();
  console.log("Server is running!");
});
