import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar } from 'react-circular-progressbar';
import PercentageContext from "../contexts/PercentageContext";

function Menu(){
    const {percentage} = useContext(PercentageContext);

    return (
        <Container>
            <StyledLink to='/habitos'> Hábitos </StyledLink>
            <StyledLink to='/hoje'> 
                <Progressbar
                    value={percentage}
                    text={`Hoje`}
                    background
                    backgroundPadding={6}
                    styles={{
                      background: {
                        fill: "#3e98c7"
                      },
                      text: {
                        fill: "#fff"
                      },
                      path: {
                        stroke: "#fff"
                      },
                      trail: { stroke: "transparent" }
                    }}
                />
            </StyledLink>
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
const Progressbar = styled(CircularProgressbar)`
    width: 91px;
    height: 91px;
    margin-bottom: 35px;
    text{
        transform: translate(-18px, 5px);

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;

        color: #FFFFFF;
    }
`