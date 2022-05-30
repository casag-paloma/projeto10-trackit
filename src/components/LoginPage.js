import { Link, useNavigate } from "react-router-dom";
import {useState, useContext} from 'react';
import axios from "axios";
import styled from "styled-components";
import logo from '../assets/logo.png'
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import LoadingSpinner from "./LoadingSpinner";

function LoginPage(){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login'

    const {setUser} = useContext(UserContext);
    const {setToken} = useContext(TokenContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    function login(e){
        e.preventDefault();
        setLoading(true)
        
        const formData = {
            email,
            password
        }


        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        setUser(response.data.image)
        setToken(response.data.token);
        navigate('/hoje')
    };

    function handleError(err){
        alert (err.response.data.message);
        setLoading(false);
    }

    function toLogin(){
        if(loading) return <div><LoadingSpinner height={50} width={50}/> </div>
        else return <> Entrar </>
    }

    const loginButton = toLogin();


    function renderForm(){
        return(
            <FormLogin onSubmit={login}>
                <input disabled={loading} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={loading} type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <button type='submit' disabled={loading} > {loginButton} </button>
            </FormLogin>
        )
    }

    const loginForm = renderForm();

    return(
        
        <Container>
            <img src={logo} alt='Logo' />
            <div>{loginForm}</div>
            <Link to='/cadastro'>
                <p> Não tem uma conta? Cadastre-se! </p>
            </Link>
        
        </Container>
    )
}

export default LoginPage;

const Container = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;

    img{
        width: 180px;
        height:180px;
        margin: 68px auto 32px auto;
    }

    p{
        width: 232px;
        height: 17px;
        margin-top: 25px;
        
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        color: #52B6FF;
    }

`
const FormLogin = styled.form`
    display:flex;
    flex-direction:column;

    div{
        width: 303px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items:center;
        
    }

    input{

        box-sizing: border-box;

        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        &&:placeholder{

            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 25px;

            color: #DBDBDB;
        }
    }

    button{

        width: 303px;
        height: 45px;
        
        background: #52B6FF;
        border-radius: 5px;
    
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 21px;
        line-height: 26px;
        text-align: center;

        color: #FFFFFF;

        :hover{
            cursor: pointer;
        }
    }

`
