import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
   content: {
      type: String,
      required: true
   },
   
   rating: {
      type: Number,
      required: true,
      max: 5
   },
   
   userId: {
      type: mongoose.Types.ObjectId,
      ref: "User", // pour relier ma collection User avec comment
      required: true
   },

   
   
}, {
   timestamps: true 
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment 