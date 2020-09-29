import React, { useState, useEffect  } from "react";
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import logoImg from '../../assets/logo.png';
import { Container } from './styles';
import api from '../../services/api';
import { useCookies } from 'react-cookie';
import { Event } from "../../services/interfaces";

const Profile: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [data, setData] = useState<Event[]>([]);

    const load = async () => {
        await api
          .get('events', {params: cookies.user})
          .then(({ data }) => {
            console.log(data)
            setData(data.docs)
          })
    }
    useEffect(() => {
      load()}, [])
    return(
        <Container>
            <header>
                <img src={logoImg} alt="E-Vent +" />

                <span>Bem vindo, Usuario</span>

                <a href="/new">Cadastra Evento +</a>

                <button>
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
                            <p>{o.place}</p>

                            <strong>Sobre:</strong>
                            <p>{o.commentary}</p>
                            <br></br>

                            <div>
                                <a href="">
                                    <AiTwotoneLike size={20} color="white" />
                                    Gostei
                                </a>

                                <a href="">
                                    <AiTwotoneDislike size={20} color="white" />
                                    Não Gostei
                                </a>
                            </div>
                            {o.user_id === cookies.user._id ? <button type="button"><FiTrash2 size={20} color="a8a8b3"/></button> : <div/>}
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