import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { AuthProvider} from "./components/AuthProvider"; 
import "./global.css";
import { ChartProvider } from "./components/ChartProvider";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div style={{ backgroundColor: "#1e1e1e",alignItems:"center" }}>
      <AuthProvider>
        <ChartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard /> 
                }
              />
            </Routes>
          </Router>
        </ChartProvider>
      </AuthProvider>
    </div>
  );
};


export default App;
