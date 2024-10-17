import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";
import AddPatientForm from "./components/addPatientForm";
import PatientDetail from "./pages/PatientDetail";
import PriorAuthorizationForm from "./components/PriorAuthenticationForm";
import PriorAuthorizationList from "./pages/PriorAuthorizationList";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-patient" element={<AddPatientForm />} />
            <Route path="/view-detail/:patientId" element={<PatientDetail />} />
            <Route path="/prior-authorization-list" element={<PriorAuthorizationList />} />
            <Route path="/prior-authorization/:patientId" element={<PriorAuthorizationForm />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
