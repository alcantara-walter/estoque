import React from 'react'
import styles from './Total.module.css'
import { useState, useEffect } from 'react'
import api from '../../../utils/api'


function Total() {
    const [produtos, setProdutos] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get('/produtos/estoque', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setProdutos(response.data.produtos)
        })
    }, [token])


    return (
        <>
            <div>
                <div className={styles.titulo}>
                    <h1>Estoque</h1>
                    <p>Existem {produtos.length} produtos no estoque </p>
                </div>
                <div className={styles.container_produto}>
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        
                            <div key={produto.codigo} className={styles.produto}>
                                <h4>{produto.codigo}</h4>
                                <p>{produto.produto}</p>
                                <p>Qtd: {produto.quantidade}</p>
                            </div>
                       
                    ))
                ) : (
                    <p>Não existem produtos no estoque</p>
                )}
                </div>
            </div>
            <div className={styles.botao}>
                <a href='/menu'>Voltar</a>
            </div>
        </>
    )
}

export default Total;