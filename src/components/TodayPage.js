import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Menu from "./Menu";

function TodayPage(){

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'

    const {token} = useContext(TokenContext);
    
    const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    }}

    const [habitsList, setHabitsList]= useState([]);

    useEffect(() => {
        const promise = axios.get(URL, config);

        promise.then(handleSucess)
        promise.catch(handleError)

    }, [])

    function handleSucess(response){
        setHabitsList(response.data);
        console.log(response.data)
    }

    function handleError(err){
        console.log(err.response.data)
    }
    console.log(habitsList);

    function renderMyTodayHabits(){

        return(
            habitsList.map((habit, index) => <Habit key={index} id={habit.id} name={habit.name} isDone={habit.done} currentSequence={habit.currentSequence} highestSequence={habit.highestSequence}  />)
        )
            
    }
    
    return(
        <>
        <Container>
        <Header/>
        <MyTodayHeader>
            <h1> Essa é uma TodayPage</h1>
        </MyTodayHeader>
        <MyTodayHabits>
            {renderMyTodayHabits()}
        </MyTodayHabits>
        </Container>
        <Menu/>
        </>
    )
}

function Habit({id, name, isDone, currentSequence, highestSequence}){

    return(
        <MyHabitBox>
            <div>
                <h1>{name}</h1>
                <p>{`Sequência atual: ${currentSequence} dias
Seu recorde: ${highestSequence} dias`}</p>
            </div>
            <button><ion-icon name="checkmark"></ion-icon></button>
        </MyHabitBox>
    )
}

export default TodayPage;

const Container = styled.div`
margin-top: 70px;
`

const MyTodayHeader = styled.div``
const MyTodayHabits = styled.div``

const MyHabitBox = styled.div`
    width: 340px;
    height: 94px;
    
    background: #FFFFFF;
    border-radius: 5px;

    button{
        box-sizing: border-box;

        position: absolute;
        width: 69px;
        height: 69px;
            
        background: #EBEBEB;
        border: 1px solid #E7E7E7;
        border-radius: 5px;
    }
`