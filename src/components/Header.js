import { useContext } from 'react';
import styled from 'styled-components'
import logo_topo from '../assets/logo_topo.png'
import UserContext from '../contexts/UserContext';

function Header(){

    const {user} = useContext(UserContext);
    return (
        <Container>
            <img src={logo_topo} alt='Logo Topo' />
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

    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

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

