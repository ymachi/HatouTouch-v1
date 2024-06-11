import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { token } from "../../context/token";
import './cssadmin/dashboard.css';

const EstimateDashboard = () => {
  const [estimate, setEstimate] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const res = await axios.get("/api/estimates");
        setEstimate(res.data);
      } catch (e) {
        toast.error("Erreur lors de la récupération des devis.");
      }
    };
    fetchEstimates();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce devis?");
    if (confirmDelete) {
      try {
        const res = await axios.delete(`/api/estimates/delete/${id}`, { headers: token() });
        setIsDeleted(!isDeleted);
        toast.success(res.data.message);
      } catch (e) {
        console.error(e);
        toast.error("Erreur lors de la suppression du devis.");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.put(`/api/estimates/change-status/${id}`, { status }, { headers: token() });
      setEstimate((prevEstimates) =>
        prevEstimates.map((est) =>
          est._id === id ? { ...est, status } : est
        )
      );
      toast.success(res.data.message);
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du changement de statut.");
    }
  };

  return (
    <main className="content">
      <div className="gestion-orders">
        <article className="intro">
          <h1>Gestion des devis</h1>
          <p>
            Nihil imperdiet doming id quod mazim placerat facer possim
            assum. Typi non habent claritatem insitam; est usus legentis
            in iis qui facit eorum claritatem.
          </p>
        </article>
        <article className="orders">
          <table>
            <thead>
              <tr>
                <th>Noms user</th>
                <th>Adresse</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {estimate.map((est) => (
                <tr key={est._id}>
                  <td>{est.lastname}</td>
                  <td>{est.address}</td>
                  <td>
                    <select
                      value={est.status}
                      onChange={(e) => handleStatusChange(est._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="refused">Refused</option>
                    </select>
                  </td>
                  <td>
                    <button className="button-action" onClick={() => handleDelete(est._id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </div>
    </main>
  );
};

export default EstimateDashboard;
