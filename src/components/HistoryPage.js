import Header from "./Header";
import Menu from "./Menu";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components'


function HistoryPage(){
    return(
        <>
            <LocalStyle/>
            <Header/>
            <Container>
                <Title> 
                    <h1> Histórico </h1>
                    <p> Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                </Title>
            </Container>
            <Menu/>
        </>

    )
}

export default HistoryPage;

const LocalStyle = createGlobalStyle`
body {
    background-color: #F2F2F2;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
}

`
const Container = styled.div`
    width: 100%;
    margin: 70px auto 75px auto;

`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    padding: 28px 17px 5px 17px;

    h1{
        font-size: 23px;
        line-height: 29px;
        margin-bottom: 17px;

        color: #126BA5;
    }

    p{
        font-size: 18px;
        line-height: 22px;

        color: #666666;
    }
`
