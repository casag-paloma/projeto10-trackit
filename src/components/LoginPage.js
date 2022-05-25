import { Link, useNavigate } from "react-router-dom";
import {useState} from 'react';
import axios from "axios";
import logo from '../assets/logo.png'


function LoginPage(){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);
    let navigate = useNavigate();

    function login(e){
        e.preventDefault();
        setLoad(true)
        
        const formData = {
            email,
            password
        }

        console.log('uhull', formData);


        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        console.log(response.data);
        navigate('/hoje')
    };

    function handleError(err){
        alert (err.response.data.message);
        setLoad(false);
    }


    return(
        
        <>
            <img src={logo} alt='Logo' />
            <form onSubmit={login}>
                <input disabled={load} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={load} type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <button type='submit' disabled={load} > Entrar </button>
            </form>

            <Link to='/cadastro'>
                <span> Não tem uma conta? Cadastre-se! </span>
            </Link>
        
        </>
    )
}

export default LoginPage;