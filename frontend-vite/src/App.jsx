import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Industries from "./pages/Industries";
import Associates from "./pages/Associates";
import ChatBot from "./components/ChatBot";
import { Toaster } from "./components/ui/toaster";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blogs from "./pages/Blogs";
import AnnouncementsStrip from "./components/AnnouncementsStrip";
import { NotificationsProvider } from "./components/ui/NotificationsProvider";
import NotificationPanel from "./components/ui/NotificationPanel";


// 404 → redirect
const NotFound = () => <Navigate to="/industries" replace />;

export default function App() {
  return (
    <NotificationsProvider>
      <div className="App min-h-screen bg-white">
        
        <Navbar />
        <AnnouncementsStrip />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/associates" element={<Associates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* ✅ Global mounts */}
        <NotificationPanel />
        <ChatBot />
        <Toaster />
      </div>
    </NotificationsProvider>
  );
}
