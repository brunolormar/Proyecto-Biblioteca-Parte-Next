'use client'

import { FC, useReducer, useEffect } from 'react';
import { AuthContext, AuthReducer } from './';
import { IUser } from '@/interfaces/IUser';
import BibliotecaApi from '@/api/BibliotecaApi';
import Cookies from 'js-cookie';
import axios from 'axios';
//import { IRepuestaApiAuth, IRespuestaLogin } from './interfaces/IRepuestaAuthApi';
import { AuthState } from './AuthState';

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props {
  children: any;
}

export const AuthProvider: FC<{children:any}> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<AuthState, any>>(AuthReducer, AUTH_INITIAL_STATE);
    //const [ state, dispatch ] = useReducer( AuthReducer, AUTH_INITIAL_STATE );

    useEffect( ()=>{
        checkToken()
    }, []);
    const checkToken = async() => {
        //llamar al endpoint
        //Revalidar el token y guardar en cockies
        //dispatch login

        //Mal --> borrar token de los cockies
        const token = Cookies.get('token');
        if (!token) return;

        try {
            const { data } = await BibliotecaApi.get('/auth/validate-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            dispatch({ type: '[Auth] - Login', payload: data.user });

        } catch (error) {
            Cookies.remove('token');
            dispatch({ type: '[Auth] - Logout' });
        }

        const { data } = await BibliotecaApi.get('/auth/validate-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('[checkToken] data:', data);
        
    }

    const loginUser = async (
        data: { email: string; password: string }
    ): Promise<IUser | null> => {
        const { email, password } = data;

        try {
            const { data } = await BibliotecaApi.post('/auth/login', { email, password });
            console.log(data);
            const { token, user } = data;
            console.log(user);
            Cookies.set('token', token);
            Cookies.set('FullName', user.username);
            dispatch({ type: '[Auth] - Login', payload: user });
            return user;
        } catch (error) { //credenciales falsas
            return null;
        }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('FullName');
        dispatch({ type: '[Auth] - Logout' });
    };

    const registerUser = async (
        data: { email: string; password: string; fullName: string }
    ): Promise<{ hasError: boolean; message: string }> => {
        const { email, password, fullName } = data;

        try{
            const { data } = await BibliotecaApi.post ('/auth/register', { email, username: fullName, password })
            const { token, user } = data;
            Cookies.set('token', token);
            //mando a llamar al login porque ya se autentico
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false,
                message: 'Usuario creado con éxito'
            }
        } catch (error) {
            if (axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message
                };
            }
            // no es error de axios
            return {
                hasError: true,
                message: 'No se puede crear el usuario, intentalo de nuevo'
            }
        }
    }
    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            registerUser,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}