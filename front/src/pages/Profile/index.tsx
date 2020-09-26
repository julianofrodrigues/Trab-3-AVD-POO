import React from "react";
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import logoImg from '../../assets/logo.png';
import { Container } from './styles';



const Profile: React.FC = () => {
  
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
            <ul>
                    <li>
                    <img src={logoImg} alt="imagem do evento" />
                    <br></br>
                    <strong>Evento:</strong>
                    <p>Nome do Evento</p>

                    <strong>Local:</strong>
                    <p>Estado:</p>
                    <p>Cidade:</p>
                    <p>Bairro:</p>
                    <p>Rua:</p>
                    <p>Numero:</p>

                    <strong>Sobre:</strong>
                    <p>Descrição do Evento</p>
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
                    <button type="button"><FiTrash2 size={20} color="a8a8b3"/></button>
                </li>
            </ul>

            <ul>
                    <li>
                    <img src={logoImg} alt="imagem do evento" />
                    <br></br>
                    <strong>Evento:</strong>
                    <p>Nome do Evento</p>

                    <strong>Local:</strong>
                    <p>Estado:</p>
                    <p>Cidade:</p>
                    <p>Bairro:</p>
                    <p>Rua:</p>
                    <p>Numero:</p>

                    <strong>Sobre:</strong>
                    <p>Descrição do Evento</p>
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
                    <button type="button"><FiTrash2 size={20} color="a8a8b3"/></button>
                </li>
            </ul>

            <ul>
                    <li>
                    <img src={logoImg} alt="imagem do evento" />
                    <br></br>
                    <strong>Evento:</strong>
                    <p>Nome do Evento</p>

                    <strong>Local:</strong>
                    <p>Estado:</p>
                    <p>Cidade:</p>
                    <p>Bairro:</p>
                    <p>Rua:</p>
                    <p>Numero:</p>

                    <strong>Sobre:</strong>
                    <p>Descrição do Evento</p>
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
                    <button type="button"><FiTrash2 size={20} color="a8a8b3"/></button>
                </li>
            </ul>
        </div>
        </Container>
            
    );
}

export default Profile;