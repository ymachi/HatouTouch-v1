import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { token } from "../../context/token"
import './cssadmin/dashboard.css';

const CommentDashboard = () => {
   const [comments, setComments] = useState([]);
   const [isDeleted, setIsDeleted] = useState(false);

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const res = await axios.get("/api/avis");
            setComments(res.data);
            console.log(res.data);
         } catch (e) {
            console.error(e);
            toast.error("Erreur lors de la récupération des commentaires.");
         }
      };

      fetchComments();
   }, [isDeleted]);

   const handleDelete = async (id) => {
      const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");

      if (confirmDelete) {
         try {
            const res = await axios.delete(`/api/avis/delete/${id}`, {headers: token()});
            setIsDeleted(!isDeleted);
            toast.success(res.data.message);
         } catch (e) {
            console.error(e);
            toast.error("Erreur lors de la suppression du commentaire.");
         }
      }
   };

   return (
      <>
         <main className="content">
            <div className="gestion-avis">
               <article className="intro">
                  <h1>Gestion des avis</h1>
                  <p>
                     Nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.
                  </p>
               </article>
               <article className="avis">
                  <table>
                     <thead>
                        <tr>
                           <th>Nom</th>
                           <th>Commentaires</th>
                           <th>Évaluations</th>
                           <th>Supprimer</th>
                        </tr>
                     </thead>
                     <tbody>
                        {comments.map(comment => (
                           <tr key={comment._id}>
                              <td>{comment.userId}</td>
                              <td>{comment.content}</td>
                              <td>{comment.rating}</td>
                              <td>
                                 <button className="button-action" onClick={() => handleDelete(comment._id)}>Supprimer</button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </article>
            </div>
         </main>
      </>
   );
}

export default CommentDashboard;
