import path from "path";
import express  from "express";
import dotenv  from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


dotenv.config();
// const app = express();
const PORT  = process.env.PORT || 5000;
// console.log(PORT)

const __dirname = path.resolve();




app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:["http://localhost:3000",'https://connectus-b6mr.onrender.com'],
}));
app.use("/api/auth/",authRoutes);
app.use("/api/message/",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server started on port ${PORT}`);
})