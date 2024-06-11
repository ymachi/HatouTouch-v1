import Comment from "../models/commentModel.js";

// pour ajouter un avis
export const addComment = async (req, res) => {
   try {
      
      const {content, rating} = req.body;
      
      // sécurité
      if(content.trim() === "" 
      || rating <= 0 
      || rating > 5){
         return res.status(400).json({message: "Veuillez remplir les champs correctement."})
      }
      
      const newComment = new Comment({
         content,
         rating,
         userId: req.userId 
      })
      
      await newComment.save();
      
      res.status(200).json({message: "Commentaire ajoutée."})
      
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Impossible d'ajouter un nouveau commentaire."})
   }
}

// pour récupérer tous les avis 
export const getAllComments = async (req, res) => {
   try {
      
      const comments = await Comment.find({});
      
      res.status(200).json(comments); 
       
   } catch (e) {
      
      res.status(400).json({message: "Impossible de récupérer tous les avis."})
   }
}

// pour supprimer un avis 
export const deleteComment = async (req, res) => {
   try {
      const {id} = req.params
      
      await Comment.findByIdAndDelete(id)
      
      res.status(200).json({message : "Le commentaire a bien été supprimé."})
      
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Supression impossible."})
   }
}

