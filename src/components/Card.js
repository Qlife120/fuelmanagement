import React  from 'react';

import '../styles/Card.css'; // Import the updated CSS styles

function Card({index, item}) {

return(
    <div key={index} className="card">
            <h3>{item.title}</h3>
            <p className="card-value">{item.value}</p>
          </div>
)}

export default Card;