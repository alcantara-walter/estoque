import {createContext} from 'react';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({children}) {
    const {authenticated, registrar, sair, login } = useAuth() 
    return(
        <Context.Provider value={{authenticated, registrar, sair, login}}>
            {children}
        </Context.Provider>
    )
}

export { Context, UserProvider };