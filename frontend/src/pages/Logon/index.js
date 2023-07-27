import React, {useState} from 'react';

import { FiLogIn } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from "../../services/api";

export default function Logon() {

  const [id, setId] = useState("9acfed49");

  const history = useNavigate();

  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', {id});
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history('profile')


    } catch (err) {
      alert('ID não encontrada ou falha no Login. Por favor, tente novamente.')
    }

  }

  return (

     <div className="logon-container">
       <section className="form">

          <img src={logoImg} alt="Be The Hero" ></img>

          <form onSubmit={handleLogin}>
            
            <h1>Faça seu Logon</h1>
            
            <input 
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />

            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/Register">
              <FiLogIn size={16} color="#e02041" />
              Não tenho cadastro
            </Link>

          </form>


       </section>

       <img src={heroesImg} alt="Heroes" ></img>

     </div>
     

  );
}

