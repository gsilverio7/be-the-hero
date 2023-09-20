import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2, FiPlus, FiPenTool } from 'react-icons/fi';
import api from '../../services/api';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Hashids from 'hashids';

export default function Profile() {
    const hashids = new Hashids('holding out for a hero', 6);
    const MySwal = withReactContent(
        Swal.mixin({
            confirmButtonColor: '#e02041',
        })
    );
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useNavigate();

    useEffect(() => {
        api.get('profile', {
            headers: { Authorization: ongId },
        }).then((response) => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id) {
        MySwal.fire({
            icon: 'warning',
            title: 'Deseja mesmo apagar esse caso?',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteIncident(id);
            }
        });
    }

    async function deleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                },
            });
            setIncidents(incidents.filter((incident) => incident.id !== id));
            MySwal.fire('Caso apagado com sucesso!', '', 'success');
        } catch (err) {
            MySwal.fire(
                'Erro ao apagar caso',
                'Por favor, tente novamente.',
                'error'
            );
        }
    }

    async function handleUpdateIncident(id) {
        history('/incidents/' + hashids.encode(id));
    }

    function handleLogout() {
        localStorage.clear();
        history('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img className="headerLogo" src={logoImg} alt="Be The Hero" />
                <Link to="/incidents/new" className="addButton">
                    <FiPlus size={20} color="#fff" />
                    &nbsp;
                    <span className="addButtonText">Cadastrar novo caso</span>
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={20} color="#e02041" />
                </button>
            </header>

            <span className="welcome">Bem vinda, {ongName}!</span>
            <h1>Casos cadastrados</h1>

            <div className="incidentList">
                {incidents.map((incident) => (
                    <div className="incident card" key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </p>

                        <button
                            onClick={() => handleDeleteIncident(incident.id)}
                            type="button"
                        >
                            {' '}
                            {/* necessário arrow function ou deletará todos os incidentes */}
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button
                            onClick={() => handleUpdateIncident(incident.id)}
                            type="button"
                        >
                            {' '}
                            {/* necessário arrow function ou deletará todos os incidentes */}
                            <FiPenTool size={20} color="#a8a8b3" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
