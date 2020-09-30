import React, { useState, useEffect  } from "react";
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import logoImg from '../../assets/logo.png';
import { Container } from './styles';
import api from '../../services/api';
import { useCookies } from 'react-cookie';
import { Event } from "../../services/interfaces";
import { useHistory, useLocation } from 'react-router-dom';

const Profile: React.FC = () => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [data, setData] = useState<Event[]>([]);

    const load = async () => {
        await api
          .get('events', {params: cookies.user})
          .then(({ data }) => {
            console.log(cookies.user)
            setData(data.docs)
          })
    }
    useEffect(() => {
      load()}, [])

    const handleDelete = async (codigo: String) => {
        try {
            await api.delete(`events/${codigo}?user_id=${cookies.user._id}`)

            alert('Cadastro deletado com sucesso.')
            load()

        } catch (err) {
            alert('Erro ao deletar registro.')
        }
    }

    const handleLogout = async () => {
        removeCookie('user')
        history.push('/')
    }

    const handleFeedback = async (codigo: String, status: Number) => {
        try {
            let form = {
                user_id: cookies.user._id,
                event_id: codigo,
                status: status,
            }
            await api({
                method: 'post',
                url: `events/${codigo}/feedback`,
                data: form,
                })
            load()

        } catch (err) {
            alert('Erro ao alterar registro.')
        }
    }

    return(
        <Container>
            <header>
                <img src={logoImg} alt="E-Vent +" />

                <span>Bem vindo, Usuario</span>

                <a href="/new">Cadastra Evento +</a>

                <button className="headerBtn" onClick={() => { handleLogout() }}>
                <FiPower size={18} color="#E02041" />  
                </button>
            </header>

            <h1>Eventos Cadastrados</h1>
            <div>
            {
                data.length > 0
                ? data.map((o) => {
                    return (
                    <ul key={o._id}>
                        <li>
                            <img src={'http://localhost:3333/files/' + o.photo} width="200" height="200" alt="imagem do evento"/>
                            <br></br>
                            <strong>Evento:</strong>
                            <p>{o.event_name}</p>

                            <strong>Local:</strong>
                            <br/>

                            <table>
                                <td>
                                    <strong>Bairro: </strong>
                                </td>
                                <td>
                                    <p>{o.district}</p>
                                </td>
                                <td>
                                    <strong>Rua: </strong>
                                </td>
                                <td>
                                    <p>{o.street}</p>
                                </td>
                                <td>
                                    <strong>Numero: </strong>
                                </td>
                                <td>
                                    <p>{o.number}</p>
                                </td>
                            </table>
                            <br/>

                            <table>
                                <td>
                                    <strong>UF: </strong>
                                </td>
                                <td>
                                   <p>{o.uf}</p>
                                </td>
                                <td>
                                    <strong>Cidade: </strong>
                                </td>
                                <td>
                                    <p>{o.city}</p>
                                </td>
                            </table>
                            <br/>

                            <br/>

                            <strong>Sobre:</strong>
                            <p>{o.commentary}</p>
                            <br></br>

                            <div>
                                <button className="feedback" type="button" onClick={() => { handleFeedback(o._id, 2) }}>
                                {o.likes} <AiTwotoneLike size={20} color="white"/>
                                    Gostei
                                </button>

                                <button className="feedback" type="button" onClick={() => { handleFeedback(o._id, 1) }}>
                                {o.dislikes} <AiTwotoneDislike size={20} color="white"/>
                                    Não Gostei
                                </button>
                            </div>
                            {o.user_id === cookies.user._id ? <button className="trash" type="button" onClick={() => { handleDelete(o._id) }}><FiTrash2 size={20} color="a8a8b3"/></button> : <div/>}
                        </li>
                    </ul>
                    )
                })
                : <ul>
                    <li>
                        <span>Nenhum registro encontrado</span>
                    </li>
                </ul>
            }
        </div>
        </Container>
            
    );
}

export default Profile;