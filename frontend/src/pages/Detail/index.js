import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import formatMoney from '../../utils/formatMoney';
//import logoImg from '../../assets/logo.svg';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FiLogIn, FiHome } from 'react-icons/fi';
import './styles.css';

export default function Detail() {
    const history = useNavigate();
    const whatsappApi = "https://api.whatsapp.com/send";
    const whatsappMessage = "Olá, gostaria de entrar em contato a respeito do caso: ";
    const [incident, setIncident] = useState({
        name: "...",
        city: "...",
        uf: "..",
        title: "...",
        description: "...",
        value: "..."
    });
    let { id } = useParams();

    async function loadIncident() { 
        const response = await api.get('/incidents/' + id);  
        //console.log(response);
        setIncident(response.data);
    }
  
    useEffect(() => {
        loadIncident();
    }, []);

    return (
        <div className="detail">
        <div className="container">
            <div className="header">
                <div className="goBack btn" onClick={() => history('/') }>
                    {/* <img className="headerLogo" src={logoImg} alt="Be The Hero"/> */}
                    <FiHome size={20} color='#fff' />     
                    &nbsp;
                    Página Inicial
                </div>

                <div className="logonBtn btn" onClick={() => { history('/logon') }}>
                    <FiLogIn size={20} color='#fff' />     
                    &nbsp;
                    ONG Logon
                </div>
            </div>

            <div >

                <div className="incident">       

                    {/* é possivel criar um array de estilos, até com o fim de sobrescrever alguma propriedade da folha de estilos */}
                    <div className="incidentProperty" style={{ marginTop: 0 }}>ONG:</div>
                    <div className="incidentValue">{incident.name} de {incident.city}/{incident.uf}</div>

                    <div className="incidentProperty">CASO:</div>
                    <div className="incidentValue">{incident.title}</div>

                    <div className="incidentProperty">DESCRIÇÃO:</div>
                    <div className="incidentValue">{incident.description}</div>

                    <div className="incidentProperty">VALOR:</div>
                    <div className="incidentValue">{formatMoney(incident.value, 'BRL')}
                    </div>         

                </div>

                <div className="contactBox">
                    <div className="innerContactBox">
                        <div className="heroTitle">Salve o dia!</div>
                        <div className="heroTitle">Seja o herói desse caso.</div>
                        <div className="heroDescription">Entre em contato:</div>
                        <div className="actions">
                            <a 
                                href={whatsappApi + '?phone=' + incident.whatsapp + '&text=' + whatsappMessage + incident.title} 
                                target="_blank"
                                className="action btn"
                            >
                                <FaWhatsapp size={20} color='#fff' />     
                                &nbsp; 
                                <div className="actionText">                                     
                                    WhatsApp 
                                </div>
                            </a>
                            <a href="mailto:bielsil27@gmail.com" className="action btn"> 
                                <FaEnvelope size={20} color='#fff' />  
                                &nbsp;                                        
                                <div className="actionText">
                                    E-mail
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>    
        </div>
    );
}