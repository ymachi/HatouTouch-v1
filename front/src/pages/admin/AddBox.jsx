import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const AddBox = () => {
  const [inputs, setInputs] = useState({
    name: "",
    image: null, 
    description: "",
    category: "",
    amount: 0,
    ingredients : []
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'image') {
      setInputs({ ...inputs, [name]: e.target.files[0] });
    } else {
      setInputs({ ...inputs, [name]: value });
    }

    setMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const { name, image, description, category, amount } = inputs;
      const formattedIngredients = JSON.stringify(inputs.ingredients)
      
      // sécurité
      if (name.trim() === "" || !image || description.trim() === "" || category.trim() === "" || amount <= 0) {
        return toast.warning("Veuillez remplir tous les champs.");
      }

      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("amount", amount);
      formData.append("category", category);
      formData.append("ingredients", formattedIngredients)
      
      // envoie de notre formulaire au serveur
      const res = await axios.post("/api/boxs/new", formData, {headers: token()} );

      setMessage(res.data.message);
      toast.success(res.data.message);
    } catch (e) {
      console.log(e)
      toast.error("Erreur lors de la création de la box.");
    }
  }
  
  const handleIngredient = (e, index) => {
    
    const {name, value} = e.target
    const newIngredient = [...inputs.ingredients]
    
    newIngredient[index] = value
    
    setInputs({...inputs, ingredients: newIngredient })
  }

  const handleAddIngredient = () => {
    
    setInputs({...inputs, ingredients: [...inputs.ingredients, " "]})
  }
  return (
    <>
      <main className="content">
        <div className="container">
          <section className="intro">
            <h1>Ajouter une box</h1>
          </section>
          <form className="add-dashboard" encType="multipart/form-data" onSubmit={handleSubmit} method="post">
            <div className="parentparts">
              <section className="partone">
                <label htmlFor="name">Nom du produit</label>
                <input type="text" id="name" name="name" placeholder="Nom du produit" onChange={handleChange} />
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" onChange={handleChange} />
                <label htmlFor="description">Description du produit</label>
                <input type="text" id="description" name="description" placeholder="Description du produit" onChange={handleChange} />
                <label htmlFor="amount">Prix du produit</label>
                <input type="number" id="amount" name="amount" placeholder="Prix du produit" onChange={handleChange} />
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" placeholder="Catégory" onChange={handleChange} />
                
                <label htmlFor="ingredients">Ingredients</label>
                {inputs.ingredients.map((ingredient, i) =>(
                
                <input key={i} type="text" id="ingredients" name="ingredients" placeholder="entrez un ingredients" value={ingredient} onChange={(e)=> handleIngredient(e, i)} />
                
                ))}
                
              <button type="button" onClick={handleAddIngredient}>ajoutez un ingredient</button>
               
              </section>
            </div>
            <input type="submit" value="Ajouter" />
          </form>
        </div>
      </main>
    </>
  );
}

export default AddBox;
