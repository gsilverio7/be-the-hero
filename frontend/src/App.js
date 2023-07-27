import React from 'react';

//import Logon from './pages/Logon';

import Routing from './routes';

import './global.css';

// JSX ( JavaScript XML(Sintaxe do HTML) ) - Código HTML dentro de uma página de javascript

// Componente no React é uma função que retorna HTML

function App() {

  //-------------

  // No react não se pode alterar variável diretamente. Deve ser feito como mostrado abaixo:
  //const [counter, setCounter] = useState(0); 

  //function increment(){

  //  setCounter(counter +1);
  //}

  // NOTA: Também importar isso: {useState}

  //-------------
  return (
    <Routing />
  );
}

export default App;
