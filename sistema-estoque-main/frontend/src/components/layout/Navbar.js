import { useState, useContext, useEffect } from 'react';
import styles from './Navbar.module.css'
import api from '../../utils/api';
import logo from '../../assets/img/estoque_logo.png'

//context
import {Context} from '../../context/UserContext'

function Navbar() {

    const {authenticated, sair} = useContext(Context)
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '')
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (token) {
            try {
                const parsedToken = JSON.parse(token);
                api.get('/usuario/checarUsuario', {
                    headers: {
                        Authorization: `Bearer ${parsedToken}`
                    }
                }).then((response) => {
                    setUser(response.data);
                }).catch((error) => {
                    console.error('Erro ao obter dados do usuário:', error);
                });
            } catch (error) {
                console.error('Erro ao fazer parse do token:', error);
            }
        }

        const updateDateTime = () => {
            const now = new Date();
            const currentDate = now.toLocaleDateString('pt-BR');
            const currentTime = now.toLocaleTimeString('pt-BR');
            setDate(currentDate);
            setTime(currentTime);
        };
    
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
    
        return () => clearInterval(intervalId);
    }, [token]);

    return(
        <>
        <nav className={styles.navbar}>
            <div>
                <p>Data: <span>{date}</span></p>
            </div>
            <div>
                <p>Hora: <span>{time}</span></p>
            </div>
        </nav>
        
        {authenticated ? (
            <div className={styles.navbar_autenticado}>
                <div className={styles.centralizado}>
                    <h4><img src={logo} className={styles.icon} alt='logo'/>Logo</h4>
                </div>
                <div>Matricula: <span>{user.matricula}</span></div>
                <div>
                    <a onClick={sair} className={styles.sair}>Sair
                </a>
                </div>
            </div>
            ) : ""}  
        
        </>
    )
}

export default Navbar;