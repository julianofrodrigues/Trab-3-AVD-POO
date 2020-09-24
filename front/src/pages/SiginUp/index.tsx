import React, { useCallback } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';

const SiginUp: React.FC = () => {
    const handleSubmit = useCallback(async (data: object) => { 
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false
            });
        } catch ( error ) {
            console.log(error)
        }
    }, []);
    return(
        <Container>
            <Content>
                <img src={logoImg} alt="E-Vent +" />
                <Form onSubmit={handleSubmit}>
                    <h1>Faça o seu cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} placeholder="E-Mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <a href="/">
                    <FiArrowLeft />
                    Voltar para Login
                </a>
            </Content>
            <Background />
        </Container>
    );
}

export default SiginUp;