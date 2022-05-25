import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";

function TodayPage(){
    return(
        <>
        <Header/>
        <Container>
            <h1> Essa é uma TodayPage</h1>
        </Container>
        <Menu/>
        </>
    )
}

export default TodayPage;

const Container = styled.div`
margin-top: 70px;
`