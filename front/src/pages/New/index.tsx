import React from "react";
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import { Container } from './styles';

const New: React.FC = () => {
  
    return(
        <Container>
            <header>
                <img src={logoImg} alt="E-Vent +" />

                <span>Cadastro de Eventos</span>

                <a href="/profile">
                <FiArrowLeft />
                    Voltar
                </a>

                <button>
                <FiPower size={18} color="#E02041" />  
                </button>
            </header>
        </Container>
            
    );
}

export default New;