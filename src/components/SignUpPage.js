import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/logo.png'
import LoadingSpinner from './LoadingSpinner';

function SignUpPage(){

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    function signUp(e){
        e.preventDefault();
        setLoading(true)
        
        const formData = {
            email,
            name,
            image,
            password
        }

        const promise = axios.post(URL, formData);

        promise.then(handleSuccess);
        promise.catch(handleError);
    }

    function handleSuccess(response){
        navigate('/')
    };

    function handleError(err){
        alert (err.response.data.message);
        setLoading(false);
    }
    
    function toSignUp(){
        if(loading) return <div> <LoadingSpinner height={50} width={50}/> </div> 
        else return <> Cadastrar </>
    }

    const signUpButton = toSignUp();

    function renderForm(){
        
        return(
            <FormSignIn onSubmit={signUp}>
                <input disabled={loading} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={loading} type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <input disabled={loading} type='text' placeholder='nome' value={name} onChange={(e) => setName(e.target.value) } required />
                <input disabled={loading} type='url' placeholder='foto' value={image} onChange={(e) => setImage(e.target.value) } required />
                <button type='submit' disabled={loading} > {signUpButton} </button>
            </FormSignIn>
        )
    }

    const signUpForm = renderForm();


    return(
        <Container>
            <img src={logo} alt='Logo' />
            <div> {signUpForm}</div>
            <Link to='/'>
                <p> Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )
}

export default SignUpPage;

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
const FormSignIn = styled.form`
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
