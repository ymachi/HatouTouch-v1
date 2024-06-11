import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../css/contact.css';

const Contact = () => {
   
   const { user } = useAuth(); // pour obtenir l'utilisateur connecté
   
   const [formInput, setFormInput] = useState({
     lastname: "",
     firstname: "",
     email: "",
     tel: "",
     message: ""
   });
   
   const [message, setMessage] = useState("");
   
   useEffect(() => {
     if (user) {
       setFormInput({
        lastname: user.lastname || "",
        firstname: user.firstname || "",
        email: user.email || "",
        tel: user.tel || "",
        message: ""
       });
     };
   }, [user]);
   
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormInput({ ...formInput, [name]: value });
     setMessage("");
   }
   
   const handleSubmit = async (e) => {
     e.preventDefault();
     
     try {
      const { lastname, firstname, email, tel, message } = formInput;
     
     // sécurité 
     if (lastname.trim() === "" 
      || firstname.trim() === ""
      || email.trim() === ""
      || tel.trim() === ""
      || message.trim() === "") {
        return toast.warning("Veuillez remplir tous les champs.");
      }
      
      const res = await axios.post("/api/contacts/new", formInput);
      toast.success(res.data.message);
      
     } catch (e) {
       toast.error(e.response.data.message);
     }
   }
   
   return (
      <>
      <main>
          <div className="contact-container">
      <article className="intro-contact">
        <h1 className="title-contact">Contact</h1>
        <p className="intro-contact">
          Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
        </p>
      </article>

      <form className="formcontact" onSubmit={handleSubmit}>
        <div className="parents-contact">
          <section className="partone-contact">
            <label htmlFor="lastname">Nom :</label>
            <input 
              type="text" 
              id="lastname" 
              name="lastname" 
              placeholder="Nom" 
              value={formInput.lastname} 
              onChange={handleChange} 
            />
            <label htmlFor="firstname">Prénom :</label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname" 
              placeholder="Prénom" 
              value={formInput.firstname} 
              onChange={handleChange} 
            />
          </section>

          <section className="parttwo-contact">
            <label htmlFor="email">Email :</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              value={formInput.email} 
              onChange={handleChange} 
            />
            <label htmlFor="tel">Téléphone : </label>
            <input 
              type="tel" 
              id="tel" 
              name="tel" 
              placeholder="Numéro" 
              value={formInput.tel} 
              onChange={handleChange} 
            />
          </section>
        </div>

        <section className="message">
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            cols="33" 
            placeholder="Message" 
            value={formInput.message} 
            onChange={handleChange} 
          ></textarea>
        </section>
        <input type="submit" value="Envoyer" />
      </form>
    </div>

      </main>
      </>
   );
}

export default Contact;
