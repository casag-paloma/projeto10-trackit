import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // import locale

import TokenContext from "../contexts/TokenContext";
import Header from "./Header";
import Menu from "./Menu";

function TodayPage(){
    
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    
    const {token} = useContext(TokenContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
        
    const [habitsList, setHabitsList]= useState([]);
    const dayjs = require('dayjs')
    dayjs.locale('pt-br')
    const today = dayjs().format('dddd, DD/MM');
    const Today = today.substring(0, 1).toUpperCase() + today.substring(1);
    
        
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
            <h1>{Today}</h1>
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

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
    

    const {token} = useContext(TokenContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const [checked, setChecked] = useState(false);
    useEffect(()=> setChecked(isDone), []);


    function checkHabit(id){
        if(checked){
            const promise = axios.post(`${URL}/uncheck`, "", config);
    
            promise.then((response)=> console.log(response.data));
            promise.catch(handleError);
            setChecked(false);
        } 
        else{
    
            const promise = axios.post(`${URL}/check`, "", config);
    
            promise.then((response)=> console.log(response.data));
            promise.catch(handleError);
            setChecked(true);
            
        }
    }

    function handleError(err){
        alert(err.response.data.message);
    }

    return(
        <MyHabitBox checked={checked}>
            <div>
                <h1>{name}</h1>
                <p>{`Sequência atual: ${currentSequence} dias
Seu recorde: ${highestSequence} dias`}</p>
            </div>
            <button onClick={()=> checkHabit(id)}><ion-icon name="checkmark"></ion-icon></button>
        </MyHabitBox>
    )
}

export default TodayPage;

const Container = styled.div`
margin-top: 70px;
`

const MyTodayHeader = styled.div`
    h1{    
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;

        color: #126BA5;
    }
`
const MyTodayHabits = styled.div``

const MyHabitBox = styled.div`
    width: 340px;
    height: 100%;    
    background: lightblue;
    border-radius: 5px;

    button{
        box-sizing: border-box;
        width: 69px;
        height: 69px;
            
        background: ${props => props.checked ? '#8FC549' : '#EBEBEB' };
        border: 1px solid #E7E7E7;
        border-radius: 5px;
    }
`