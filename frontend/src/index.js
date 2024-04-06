import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Navbar from "./pages/Navbar";
import Login from "./pages/user/Login";
import Home from "./pages/Home";
import Commande from "./pages/commande/Commande";
import NoPage from "./pages/NoPage";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/commandes" element={<Commande />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);