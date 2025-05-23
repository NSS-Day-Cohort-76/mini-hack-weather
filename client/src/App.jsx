import React from "react";
import { WeatherCard } from "../components/Weather/WeatherCard";
import { Route, Routes } from 'react-router-dom'
import "./App.css"
import { WeatherDashboard } from "../components/Weather/WeatherDashboard";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WeatherCard />} />
      <Route path="favorites" element={<WeatherDashboard />} />
    </Routes>  
  )
}