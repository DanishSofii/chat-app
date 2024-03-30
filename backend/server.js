import express  from "express";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


// const app = express();
const PORT  = process.env.PORT || 5000;

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use("/api/auth/",authRoutes);
app.use("/api/message/",messageRoutes);
app.use("/api/users",userRoutes);

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server started on port ${PORT}`);
})