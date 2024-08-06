import React from 'react';
import './index.css';
import { useEffect, useState } from 'react';

function App() {
 const [dati, setDati] = useState([]);


 useEffect(()=> {
  fetch("/menu")
  .then(res => res.json())
  .then(data => setDati(data))
  .catch(err => console.error("errore:", err))
 }, []);



 return(
  <div>
    <h1>Menu</h1>
    <ul>
      {dati.map((dato, i) => (
        <li key={i}> {dato.nome} prezzo: {dato.prezzo}    <p>fatto con: {dato.ingredienti}</p> </li>
      ))}
    </ul>
  </div>
 )
}

export default App