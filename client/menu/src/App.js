import React from 'react';
import './index.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  <div className="menu-container">
  <div className="decoration-top"></div>
  <div className="container d-flex flex-column align-items-center py-5">
    <h1 className="text-center menu-title display-4 mb-5">Il nostro Menu</h1>
    
    <input 
      className="form-control my-4 text-center"
      type="text"
      placeholder="Cerca una pizza"
      value={searchbar}
      onChange={(e) => setSearchBar(e.target.value)}
      style={{ maxWidth: '600px' }}
    />
    
    <ul className="list-unstyled w-100">
      {pizzeFilter.map((pizza, i) => (
        <li className="text-center mb-4 border-bottom pb-4" key={i}>
          <h4 className="font-weight-bold">{pizza.nome}</h4> 
          <p className="text-muted">Prezzo: {pizza.prezzo} €</p>   
          <p className="font-italic">Fatto con: {pizza.ingredienti}</p> 
        </li>
      ))}
    </ul>
  </div>
  <div className="decoration-bottom"></div>
</div>


 )
}

export default App