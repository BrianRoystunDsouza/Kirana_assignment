import express from "express";
import DetailsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import mongoose  from "mongoose";
import cors from "cors"
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT || "8800";
app.set("port", port);

app.use(cors())

//Middleware
app.use(express.json({ limit: '100mb' }));

// Increase payload size limit for URL-encoded requests
app.use(express.urlencoded({ limit: '100mb', extended: true }));

//static files 

//DATABASE connection
mongoose
  .connect(process.env.COSMOSDB_URL )
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err));
//Route middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/StudentDetails", DetailsRoutes);


app.listen(port, ()=>console.log("Server Up and running"))
