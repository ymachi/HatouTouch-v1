import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/database.js";
import router from "./routes/router.js";
import cors from "cors";

const app = express();

// je connecte avec ma database
connectDB;

// pour lire le contenue du fichier 
dotenv.config();

// pour convertir la req.body qui est en json
app.use(express.json()) 

// pour déchiffrer la méthode post
app.use(express.urlencoded({extended:true})) 

// pour prendre tous les dossiers à l'interieur du dossier public
app.use(express.static("public")) 

app.use(cors({
   origin: "http://aminatadiawara.ide.3wa.io:3000"
}));

// j'appelle router.js qui englope toute mes routes
app.use("/api", router);







app.listen(process.env.PORT || 9000, () => {
   console.log(`Server is running: ${process.env.BASE_URL}`)
})

