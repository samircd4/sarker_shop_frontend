import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categorie" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div className="h-screen">Not Found</div>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
