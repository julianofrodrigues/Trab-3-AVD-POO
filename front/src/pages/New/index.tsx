import React, { useState, useEffect, useCallback } from "react";
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import { FaStreetView } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiStreetLight } from 'react-icons/gi';
import { MdLocalBar } from 'react-icons/md';
import { FcInfo } from "react-icons/fc";
import logoImg from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import  Dropzone from '../../components/Dropzone'
import * as Yup from 'yup';
import axios from 'axios';
import TextArea from "../../components/TextArea";

const New: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => { 
      try{
          const schema = Yup.object().shape({
              name: Yup.string().required('Nome do evento obrigatório'),
          });

          await schema.validate(data, {
              abortEarly: false
          });
      } catch ( error ) {
          console.log(error)
      }
  }, []);

  interface IBGEUFResponse {
    sigla: string;
  }
  
  interface IBGECityResponse {
    nome: string;
  }

  const [selectedUf, setSelectedUf] = useState('0');
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    };

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });

  }, [selectedUf]);


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

        <Form onSubmit={handleSubmit}>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados do Evento</h2>
          </legend>
           <Input name="name" icon={MdLocalBar} placeholder="Nome do evento" />
        </fieldset>

        <fieldset>
        <legend>
            <h2>Sobre o evento</h2>
          </legend>
          <TextArea name="sobre" />
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
              <Input name="bairro" icon={FaStreetView} placeholder="Bairro" /> 
              <Input name="rua" icon={GiStreetLight} placeholder="Rua"/>
              <Input name="numero" icon={AiOutlineFieldNumber} placeholder="Número" />
              <br></br>

              <div>
                <select>
                <option>Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                <select>
                <option>Selecione uma cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
          
        </fieldset>

        <Button type="submit">
          Cadastrar Evento
        </Button>
      </Form>
        </Container>
            
    );
}

export default New;