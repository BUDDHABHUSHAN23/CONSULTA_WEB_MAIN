// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import Industries from "./pages/Industries";
// import Associates from "./pages/Associates";
// import ChatBot from "./components/ChatBot";
// import { Toaster } from "./components/ui/toaster";


// // for the devlopment purpose 
// const NotFound = () => <Navigate to="/industries" replace />;

// function App() {
//   return (
//     <div className="App min-h-screen bg-white">
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/industries" element={<Industries />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/associates" element={<Associates />} />
//         </Routes>
//         <ChatBot />
//         <Toaster />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


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

// 404 → redirect
const NotFound = () => <Navigate to="/industries" replace />;

export default function App() {
  return (
    <div className="App min-h-screen bg-white">
      <Navbar />
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
      {/* ✅ Mount globally, NOT as a child of <Routes> */}
      <ChatBot />
      <Toaster />
    </div>
  );
}




//  imporved version 

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // <-- ensure these
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import Industries from "./pages/Industries";
// import Associates from "./pages/Associates";
// import ChatBot from "./components/ChatBot";
// import Toaster from "./components/ui/toaster"; // your Sonner wrapper default export
// import About from "./pages/About";
// import Careers from "./pages/Careers";
// import Blogs from "./pages/Blogs";

// const NotFound = () => <Navigate to="/industries" replace />;

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="App min-h-screen bg-white">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/industries" element={<Industries />} />
//           <Route path="/associates" element={<Associates />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/careers" element={<Careers />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>

//         <ChatBot />
//         {/* Mount globally, outside <Routes>. Give it a big z-index just in case */}
//         <Toaster style={{ zIndex: 2147483647 }} />
//       </div>
//     </BrowserRouter>
//   );
// }
