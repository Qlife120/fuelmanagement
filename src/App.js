import React, { useState } from 'react';
import AddConsumption from './components/AddConsumption';
import Overview from './components/Overview';
import AddEngine from './components/AddEngine';
import "./styles/App.css"
const App = () => {
  const [view, setView] = useState('addConsumption');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <img
          src="logo.png" // Assuming you have a logo image in a public folder
          alt="Logo de la société"
          className="logo"
        />
        <h2>Système de Gestion de Flotte</h2>
      </header>

      {/* Toggle Navigation Bar */}
      <div className="toggle-container">
        <button
          className={`toggle-button ${view === 'addConsumption' ? 'active' : ''}`}
          onClick={() => setView('addConsumption')}
        >
          <i className="fas fa-gas-pump"></i> Ajout de Consommation
        </button>
        <button
          className={`toggle-button ${view === 'overview' ? 'active' : ''}`}
          onClick={() => setView('overview')}
        >
          <i className="fas fa-list"></i> Aperçu
        </button>
        <button
          className={`toggle-button ${view === 'addEngine' ? 'active' : ''}`}
          onClick={() => setView('addEngine')}
        >
          <i className="fas fa-car"></i> Ajout de Moteur
        </button>
      </div>

      {/* Unified Content Area */}
      <main className="content-container">
        {view === 'addConsumption' && <AddConsumption />}
        {view === 'overview' && <Overview />}
        {view === 'addEngine' && <AddEngine />}
      </main>

      {/* Optional Footer */}
      {/* <footer className="app-footer">
        <p>&copy; 2024 Gestion de Flotte. Tous droits réservés.</p>
      </footer> */}
    </div>
  );
};

export default App;
