import React from 'react'
import styles from './RemoverItems.module.css' 
import { useState } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import { useNavigate } from 'react-router-dom'
import InputMenu from '../../form/InputMenu'


function RemoverItem(produtosData) {

    const [produtos, setProdutos] = useState(produtosData || {});
    const [token] = useState(localStorage.getItem('token') || '');
    const {setFlashMessage} = useFlashMessage();
    const navigate = useNavigate()
    
    async function removerProdutos() {
        let msgType = 'sucesso';
        let data;
    
        try {
            data = await api.delete(`/produtos/removerProduto`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
                data: { codigo: produtos.codigo } 
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
        removerProdutos(produtos)
    }



    return (
        <>
       <div>
        <h1>Remover Item</h1>
       </div>
       <div>
       <form onSubmit={submit}>
            <InputMenu
                text="Código desejado"
                type="text"
                name="codigo"
                handleOnChange={handleChange}
            />
                <div className={styles.botoes}>
                    <input type='submit' value="Remover Item"/>
                    <a href='/menu'>Voltar</a>
                </div>
            </form>
       </div>
       </>
    )
}

export default RemoverItem;