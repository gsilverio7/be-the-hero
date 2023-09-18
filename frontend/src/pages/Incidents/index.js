import React ,{ useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import formatMoney from '../../utils/formatMoney';
import './styles.css';
import Hashids from 'hashids';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);  

    const history = useNavigate();
    const hashids = new Hashids('holding out for a hero', 6);

    async function loadIncidents() {

        if (loading) {//se loading for 'true', ou seja, estiver carregando, não fará nova requisição
          return;
        }
 
        setLoading(true);
  
        const response = await api.get('incidents', {
          params: {page}
        });
  
        setIncidents([...incidents, ...response.data]);
  
        setPage(page + 1)
        setLoading(false);
    }
  
    useEffect(() => {
        loadIncidents();
    }, []);
  

    return (
        <div className='incidents'>
        <div className='container'>
          <div className='header'>
            <img className='headerLogo' src={logoImg} alt='Be The Hero' ></img>
            <div className='logonBtn btn' onClick={() => { history('/logon') }}>
                {/* Total de <span className='headerTextBold'> casos</span>. */}
                <FiLogIn size={20} color='#fff' />                      
                &nbsp;
                ONG Logon
            </div>
          </div>

          <div className='title'>Bem-vindo!</div>
          <div className='description'>Escolha um dos casos abaixo e salve o dia.</div>  

          <div className='incidentList cards'>
            <div className={`loading ${loading ? 'show' : 'hide'}`}>
              <div className='loadingInner'>
              <div className='lds-ripple'><div></div><div></div></div>
                Carregando
              </div>
            </div>

            {
                incidents.map((incident) => {
                    return (
                        <div className='incident card' key={incident.id}>                
                            <div className='incidentProperty'>ONG:</div>
                            <div className='incidentValue'>{incident.name}</div>
            
                            <div className='incidentProperty'>CASO:</div>
                            <div className='incidentValue'>{incident.title}</div>
            
                            <div className='incidentProperty'>VALOR:</div>
                            <div className='incidentValue'>{formatMoney(incident.value, 'BRL')}</div>
            
                            <div className='detailsButton btn' onClick={() => { history('/case/' + hashids.encode(incident.id)) }}>
                                Ver mais detalhes  
                                <FiArrowRight size={16} color='#e02041' />                      
                            </div>
                        </div>
                    )
                })
            }
          </div>
        
        </div>
        </div>
    )
}