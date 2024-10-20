import React, { useState, useEffect } from "react";
// import { getLastTenConsumptionsAdded} from "../services/consumptionService.js";
import "../styles/Table.css"; 

function TableConsumptions({lastConsumptions}) {

    return(
        <div className="component last-consumptions-table">
            <h2>Derniers moteurs ajoutés</h2>
            <table>
                <thead>
                <tr>
                    <th>ID du moteur</th>

                </tr>
                </thead>
                <tbody>
                {lastConsumptions.map(consumption => (
                    <tr key={consumption.consumptionId}>
                    <td>{consumption.consumptionState || 'Inconnu'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
export default TableConsumptions;
