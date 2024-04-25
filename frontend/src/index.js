import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import Navbar from "./pages/Navbar";
import Login from "./pages/user/Login";
import Home from "./pages/Home";
import Orders from "./pages/order/Orders";
import Order from "./pages/order/Order";
import AddOrder from "./pages/order/AddOrder";
import UpdateOrder from "./pages/order/UpdateOrder";
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
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/add" element={<AddOrder />} />
          <Route path="/order/:orderId" element={<Order />} />
          <Route path="/order/update/:orderId" element={<UpdateOrder />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);