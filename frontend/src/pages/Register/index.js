import React, {useState} from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import { FiArrowLeft } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import api from "../../services/api";

import "cleave.js/dist/addons/cleave-phone.br";
import Cleave from 'cleave.js/react';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useNavigate();

    async function handleRegister(e){
        e.preventDefault();

        const data = {name, email, whatsapp, city, uf};

        try {
        const response =  await api.post('ongs', data);

        alert(`Cadastro realizado com sucesso! Seu ID de acesso é: ${response.data.id}`);
        history('/');

        } catch (err) { 
            alert("Erro no cadastro. Por favor, tente novamente")
        }
    };

  return (
    
    <div className="register-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastro</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos da sua ONG.</p>
                <Link className="back-link" to="/">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar para o começo
                </Link>

            </section>
            <form onSubmit={handleRegister}>

                <input 
                    placeholder="Nome da ONG"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    />
                <input type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    />

                {/* <input
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                /> */}

                <Cleave
                placeholder="Whatsapp"
                options={{
                    phone: true,
                    phoneRegionCode: 'BR'
                }}
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                // className="form-field"
                required
                />

                <div className="input-group">
                    <input 
                    placeholder="Cidade"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required/>
                    <input
                    placeholder="UF"
                    pattern="[A-Za-z]{2}"
                    maxLength='2'
                    style={ {width:80} }
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    required
                    /> 
                    
                    {/* <select 
                    name="estados-brasil"
                    value={uf}
                    onChange={e => setUf(e.target.value)}
                    >
                            <option value="" disabled selected>UF</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="DF">DF</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                    </select> */}

                </div>
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>

  )
}