import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

import { Toaster } from "react-hot-toast";
import BaseTemplate from "./pages/BaseTemplate";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Reservations from "./pages/Reservations";
import Items from "./pages/Items";
import ViewOrderLog from "./pages/ViewOrderLog";
import CheckoutPage from "./pages/CheckoutPage";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Auth />} />
          <Route path="/add-order" element={<ViewOrderLog />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route element={<BaseTemplate />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="items" element={<Items />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="inventory" element={<Inventory />} />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
