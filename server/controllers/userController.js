import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



// inscription 
export const register = async (req, res) => {
   try {
      const {lastname, firstname, email, password, tel, address} = req.body;
         // PWD: 1 Maj, 1M, 1caractère spé, 1 chiffre entre 8 et 55 caractères
        // source: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
        
        // sécurité 
        if(lastname.trim() === ""
        || firstname.trim() === ""
        || email.trim() === "" 
        || password.trim() === ""
        || tel.trim() === ""
        || address.trim() === ""){
           return res.status(400).json({message: "Veuillez remplir tous les champs."})
        }
        
        // permet de savoir si l'utilisateur est déjà inscrit
        const verifEmail = await User.findOne({email})
        if(verifEmail){
           return res.status(401).json({message: "Cet email est déja enregistré."})
        }
        
        // vérification du mdp regex
        if (!checkPwd.test(password)){
           return res.status(401).json({message: "Le mot de passe choisi ne respecte pas les conditions."})
        }
        
        // pour enregister le nouvel utlisateur dans la base de donnée en hachant mdp
        const newUser = new User({
           lastname,
           firstname,
           email,
           password,
           tel,
           address
        })
        
        await newUser.save()
        res.status(200).json({message: "Compte crée avec succés."})
       
        
   } catch (e) {
      console.log(e)
     res.status(400).json({message: "Impossible de créer un compte."}) 
   }
}

// se connecter
export const login = async (req, res) => {
   try {
      const {email, password} = req.body;
      
      const user = await User.findOne({email})
      
      if(!user){
         return res.status(404).json({message: "Aucun utilisateur enregistré avec cet email."})
      }
      
      const isValidPwd = bcrypt.compareSync(password, user.password)
      
      // si l'utilisateur se trompe de mot de passe
      if(!isValidPwd){
         return res.status(401).json({message: "Mot de passe incorrect."})
      }
      
      // création d'un token si le mdp est correct
      const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
      
      // tout renvoyer sauf le mdp
      res.status(200).json({
         _id: user.id,
         email: user.email,
         lastname: user.lastname,
         firstname: user.firstname,
         tel: user.tel,
         address: user.address,
         role: user.role,
         token // il faut renvoyer le token au client
      })

      
   } catch (e) {
      console.log(e)
      res.status(401).json({message: "Impossible de se connecter."})
   }
}

// récupère tous les utilisateurs
export const getAllUsers = async (req, res) => {
   try {
      
      // on exclue le password
      const users = await User.find({}).select("-password")
      res.status(200).json(users)
      
   } catch (e) {
      
      res.status(400).json({message: "Impossible de récupérer tous les utlisateurs."})
   }
}

// récupère un seul user
export const getOneUser = async (req, res) => {
   try {
    const {id} = req.params
    
    const user = await User.findById(id)
    res.status(200).json(user)
   } catch (e) {
      res.status(400).json({message: "Impossible de récupérer cet utlisateur."})
   }
}

// pour modifier les données personelles de user
export const updateUser = async (req, res) => {
   try {
      const {id} = req.params;
      
      const {email, tel, address} = req.body;
      
      // sécurité
      if(email || tel || address){ 
            if(email && email.trim() === "" 
            || tel && tel.trim() === ""
            || address && address.trim() === ""){
                return res.status(400).json({message: "Veuillez remplir tous les champs."})
            }
        }
      
      const editUser = {
         email,
         tel,
         address
      }
      
      await User.findByIdAndUpdate(id, editUser)
      
      res.status(200).json({message : "Votre profil a bien été mis à jour"})
      
   } catch (e) {
      res.status(401).json({message: "Impossible de mettre à jour le profil"})
   }
}

// changement du mdp 
export const resetPassword = async (req, res) => {
  try {
    const { token, email, password } = req.body;

    if (!password.trim()) {
      return res.status(400).json({ message: "Veuillez entrer un mot de passe" });
    }

    // Regex pour vérifier que le mot de passe respecte les conditions
    const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/;
    if (!checkPwd.test(password)) {
      return res.status(401).json({ message: "Le mot de passe ne respecte pas les conditions" });
    }

    // Trouver l'utilisateur par le token et l'email
    const user = await User.findOne({ resetPasswordToken: token, email });
    if (!user) {
      return res.status(400).json({ message: "Token invalide ou utilisateur introuvable" });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe changé avec succès" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erreur lors de la modification du mot de passe", error: e });
  }
};

// changement du rôle 
export const changeRole = async (req, res) => {
   try {
      const {id} = req.params;
      const {role} = req.body;
      
      // sécurité 
      if(role !== "user" && role !== "admin"){
         return res.status(400).json({message: "Choix invalide"})
      }
      
      await User.findByIdAndUpdate(id, {role})
      
      res.status(200).json({message: "Le rôle a bien été changé."})
   } catch (e) {
      res.status(400).json({message: "Impossible de changer le rôle."})
   }
}

// pour supprimer un user 
export const deleteUser = async (req, res) => {
   try {
      const {id} = req.params;
      
      // on s'assure que l'admin ne peut pas se supprimer lui-même
      if(id === req.userId){
         return res.status(401).json({message: "Vous ne pouvez pas supprimer votre propre compte (admin)."})
          }
          
          await User.findByIdAndDelete(id)
          
          res.status(200).json({message: "Suppresion effectuée"})
          
          
          
   } catch (e) {
      res.status(400).json({message: "Supression impossible."})
   }
}

// pour vérifier qui est l'utilisateur connecté
export const checkUser = async (req, res) => {
   
   try {
       
       // pour ne pas renvoyer le mdp
      const user = await User.findById(req.userId).select("-password")
      
      res.status(200).json(user)
   } catch (e) {
      
      res.status(400).json({message: "Erreur lors de la vérification."})
   }
}






