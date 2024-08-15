import React from 'react';
import './index.css';
import { useEffect, useState } from 'react';

function App() {
 const [pizze, setPizze] = useState([]);
 const [searchbar, setSearchBar] = useState("");


 useEffect(()=> {
  fetch("/menu")
  .then(res => res.json())
  .then(pizza => setPizze(pizza))
  .catch(err => console.error("errore:", err))
 }, []);

 const pizzeFilter = pizze.filter(pizza => 
  pizza.nome.toLowerCase().includes(searchbar.toLocaleLowerCase())
 );

 return(
  <div>
    <h1>Il nostro Menu</h1>
    <input 
      type='text'
      placeholder='Cerca una pizza'
      value={searchbar}
      onChange={(e)=> setSearchBar(e.target.value)}
    />
    <ul>
      {pizzeFilter.map((pizza, i) => (
        <li key={i}> {pizza.nome} prezzo: {pizza.prezzo} €    <p>fatto con: {pizza.ingredienti}</p> </li>
      ))}
    </ul>
  </div>
 )
}

export default App