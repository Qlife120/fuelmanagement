import React  from 'react';

import '../styles/Card.css'; // Import the updated CSS styles

function Card({title, value}) {

return(
    <div className="card">
            <h3>{title}</h3>
            <p className="card-value">{value}</p>
          </div>
)}

export default Card;