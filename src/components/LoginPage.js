import { Link } from "react-router-dom";


function LoginPage(){
    return(
        <>
            <h1> Essa é uma LoginPage</h1>
            <Link to='/cadastro'>
                <button> ir pra cadastro </button>
            </Link>
        </>
    )
}

export default LoginPage;