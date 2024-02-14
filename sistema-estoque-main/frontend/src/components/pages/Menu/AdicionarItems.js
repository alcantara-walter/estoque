import React from 'react'
import styles from './AdicionarItems.module.css' 
import { useState } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'
import InputMenu from '../../form/InputMenu'


function AdicionarItem(produtosData) {

    const [produtos, setProdutos] = useState(produtosData || {});
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate()
    
    async function registrarProdutos(produtos) {
        let msgType = 'sucesso'
        const formData = new FormData()
        await Object.keys(produtos).forEach((key) => {
            formData.append(key, produtos[key])
        })

        const data = await api.post('/produtos/criarProduto', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json'
             }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
        if (msgType !== 'error') {
            navigate('/menu')
        }
    }

    function handleChange(e) {
        setProdutos({...produtos, [e.target.name]: e.target.value})
    }

    function submit(e) {
        e.preventDefault()
        console.log(produtos)
        registrarProdutos(produtos)
    }



    return (
        <>
       <div className={styles.titulo}>
        <h1>Adicionar Item</h1>
       </div>
       <div>
       <form onSubmit={submit}>
            <InputMenu
                text="Código desejado"
                type="text"
                name="codigo"
                handleOnChange={handleChange}
            />

            <InputMenu
                text="Produto"
                type="text"
                name="produto"
                handleOnChange={handleChange}
            />

            <InputMenu
                text="Quantidade Inicial"
                type="text"
                name="quantidade"
                handleOnChange={handleChange}
            />
                 <div className={styles.botoes}>
                    <input type='submit' value="Registrar Item"/>
                    <a href='/menu'>Voltar</a>
                </div>
            </form>
       </div>
       </>
    )
}

export default AdicionarItem;