import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'

function SignUpPage(){

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up'
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [load, setLoad] = useState(false);
    let navigate = useNavigate();

    function signUp(e){
        e.preventDefault();
        setLoad(true)
        
        const formData = {
            email,
            name,
            image,
            password
        }

        console.log('uhull', formData);


        //const promise = axios.post(URL, formData);

       // promise.then(handleSuccess);
      //  promise.catch(handleError);
    }

    function handleSuccess(response){
        console.log(response.data);
        navigate('/')
    };

    function handleError(err){

    }

    return(
        <>
            <img src={logo} alt='Logo' />
            <form onSubmit={signUp}>
                <input disabled={load} type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value) } required/>
                <input disabled={load} type='password' placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value) } required />
                <input disabled={load} type='text' placeholder='nome' value={name} onChange={(e) => setName(e.target.value) } required />
                <input disabled={load} type='url' placeholder='foto' value={image} onChange={(e) => setImage(e.target.value) } required />
                <button type='submit' disabled={load} > Cadastrar </button>
            </form>

            <Link to='/'>
                <span> Já tem uma conta? Faça login!</span>
            </Link>
        </>
    )
}

export default SignUpPage;