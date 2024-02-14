import React from 'react';
import styles from './Menu.module.css'


//imgs
import estoque from '../../../assets/img/estoque.png'
import adicionar_item from '../../../assets/img/adicionar_item.png'
import remover_item from '../../../assets/img/remover_item.png'
import entrada from '../../../assets/img/entrada.png'
import saida from '../../../assets/img/saida.png'

function Menu() {

   
    return (
       
        <section className={styles.titulo}>
            <h1>Menu</h1>
            <div className={styles.menu}>
                <a href='/estoque'><img src={estoque}/>Estoque Total</a>
                <a href='/adicionar-item'><img src={adicionar_item}/>Adicionar Item</a>
                <a href='/remover-item'><img src={remover_item}/>Remover Item</a>
                <a href='/entrada'><img src={entrada}/>Entrada</a>
                <a href='/saida'><img src={saida}/>Saída</a>
            </div>
        </section>
        
    )
}

export default Menu