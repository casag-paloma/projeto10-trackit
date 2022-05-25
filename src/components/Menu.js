import { Link } from "react-router-dom";
import styled from "styled-components";

function Menu(){
    return (
        <Container>
            <Link to='/habitos'> Hábitos </Link>
            <Link to='/hoje'> Hoje </Link>
            <Link to='/historico'> Histórico </Link>
        </Container>
    )
}
 
export default Menu;

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    bottom: 0px;

    background: #FFFFFF;

    display: flex;
    flex-direction: row;
    justify-content: space-around;

`
