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
import IndustryDetail from "./pages/IndustryDetail";
import Products from "./pages/Services";
import ProductDetail from "./pages/ProductDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
// import Solutions from "./pages/Solutions";
// For the erp system
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SubmitExpense from "./pages/SubmitExpense";
import MyExpenses from "./pages/MyExpenses";
import ManagerQueue from "./pages/ManagerQueue";
import RequireAuth from "./ter/RequireAuth";



import { useNotifications } from "./components/ui/NotificationsProvider";
import { getPublicAnnouncements } from "./services/api";
import { NotificationsProvider } from "./components/ui/NotificationsProvider";
import NotificationPanel from "./components/ui/NotificationPanel";


// 404 → redirect
const NotFound = () => <Navigate to="/industries" replace />;

export default function App() {
  return (
    <NotificationsProvider>
      <div className="App min-h-screen bg-white">

        <Navbar />
        <AnnouncementsFeed />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/solutions" element={<Solutions />} /> */}
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/associates" element={<Associates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* TER (Employee Portal) */}
          <Route path="/ter" element={<Navigate to="/ter/login" replace />} />
          <Route path="/ter/login" element={<Login />} />
          <Route
            path="/ter/submit"
            element={
              <RequireAuth>
                <SubmitExpense />
              </RequireAuth>
            }
          />
          <Route
            path="/ter/mine"
            element={
              <RequireAuth>
                <MyExpenses />
              </RequireAuth>
            }
          />
          <Route
            path="/ter/queue"
            element={
              <RequireAuth role="manager">
                <ManagerQueue />
              </RequireAuth>
            }
          />
          {/* Compatibility alias for older links */}
          <Route path="/ter/my" element={<Navigate to="/ter/mine" replace />} />

          {/* 404 */}
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

function AnnouncementsFeed() {
  const { add } = useNotifications();
  React.useEffect(() => {
    (async () => {
      try {
        const list = await getPublicAnnouncements(3);
        if (!Array.isArray(list)) return;
        list.forEach((a) => {
          add({
            title: a.title || "Announcement",
            description: a.message,
            type: a.variant === "warn" ? "warning" : "info",
            href: a.cta_href || null,
          });
        });
      } catch { }
    })();
  }, [add]);
  return null;
}
