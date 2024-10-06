import React, { useState } from "react";
import AddEngine from "./AddEngine";
import AddConsumption from "./AddConsumption";
import GetEngineConsumptions from "./GetEngineConsumptions";
import CalculateTotalConsumption from "./CalculateTotalConsumption";
import "./App.css";

function App() {
  const [view, setView] = useState("addEngine");

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Company Logo */}
        <img
          src="/images/logo.png"  // Assuming you have a logo image in a public folder
          alt="Logo de la société"
          className="logo"
        />
        <h1>Système de Gestion de Flotte</h1>
      </header>

      {/* Navigation Bar */}
      <nav className="navbar">
        <button onClick={() => setView("addEngine")}>
          <i className="fas fa-car"></i> Ajouter un Moteur
        </button>
        <button onClick={() => setView("addConsumption")}>
          <i className="fas fa-gas-pump"></i> Ajouter Consommation
        </button>
        <button onClick={() => setView("viewConsumptions")}>
          <i className="fas fa-list"></i> Voir Consommations
        </button>
        <button onClick={() => setView("totalConsumption")}>
          <i className="fas fa-chart-line"></i> Consommation Totale
        </button>
      </nav>

      {/* Dynamic Content */}
      <main className="content">
        {view === "addEngine" && <AddEngine />}
        {view === "addConsumption" && <AddConsumption />}
        {view === "viewConsumptions" && <GetEngineConsumptions />}
        {view === "totalConsumption" && <CalculateTotalConsumption />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <img src="/images/logo-footer.png" alt="Logo du pied de page" className="footer-logo" />
        <p>© 2024 Gestion de Flotte. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
