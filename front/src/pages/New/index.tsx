import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import { FaStreetView } from 'react-icons/fa';
import { AiOutlineFieldNumber } from 'react-icons/ai';
import { GiStreetLight } from 'react-icons/gi';
import { MdLocalBar } from 'react-icons/md';
import logoImg from '../../assets/logo.png';
import Button from "../../components/Button";
import Input from '../../components/Input'
import { Container } from './styles';
import { Form } from '@unform/web';
import  Dropzone from '../../components/Dropzone'
import * as Yup from 'yup';
import axios from 'axios';
import TextArea from "../../components/TextArea";
import { useHistory, useLocation } from 'react-router-dom';
import { Event } from "../../services/interfaces";
import api from '../../services/api';
import { useCookies } from 'react-cookie';

const New: React.FC = () => {

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  async function handleSubmit(data: Event) {
      try {
        const schema = Yup.object().shape({
          event_name: Yup.string().required('Nome do evento obrigatório'),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        console.log(data)
        const place = ''
        let bodyFormData = new FormData();
        bodyFormData.set('event_name', data.event_name);
        bodyFormData.set('district', data.district);
        bodyFormData.set('street', data.street);
        bodyFormData.set('number', data.number);
        bodyFormData.set('commentary', data.commentary);
        bodyFormData.set('uf', selectedUf);
        bodyFormData.set('city', selectedCity);
        bodyFormData.set('user_id', cookies.user._id);
        if (selectedFile) {
          bodyFormData.append('image', selectedFile);
        }

        try {
            await api({
                method: 'post',
                url: 'events',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' }
                })

            alert('Cadastro efetuado com sucesso.')

            history.push('/profile')
        } catch (err) {
            alert('Erro ao cadastrar seus dados.')
        }
    } catch ( error ) {
        console.log(error)
    }
  }

  interface IBGEUFResponse {
    sigla: string;
  }
  
  interface IBGECityResponse {
    nome: string;
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf) {
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });
    }

  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  };

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  };

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
           <Input name="event_name" icon={MdLocalBar} placeholder="Nome do evento" />
        </fieldset>

        <fieldset>
        <legend>
            <h2>Sobre o evento</h2>
          </legend>
          <Input name="commentary" />
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
          </legend>
              <Input name="district" icon={FaStreetView} placeholder="Bairro" /> 
              <Input name="street" icon={GiStreetLight} placeholder="Rua"/>
              <Input name="number" icon={AiOutlineFieldNumber} placeholder="Número" />
              <br></br>

              <div>
                <select
                  value={selectedUf} 
                  onChange={handleSelectUf}
                >
                <option>Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                <select
                  value={selectedCity} 
                  onChange={handleSelectCity}
                >
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