import { Link, useNavigate } from "react-router-dom";
import {useState, useContext} from 'react';
import axios from "axios";
import logo from '../assets/logo.png'
import TokenContext from "../contexts/TokenContext";
import LoadingSpinner from "./LoadingSpinner";

function LoginPage(){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'

    const {setToken} = useContext(TokenContext);
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
        setToken(response.data.token)
        navigate('/hoje')
        console.log(response.data, response.data.token);
    };

    function handleError(err){
        alert (err.response.data.message);
        setLoad(false);
    }

    function toLogin(){
        if(load) return <LoadingSpinner/>
        else return <p> Entrar </p>
    }

    const loginButton = toLogin();


    function renderForm(){
        return(
            <form onSubmit={login}>
                <input disabled={load} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={load} type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <button type='submit' disabled={load} > {loginButton} </button>
            </form>
        )
    }

    const loginForm = renderForm();

    return(
        
        <>
            <img src={logo} alt='Logo' />
            <div>{loginForm}</div>
            <Link to='/cadastro'>
                <span> Não tem uma conta? Cadastre-se! </span>
            </Link>
        
        </>
    )
}

export default LoginPage;