import React, {useState, useEffect} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from "../../services/api";
import Cleave from 'cleave.js/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import formatMoney from '../../utils/formatMoney';

export default function NewIncident() {

  const MySwal = withReactContent(Swal.mixin({
    confirmButtonColor: '#e02041'
  }));
  const history = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');

  let { id } = useParams();

  async function loadIncident() { 
    if (id) {
      const response = await api.get('/incidents/' + id);  
      setTitle(response.data.title);
      setDescription(response.data.description);
      setValue(formatMoney(response.data.value, 'BRL', false));
    }
  }

  useEffect(() => {
      loadIncident();
  }, []);

  async function handleNewIncident(e){
    e.preventDefault();
    const data = {title, description, value};

        try {
        await api.post('incidents', data, {
           headers: {
             Authorization: ongId,
           }
        });

        MySwal.fire('Caso cadastrado com sucesso!', '', 'success')
          .then(() => {
            history('/profile');
          })

        } catch (err) { 
            MySwal.fire('Erro no cadastro', 'Por favor, tente novamente', 'error')
        }
  }

  async function handleEditIncident(e){
    e.preventDefault();
    const data = {title, description, value};

    try {
        await api.put('incidents/' + id, data, {
           headers: {
             Authorization: ongId,
           }
        });

        MySwal.fire('Caso editado com sucesso!', '', 'success')
          .then(() => {
            history('/profile');
          })

    } catch (err) { 
        MySwal.fire('Erro ao editar', 'Por favor, tente novamente', 'error')
    }
  }

  return (

    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>{ id ? 'Alterar caso' : 'Cadastrar novo caso'}</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#e02041" />
                Voltar
                </Link>

            </section>

            <form onSubmit={id ? handleEditIncident : handleNewIncident}>               

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


                <button className="button" type="submit">{ id ? 'Alterar' : 'Cadastrar'}</button>
            </form>
        </div>
    </div>

  )
}