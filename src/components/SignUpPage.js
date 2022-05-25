import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'

function SignUpPage(){

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    function register(e){
        e.preventDefault();
        
        const formData = {
            email,
            name,
            image,
            password
        }

        console.log('uhull', formData);

        const promise = axios.post(URL, formData);

        promise.then((response) => console.log(response.data));
        promise.catch();

    }

    return(
        <>
            <img src={logo} alt='Logo' />
            <form onSubmit={register}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <input type='text' placeholder='nome' value={name} onChange={(e) => setName(e.target.value) } required />
                <input type='url' placeholder='foto' value={image} onChange={(e) => setImage(e.target.value) } required />
                <button type='submit'> Cadastrar </button>
            </form>

            <Link to='/'>
                <span> Já tem uma conta? Faça login!</span>
            </Link>
        </>
    )
}

export default SignUpPage;