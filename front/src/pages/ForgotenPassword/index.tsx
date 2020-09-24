import React from "react";
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';

const SiginIn: React.FC = () => {
    function handleSubmit(data: object): void{ 
        console.log(data);
    }
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="E-Vent +" />
                <Form onSubmit={handleSubmit}>
                    <h1>Recupere sua senha</h1>
                    <Input name="email" icon={FiMail} placeholder="E-Mail" />
                    <Button type="submit">Recuperar</Button>
                </Form>
                <a href="/">
                <FiArrowLeft />
                    Voltar
                </a>
                
            </Content>
        <Background />
        </Container>
    );
}

export default SiginIn;