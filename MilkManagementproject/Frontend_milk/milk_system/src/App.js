// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import MilkProviders from "./pages/MilkProviders";
import MilkRates from "./pages/MilkRates";
import MilkRecords from "./pages/MilkRecords";
import MonthlySales from "./pages/MonthlySales";
import Dashboard from "./pages/Dashboard";
import { Container } from "react-bootstrap";
import Footer from "./components/footer";
import Navbar from "./components/navbar";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/providers" element={<MilkProviders />} />
          <Route path="/rates" element={<MilkRates />} />
          <Route path="/records" element={<MilkRecords />} />
          <Route path="/sales" element={<MonthlySales />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
