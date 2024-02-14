import React, { useContext, useState } from 'react';
import Input from '../../form/Input'
import {Context} from '../../../context/UserContext'
import styles from './Registrar.module.css'


function Registrar() {
    const [user, setUser] = useState({})
    const {registrar} = useContext(Context);

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        registrar(user)
    }

    return (
       
        <>
        <div>
            <h1>Registrar</h1>
        </div>

        <div>
        <form onSubmit={submit}>
                <Input
                    text="Matrícula"
                    type="text"
                    name="matricula"
                    placeholder="Digite seu numero de matrícula"
                    handleOnChange={handleChange}

                />

                <Input
                    text="Nome"
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                />

                <Input
                    text="Senha"
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}

                />

                <Input
                    text="Confirme sua senha"
                    type="password"
                    name="confirmarsenha"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}

                />
                <div className={styles.botoes}>
                    <input type='submit' value="Registrar"/>
                    <a href='/login'>Voltar</a>
                </div>
            </form>    
        </div>
        </>
        
    )
}

export default Registrar