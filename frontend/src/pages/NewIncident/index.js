import React, {useState} from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import { FiArrowLeft } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import api from "../../services/api";

import Cleave from 'cleave.js/react';

export default function NewIncident() {

  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e){
    e.preventDefault();
    const data = {title, description, value};

        try {
        await api.post('incidents', data, {
           headers: {
             Authorization: ongId,
           }
        });

        alert(`Caso cadastrado com sucesso!`);
        history('/profile');

        } catch (err) { 
            alert("Erro no cadastro. Por favor, tente novamente")
        }
  }

  return (

    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar para home
                </Link>

            </section>
            <form onSubmit={handleNewIncident}>

                <input 
                  placeholder="Título do caso"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
                <textarea 
                  placeholder="Descrição"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                />
                {/* <input 
                  placeholder="Valor em Reais"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                /> */}

                <Cleave
                placeholder="Valor em Reais"
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand',
                  numeralDecimalMark: ',',
                  delimiter: '.'
                }}
                value={value}
                onChange={e => setValue(e.target.value)}
                // className="form-field"
                required
                />


                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>

  )
}