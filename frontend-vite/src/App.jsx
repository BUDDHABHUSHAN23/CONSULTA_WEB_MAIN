import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Industries from "./pages/Industries";
import ChatBot from "./components/ChatBot";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App min-h-screen bg-white">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatBot />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
