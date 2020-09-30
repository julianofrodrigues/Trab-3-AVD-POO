import React, { useCallback } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';

const SiginUp: React.FC = () => {
    const history = useHistory();
    const handleSubmit = useCallback(async (data: object) => { 
        try{
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            try {
                const response = await api({
                    method: 'post',
                    url: `users`,
                    data: data,
                    })

                alert('Cadastro realizado com sucesso.')
                history.push('/')

            } catch (err) {
                alert('Erro ao cadastrar registro.')
            }
        } catch ( error ) {
            console.log(error)
        }
    }, []);
    return(
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="E-Vent +" />
                <Form onSubmit={handleSubmit}>
                    <h1>Faça o seu cadastro</h1>
                    <Input name="email" icon={FiMail} placeholder="E-Mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <a href="/">
                    <FiArrowLeft />
                    Voltar para Login
                </a>
            </Content>
        </Container>
    );
}

export default SiginUp;