//API
import api from '../utils/api';

import { useState, useEffect } from 'react';
import useFlashMessage from './useFlashMessage'
import { useNavigate } from 'react-router-dom'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate()

        useEffect(() => {

            const token = localStorage.getItem('token')

            if(token) {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
                setAuthenticated(true)
            }
        }, [])


    async function registrar(user) {

        let msgText = 'Registro feito com sucesso!'
        let msgType = 'sucesso'

        try{
            const data = await api.post('/usuario/registrar', user).then((response) => {
                return response.data
            })
           await authUser(data)
        } catch (error) {
             msgText = error.response.data.message;
             msgType = 'error'
        }

       setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {

        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/menu')
    }

    function sair(){
        const msgText = 'Deslogado!'
        const msgType = 'sucesso'

        setAuthenticated(false)
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        navigate('/login')

        setFlashMessage(msgText, msgType)
    }

    async function login(user) {
        let msgText = 'Logado com sucesso!'
        let msgType = 'sucesso'

        try {
            const data = await api.post('/usuario/logar', user).then((response) => {
                return response.data
            })
           await authUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    return {authenticated, registrar, sair, login }
}