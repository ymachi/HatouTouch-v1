import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BoxClassique from "./pages/BoxClassique";
import BoxMixte from "./pages/BoxMixte";
import BoxMini from "./pages/BoxMini";
import Gallery from "./pages/Gallery";
import Estimate from "./pages/Estimate";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword"
import Register from "./pages/Register";
// -----------------
import AddBox from "./pages/admin/AddBox"; 
import EditBox from "./pages/admin/EditBox"
import BoxDashboard from "./pages/admin/BoxDashboard";
import OrderDashboard from "./pages/admin/OrderDashboard";
import UserDashboard from "./pages/admin/UserDashboard";
import EstimateDashboard from "./pages/admin/EstimateDashboard";
import AddGallery from "./pages/admin/AddGallery";
import GalleryDashboard from "./pages/admin/GalleryDashboard";
import CommentDashboard from "./pages/admin/CommentDashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Header from "./components/Header";
import HeaderAdmin from "./components/HeaderAdmin";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <HeaderAdmin /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/box-classique" element={<BoxClassique />} />
        <Route path="/box-mixte" element={<BoxMixte />} />
        <Route path="/box-mini" element={<BoxMini />} />
        <Route path="/réalisations" element={<Gallery />} />
        <Route path="/demande-de-devis" element={<Estimate />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/se-connecter" element={<Login />} />
        <Route path="/s'inscrire" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
       
        
        
        <Route path="" element={<PrivateRoute roles={["admin"]} />}>
          <Route path="admin/boxs/ajouter-box" element={<AddBox/>} />
          <Route path="/admin/boxs/edit/:id" element={<EditBox />} />
          <Route path="admin/gallery/ajouter-photo" element={<AddGallery/>} />
          <Route path="admin/boxs/dashboard" element={<BoxDashboard />} />
          <Route path="admin/commandes/dashboard" element={<OrderDashboard />} />
          <Route path="admin/clients/dashboard" element={<UserDashboard />} />
          <Route path="admin/devis/dashboard" element={<EstimateDashboard />} />
          <Route path="admin/avis/dashboard" element={<CommentDashboard />} />
          <Route path="admin/gallery/dashboard" element={<GalleryDashboard />} />
        </Route>
        
        <Route path="*" element={<h1>La page n'existe pas 🥲</h1>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
