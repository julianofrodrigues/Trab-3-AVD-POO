import React from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
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
                    <h1>Faça seu login</h1>
                    <Input name="email" icon={FiMail} placeholder="E-Mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="register">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    );
}

export default SiginIn;