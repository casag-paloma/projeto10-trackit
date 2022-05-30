import { useContext } from 'react';
import styled from 'styled-components'
import logo_topo from '../assets/logo_topo.png'
import UserContext from '../contexts/UserContext';

function Header(){

    const {user} = useContext(UserContext);
    return (
        <Container>
            <h1> TrackIt </h1>
            <User> 
                <img src={user} alt='User'/>
            </User>
        </Container>
    )
}

export default Header;

const Container = styled.div`
    width: 100%;
    height: 70px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 1;
    padding: auto 18px;

    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 39px;
        line-height: 49px;

        color: #FFFFFF;
        margin: auto 18px;

        :hover{
            cursor: default;
        }
    }

    img{
        width: 97px;
        height: 49px;
        margin-left: 18px;
    }
`
const User = styled.div`
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin-right: 18px;
    }
`

