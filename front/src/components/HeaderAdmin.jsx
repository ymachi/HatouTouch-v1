import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../pages/admin/cssadmin/dashboard.css";

const HeaderAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header>
        <div className="sidebar">
          <img className="logo" src="/logo.jpg" alt="logo" />
          <nav className="viewer-admin">
            <NavLink activeClassName="active" className="link-admin" to="admin/boxs/dashboard">Gestion des box</NavLink>
            <NavLink className="link-admin" to="admin/boxs/ajouter-box/">Ajouter une box</NavLink>
            <NavLink className="link-admin" to="admin/clients/dashboard">Gestion des clients</NavLink>
            <NavLink className="link-admin" to="admin/commandes/dashboard">Gestion des commandes</NavLink>
            <NavLink className="link-admin" to="admin/devis/dashboard">Gestion des devis</NavLink>
            <NavLink className="link-admin" to="admin/gallery/dashboard">Gestion des photos</NavLink>
            <NavLink className="link-admin" to="admin/gallery/ajouter-photo">Ajouter une photo</NavLink>
            <NavLink className="link-admin" to="admin/avis/dashboard">Gestion des avis</NavLink>

            {user && user.token ? (
              <NavLink className="link-admin" to="/"><i class="icofont-duotone icofont-reply"></i></NavLink> 
            ) : (
              <NavLink className="link-admin" to="/">Se déconnecter</NavLink>
            )}

          </nav>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
