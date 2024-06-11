import mongoose from "mongoose";
import Gallery from "../models/galleryModel.js";


// pour ajouter une nouvelle photo 
export const addGallery = async (req, res) => {
   try {
      
      const {alt} = req.body;
      
      // sécurité
      
      const newGallery = new Gallery({
         
         image: {
            src: req.file && req.file.filename,
            alt
         }
      })
      
      await newGallery.save();
      
      res.status(200).json({message: "Image bien ajoutée à la gallery."})
   } catch (e) {
      
      return res.status(400).json({message: "Veuillez remplir tous les champs."})
   }
}

// pour récupérer toutes les photos 
export const getAllGallery = async (req, res) => {
   try {
      
      const galleries = await Gallery.find({});
      
      res.status(200).json(galleries);
      
   } catch (e) {
      
      res.status(400).json({message: "Impossible de récupérer les images."})
   }
}

// pour supprimer une image 
export const deleteGallery = async (req, res) => {
   try {
      
      const {id} = req.params;
      
      await Gallery.findByIdAndDelete(id)
      
      res.status(200).json({message: "Image supprimée."})
      
   } catch (e) {
      
      res.status(400).json({message: "Impossible de supprimer cette image."})
   }
}


