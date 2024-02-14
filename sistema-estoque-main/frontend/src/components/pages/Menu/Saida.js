import React from 'react'
import styles from './Entrada_Saida.module.css' 
import { useState } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'
import InputMenu from '../../form/InputMenu'


function Saida() {
    const [produtos, setProdutos] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate()
    
    async function AdicionarSaida(produtos) {
        let msgType = 'sucesso';
        let data;

        const formData = new FormData()

        const produtosFormData = await Object.keys(produtos).forEach((key) => {
            formData.append(key, produtos[key])
        })

    formData.append('produtos', produtosFormData)
    
        try {
            data = await api.patch(`/produtos/removerQuantidade`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(AdicionarSaida),
                }).then((response) => {
                return response.data;
            });
        } catch(err) {
            msgType = 'error';
            data = err.response.data;
          
        }
       
        setFlashMessage(data.message, msgType);
        if (msgType !== 'error') {
            navigate('/menu');
        }
    }

    function handleChange(e) {
        setProdutos({...produtos, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        console.log(produtos)
        AdicionarSaida(produtos)
    }

    return (
        <>
        <h1>Saida</h1>

        <div>
       <form onSubmit={submit}>
            <InputMenu
                text="Código desejado"
                type="text"
                name="codigo"
                handleOnChange={handleChange}
            />

            <InputMenu
                text="Quantidade"
                type="text"
                name="quantidade"
                handleOnChange={handleChange}
            />
                <div className={styles.botoes}>
                    <input type='submit' value="Registrar Saida"/>
                    <a href='/menu'>Voltar</a>
                </div>
            </form>
       </div>
       </>
    )
}

export default Saida;