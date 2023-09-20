import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import 'cleave.js/dist/addons/cleave-phone.br';
import Cleave from 'cleave.js/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Register() {
    const MySwal = withReactContent(
        Swal.mixin({
            confirmButtonColor: '#e02041',
        })
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const data = { name, email, whatsapp, city, uf };

        try {
            const response = await api.post('ongs', data);

            MySwal.fire(
                `Cadastro realizado com sucesso!`,
                `Seu ID de acesso é: ${response.data.id}`,
                'success'
            ).then(() => {
                history('/logon');
            });
        } catch (err) {
            MySwal.fire(
                'Erro no cadastro',
                'Por favor, tente novamente',
                'error'
            );
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a
                        encontrarem casos da sua ONG.
                    </p>
                    <Link className="back-link" to="/logon">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Cleave
                        placeholder="Whatsapp"
                        options={{
                            phone: true,
                            phoneRegionCode: 'BR',
                        }}
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        // className="form-field"
                        required
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <input
                            placeholder="UF"
                            pattern="[A-Za-z]{2}"
                            maxLength="2"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            required
                        />
                    </div>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
