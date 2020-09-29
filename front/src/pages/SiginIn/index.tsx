import React from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';
import { useCookies } from 'react-cookie';

const SiginIn: React.FC = () => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    async function handleSubmit(data: object) {
        console.log(data)
        try {
            const response = await api({
                method: 'post',
                url: `users/login`,
                data: data,
                })

            setCookie('user', response.data)
            alert('Acesso autorizado.')
            history.push('/profile')

        } catch (err) {
            alert('Acesso negado.')
        }
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
                    <a href="forgoten">Esqueci minha senha</a>
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