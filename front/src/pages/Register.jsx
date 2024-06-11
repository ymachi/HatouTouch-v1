import { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';


import "../css/register.css"

const Register = () => {
  const [formInput, setFormInput] = useState({
    lastname: "",
    firstname: "",
    email: "",
    tel: "",
    address: "",
    password: ""
  });

  const [checkPwd, setCheckPwd] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  })

  const [isCompleted, setIsCompleted] = useState(true);
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormInput({ ...formInput, [name]: value })

    setFormInput(prev => ({ ...prev, [name]: value }))

    isNotFullCompleted()

    // validation pour le mdp
    if (name === "password") {
      const minLength = value.length >= 8; // Renvoie un true et false
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)

      return setCheckPwd({
        minLength,
        uppercase,
        lowercase,
        specialChar,
        isFocus: true
      })
    }

    setCheckPwd(prev => ({ ...prev, isFocus: false }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
     
     
    try {
      
      const {lastname, firstname, email, password, tel, address} = formInput
      // sécurité 
        if(lastname.trim() === ""
        || firstname.trim() === ""
        || email.trim() === "" 
        || password.trim() === ""
        || tel.trim() === ""
        || address.trim() === ""){
           return toast.warning("Veuillez remplir tous les champs.")
        }
      const res = await axios.post("/api/users/register", formInput)
      toast.success(res.data.message)
      
  
      navigate("/se-connecter");

    }
    catch (e) {
      // pour afficher le message d'erreur venant du back
      toast.error(e.response.data.message)
    }
  }

  const renderValidation = (isValid) => (
    isValid ? <span className="green">✅</span> : <span className="red"> ❌ </span>
  )

  const isNotFullCompleted = () => {
    const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,55}$/
    if (!checkPwd.test(formInput.password)) {
      return setIsCompleted(true)
    }
    return setIsCompleted(false)
  }
  return (
    < >
    <main>
      <div className="register-container">
        <section className="intro">
          <h1 className="title-inscription">S'inscrire</h1>
        </section>
        <form className="register" onSubmit={handleSubmit} method="post">
          <div className="parents-register">
            <section className="partone-register">
              <label htmlFor="lastname">Nom : </label>
              <input type="text" id="lastname" name="lastname" placeholder="Nom" onChange={handleChange} value={formInput.lastname} />
              <label htmlFor="name">Prénom :</label>
              <input type="text" id="firstname" name="firstname" placeholder="Prénom" onChange={handleChange} value={formInput.firstname} />
              <label htmlFor="tel">Téléphone</label>
              <input type="tel" id="tel" name="tel" placeholder="Numéro" onChange={handleChange} value={formInput.tel} />
            </section>
            <section className="parttwo-register">
            <label htmlFor="address">Adresse :</label>
              <input type="text" id="address" name="address" placeholder="Adresse" onChange={handleChange} value={formInput.address}/>
              <label htmlFor="email">Email : </label>
              <input type="email" id="email" name="email" placeholder="Email" onChange={handleChange} value={formInput.email} />
              <label htmlFor="password">Mot de passe : </label>
              <input type="password" id="password" name="password" placeholder="Mot de passe" onChange={handleChange} value={formInput.password}/>
              
              {checkPwd.isFocus && 
              <section className="verif"> 
                <p className="text-white"> {renderValidation(checkPwd.minLength)} Au moins 8 caractères  </p>
                <p className="text-white"> {renderValidation(checkPwd.uppercase)} Au moins 1 majuscule  </p>
                <p className="text-white"> {renderValidation(checkPwd.lowercase)} Au moins 1 minuscule  </p>
                <p className="text-white"> {renderValidation(checkPwd.specialChar)} Au moins 1 caractère spécial  </p>
              </section>
              }
              
            </section>
          </div>
          <input type="submit" value="S'inscrire" />
        </form>
        <section>
          <p>Se connecter ? <NavLink to="/login">Appuyer ici</NavLink></p>
          <p>Mot de passe oublié ? <NavLink to="/reset-password">Réinitialiser ici</NavLink></p>
        </section>
      </div>
    </main>
    </>
  )
}


export default Register