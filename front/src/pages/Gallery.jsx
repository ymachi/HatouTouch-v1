import { useState, useEffect } from 'react';
import axios from 'axios';
import Video from "../components/Video"
import '../css/style.css';
import '../css/gallery.css';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await axios.get('/api/gallery');
        setGalleries(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchGalleries();
  }, []);

  return (
    <>
      <main>
        <div className="gallery-container">
          <article className="intro-gallery">
            <h1 className="title-gallery">Nos réalisations</h1>
            <p>
              Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
            </p>
            <Video/>
          </article>
          <section className="gallery">
            {galleries.map((gallery, index) => (
              <figure className="abs" key={index}>
                <img src={`http://aminatadiawara.ide.3wa.io:9000/img/${gallery.image.src}`} className="img-responsive" />
                <figcaption></figcaption>
              </figure>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Gallery;
