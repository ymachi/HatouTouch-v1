import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { token } from "../context/token";
import '../css/estimate.css';


const Estimate = () => {
   const {user} = useAuth(); // pour obtenir l'utilisateur connecté
   
   const [formInput, setFormInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    address: "",
    invited: "",
    event: "",
    eventDate: "",
    budget: "",
    compagny: "",
    message: ""
   });
   
   
   
   useEffect(() => {
     if (user){
        setFormInput({
          lastname: user.lastname || "",
          firstname: user.firstname || "",
          email: user.email || "",
          tel: user.tel || "",
          address: user.address || "",
          invited: "",
          event: "",
          eventDate: "",
          budget: "",
          compagny: "",
          message: ""
        });
     }
     
   }, [user]);
   
   const handleChange = (e) => {
     const {name, value} = e.target;
     setFormInput({...formInput, [name]: value})
     
     
   }
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     
     try {
       
       
      const { lastname, firstname, email, tel, address, invited, event, eventDate, budget } = formInput
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
       return toast.warning("Veuillez remplir correctement tous les champs.")
      }
       const res = await axios.post("/api/estimates/new", formInput, {headers: token()})
       toast.success(res.data.message)
       
     } catch (e) {
       console.log(e)
       toast.error(e.response.data.message)
     }
  
   }
   
   
   
   return (
      <>
      <main>
        <div className="devis-container">
          <section className="intro-devis">
            <h1 className="title-devis">Demande de devis</h1>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
          </section>

          <form className="devis" onSubmit={handleSubmit} method="post">
            <div className="parents-estimate">
              <section className="partone-information">
                <label htmlFor="lastname">Nom : </label>
                <input type="text" id="lastname" name="lastname" placeholder="Nom" onChange={handleChange} value={formInput.lastname}/>
                <label htmlFor="firstname">Prénom : </label>
                <input type="text" id="firstname" name="firstname" placeholder="Prénom" onChange={handleChange} value={formInput.firstname} />
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={formInput.email} />
                <label htmlFor="tel">Téléphone : </label>
                <input type="tel" id="tel" name="tel" placeholder="Numéro"onChange={handleChange} value={formInput.tel} />
                <label htmlFor="date">Date de l'évenement : </label>
                <input type="date" id="eventDate" name="eventDate" placeholder="Date de l'évènement" onChange={handleChange} value={formInput.eventDate} />
              </section>

              <section className="parttwo-event">
                <label htmlFor="address">Adresse : </label>
                <input type="text" id="address" name="address" placeholder="Adresse du lieu" onChange={handleChange} value={formInput.address} />
                <label htmlFor="convives">Convives : </label>
                <input type="number" id="invited" name="invited" placeholder="Nombre de convives" onChange={handleChange} value={formInput.invited}/>
                <label htmlFor="event">Evénement : </label>
                <select name="event" id="event" placeholder="Type d'évènement" onChange={handleChange} value={formInput.event} >
                  <option value="">Type d'événement</option>
                  <option value="professionnal">Professionnel</option>
                  <option value="private">Privée</option>
                  <option value="association">Association</option>
                </select>
                <label htmlFor="compagny">Raison social : </label>
                <input type="text" id="compagny" name="compagny" placeholder="Si professionnel, raison social" onChange={handleChange} value={formInput.compagny}  />
                <label htmlFor="budget">Budget : </label>
                <input type="number" id="budget" name="budget" placeholder="Budget" onChange={handleChange} value={formInput.budget} />
              </section>
            </div>

            <section className="message">
              <textarea id="message" name="message" rows="5" cols="33" placeholder="Message" onChange={handleChange} value={formInput.message}></textarea>
            </section>
            <input type="submit" value="Envoyer" />
          </form>
        </div>
      </main>

      
      
      
      
      
      
      
      </>
   
   )
}

export default Estimate