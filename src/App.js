import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Home/Home";
import Search from "./Search/Search";
import MyBookings from "./MyBookings/MyBookings";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <div className="app-main-wrapper">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
