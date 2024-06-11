import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/style.css'
import '../assets/icofont2/icofont.css';



const Footer = () => {
   
   return (
      <>
      
       <article className="retour">
       <button className="scrolltop"> <a className="top" href="#logo"> <i class="icofont-arrow-up"></i></a></button>
       </article>
       <footer>
    
       <section className="footer">
        <article className="contact">
          <h3>Contact</h3>
          <address>
            <p>5 Boulevard du Bois le Prêtre </p>
            <p> Paris, 75017</p>
            <p>+00 00 00 00 00</p>
            </address>
        </article>
        
        <article className="paiements">
          <h3>Moyens de paiements</h3>
            	<p className="payment_mastercard"></p>
					    <p className="payment_cb"></p>
				    	<p className="payment_visa"></p>
				     	<p className="payment_virement"></p>
        </article>
        
        <article className="socials">
          <h3>Réseaux sociaux</h3>
            <div class="icon">
            <NavLink className="socials" to="#"><i class="icofont-instagram"></i></NavLink>
            <NavLink className="socials" to="#"><i class="icofont-snapchat"></i></NavLink>
            <NavLink className="socials" to="#"><i class="icofont-tiktok"></i></NavLink>
            </div>
        </article>
        
        <article className="mentions">
          <h3>Mentions Légales</h3>
            <div class="mentions-legales">
            <p>Mentions Légales</p>
            <p>Politique de confidentialité</p>
            <p>Politique des cookies</p>
            <p>Conditions d'utilisation</p>
            </div>
        </article>
        
      </section>
    </footer>
      
      
      
      </>
      )
}

export default Footer;