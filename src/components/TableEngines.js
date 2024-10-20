import React from "react";
import "../styles/Table.css";

function TableEngines({lastEngines}) {

    return(
        <div className="component last-engines-table">
            <h2>Derniers moteurs ajoutés</h2>
            <table>
                <thead>
                <tr>
                    <th>ID du moteur</th>
                    <th>Matricule</th>
                    <th>Nom du moteur</th>
                    <th>Description</th>
                    <th>État du moteur</th>
                </tr>
                </thead>
                <tbody>
                {lastEngines.map(engine => (
                    <tr key={engine.engineId}>
                    <td>{engine.engineId}</td>
                    <td>{engine.matricule}</td>
                    <td>{engine.engineName}</td>
                    <td>{engine.description || 'Aucune description'}</td>
                    <td>{engine.engineState || 'Inconnu'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

    )}
export default TableEngines;
