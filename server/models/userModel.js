import mongoose from "mongoose"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema({
   
   lastname: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20
   },
   
   firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 20
   },
   
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      maxLength: 320
   },
   
   password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 55
   },
   
   tel: {
      type: String,
      required: true,
      unique: true
   },
   
   address: {
      type: String,
      required: true,
      
   },
   
   role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user"
   }
   
}, {
   timestamps: true
});
   
// hook qui sera exécuté avant la création de l'utilisateur
userSchema.pre("save", async function(next){
   
   // si le champs mdp n'a pas été modifié
   if(!this.isModified("password")){
      return next();
   }
   try {
      const salt = await bcrypt.genSalt(10) // 2e10
      this.password = await bcrypt.hash(this.password, salt)
   } catch (e){
      next(e)
   }
});

const User = mongoose.model("User", userSchema);

export default User;


   
   
   
   
   
   
   
   
   
   
