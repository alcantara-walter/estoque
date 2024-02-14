import React, { useContext, useState } from 'react';
import Input from '../../form/Input'
import {Context} from '../../../context/UserContext'
import styles from './Login.module.css'

function Login() {
        const [user, setUser] = useState({});
        const {login} = useContext(Context);
        
        function handleChange(e){
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    
        function submit(e) {
            e.preventDefault()
            login(user)
        }
        
    return (
       <>
        <div className={styles.titulo}>
            <h1>Sistema Estoque</h1>
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
                    text="Senha"
                    type="password"
                    name="senha"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}

                />
                <div className={styles.botoes}>
                    <input type='submit' value="Logar"/>
                    <p>Não tem conta?<a href='/registrar'>Registrar-se</a></p>
                </div>

            </form>    
        </div>
        </>
    )
}

export default Login