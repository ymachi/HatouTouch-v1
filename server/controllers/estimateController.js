import Estimate from "../models/estimateModel.js"


// pour ajouter un devis
export const addEstimate = async (req, res) => {
   try {
      
      const {lastname, firstname, email, tel, address, invited, event, eventDate, budget, message, compagny} = req.body
      
      // sécurité 
      if(lastname.trim() === "" 
      || firstname.trim() === ""
      || email.trim() === ""
      || tel.trim() === ""
      || address.trim() === ""
      || invited.trim() === "" && invited <= 0
      || event.trim() === ""
      || eventDate.trim() === ""
      || budget.trim() === "" && budget <= 0){
         
         return res.status(400).json({message: "Veuillez remplir correctement tous les champs."})
      }
      
      const newEstimate = new Estimate({
         lastname,
         firstname, 
         email, 
         tel, 
         address, 
         invited, 
         event, 
         eventDate, 
         budget, 
         compagny,
         message
      })
      
      await newEstimate.save()
      
      res.status(200).json({message: "Devis ajouté."})
      
      
   } catch (e) {
      console.log(e)
      res.status(400).json({message: "Impossible d'ajouter un devis."})
      
   }
}

// pour récupérer tous les devis
export const getAllEstimates = async (req, res) => {
   try {
      const estimates = await Estimate.find({})
      
      res.status(200).json(estimates)
      
   } catch (e) {
       console.log(e)
      res.status(400).json({message: "Impossible de récupérer tous les devis."})
   }
}

// pour changer de status
export const changeStatus = async (req, res) => {
   
   try {
      const {id} = req.params;
   
      const {status} = req.body;
      
      // sécurité
      if(status !== "refused" && status !== "accepted" && status !== "pending"){
         return res.status(400).json({message: "Choix invalide."})
      }
   
         await Estimate.findByIdAndUpdate(id, {status})
      
      
      res.status(200).json({message: "Le statut a bien été changé."})
      
      
   } catch (e) {
      
      console.log(e)
      
      res.status(400).json({message: "Impossible de changer le statut."})
   }
}


// pour supprimer un devis
export const deleteEstimate = async (req, res) => {
   try {
      
      const {id} = req.params;
   
      await Estimate.findByIdAndDelete(id)
   
   res.status(200).json({message: "Suppression effectuée."})
   
   } catch (e) {
      res.status(200).json({message: "Suppression impossible."})
   }
   
   
}