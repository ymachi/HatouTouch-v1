import React from 'react';
import { NavLink } from 'react-router-dom';

import Comment from "../components/Comment"
import '../css/home.css';

const Home = () => {
  return (
    <>
    <main>
      <div className="container">
        <article className="intro-boxs">
          <h1 className="title-boxs">Hatou'Touch</h1>
          <img src="" alt="" className="img-responsive" />
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
          </p>
        </article>
        <h2 className="title-boxs2">Nos Boxs</h2>
        <section className="cards-boxs">
          <article className="card-box">
            <h3>Boxs classiques</h3>
            <img src="../public/img/default-product.png" alt="provisoire" className="img-responsive" />
            <ul>
              <li>Lorem</li>
              <li>Lorem</li>
              <li>Lorem</li>
            </ul>
            <div className="button-boxs">
              <NavLink className="carte" to="/box-classique">Commander</NavLink>
            </div>
          </article>
          <article className="card-box">
            <h3 className="etoile">Boxs mixtes</h3>
            <img src="../public/img/default-product.png" alt="provisoire" className="img-responsive" />
            <ul>
              <li>Lorem</li>
              <li>Lorem</li>
              <li>Lorem</li>
            </ul>
            <div className="button-boxs">
              <NavLink className="carte" to="/box-mixte">Commander</NavLink>
            </div>
          </article>
          <article className="card-box">
            <h3 className="etoile">Minis boxs</h3>
            <img src="../public/img/default-product.png" alt="provisoire" className="img-responsive" />
            <ul>
              <li>Lorem</li>
              <li>Lorem</li>
              <li>Lorem</li>
            </ul>
            <div className="button-boxs">
              <NavLink className="carte"to="box-mini">Commander</NavLink>
            </div>
          </article>
        </section>
      </div>
       <Comment />
    </main>
    </>
  );
};

export default Home;
