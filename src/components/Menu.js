import { Link } from "react-router-dom";
import styled from "styled-components";
import CircularProgression from "./CircularProgression";

function Menu(){
    return (
        <Container>
            <StyledLink to='/habitos'> Hábitos </StyledLink>
            <StyledLink to='/habitos'> {CircularProgression()} </StyledLink>
            <StyledLink to='/historico'> Histórico </StyledLink>
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
    align-items: center;
`
const StyledLink = styled(Link)`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;

    color: #52B6FF;
    text-decoration: none;
`
