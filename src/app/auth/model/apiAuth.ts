import { ILogin, IRespLogin } from '../interfaces/ILogin';
import axios from 'axios';

//USAMOS AXIOS PARA REALIZAR PETICIONES DESDE COMPONENTES QUE SE RENDERIZAN EN EL CLIENTE
//EN ESTE CASO EL COMPONENTE QUE EJECUTA EL LOGIN. Despues de logearse debe de redireccionado
//a otra ruta del path y esto solo lo conoce los navegadores de cada cliente donde se ejecuta
//el servidor no tiene acceso
// { ...login } == login
const apiBD = 'http://localhost:3000/api';

const apiAuth = {

    login: async (login:ILogin): Promise<IRespLogin> => {
        const ruta = `${apiBD}/auth/login`;
        const {data} = await axios.post(`${ruta}`, login)
        return data
    }
}

export default apiAuth;
