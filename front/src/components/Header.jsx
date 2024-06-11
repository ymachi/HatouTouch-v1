import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import '../css/style.css'

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
   toast.success("Vous êtes bien déconnecté.");

    setTimeout(() => {
      navigate("/se-connecter");
    }, 2000);
  };

  return (
    <>
      <header>
        <img className="logo" id="logo" src="/logo.jpg" alt="logo" />
        <p className="slogan">Hatou'Touch</p>

        <div className="navbar">
          <nav className="viewer">
            <NavLink className="link" to="/">Home</NavLink>
            <NavLink className="link" to="/réalisations">Nos réalisations</NavLink>
            <NavLink className="link" to="/demande-de-devis">Demande de devis</NavLink>
            <NavLink className="link" to="/contact">Contact</NavLink>
            <NavLink className="link" to="/panier"> <i class="icofont-shopping-cart"></i></NavLink>
            {user && user.role === "admin" && (
             <NavLink className="link" to="/admin/boxs/dashboard">Espace Admin</NavLink>
            )}
            {user && user.token ? (
              <NavLink className="link" onClick={handleLogout}>Se déconnecter</NavLink>
            ) : (
              <NavLink className="link" to="/se-connecter">Se connecter</NavLink>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};



export default Header;