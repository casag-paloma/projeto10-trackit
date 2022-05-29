import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // import locale

import TokenContext from "../contexts/TokenContext";
import PercentageContext from "../contexts/PercentageContext";
import Header from "./Header";
import Menu from "./Menu";

function TodayPage(){
    
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
    
    const {token} = useContext(TokenContext);
    const {percentage, setPercentage} = useContext(PercentageContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
        
    const [habitsList, setHabitsList]= useState([]);
    const [habitsChecked, setHabitsChecked] = useState(0);
    let qtd =0;
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

    
    function renderMyTodayProgress(){

        habitsList.map( habit => {
            if(habit.done){
                qtd++;
                console.log('aqui', qtd);
            }
        });

        console.log(habitsList, qtd);

        const habitsDone = qtd;

        // ver se tem algum jeito de fazer com useState();

        if(habitsDone === 0){
            return <p> Nenhum hábito concluído ainda</p>
        } else{
            setPercentage((habitsDone/habitsList.length)*100)
            return <p> {habitsList.length} {qtd} {percentage} </p>
        }

    }

    const todayProgress = renderMyTodayProgress();

    function renderMyTodayHabits(){

        return(
            habitsList.map((habit, index) => <Habit key={index} id={habit.id} name={habit.name} isDone={habit.done} currentSequence={habit.currentSequence} highestSequence={habit.highestSequence} setHabitsList={setHabitsList} habitsChecked={habitsChecked} setHabitsChecked={setHabitsChecked} />)
        )
            
    }
    
    return(
        <>
        <Container>
        <Header/>
        <MyTodayHeader>
            <h1>{Today}</h1>
            <h2>{todayProgress}</h2>
        </MyTodayHeader>
        <MyTodayHabits>
            {renderMyTodayHabits()}
        </MyTodayHabits>
        </Container>
        <Menu/>
        </>
    )
}

function Habit({id, name, isDone, currentSequence, highestSequence, setHabitsList, habitsChecked, setHabitsChecked}){

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
    

    const {token} = useContext(TokenContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const [checked, setChecked] = useState(false);
    const [isRecord, setIsRecord] = useState(false);
    
    useEffect(()=> {
        setChecked(isDone);
        if(isDone){
            if(currentSequence === highestSequence){
                setIsRecord(true);
            }
        }
    }, []);


    // falta verficar a porcentagem que chega!!

    function checkHabit(){
        if(checked){
            const promise = axios.post(`${URL}/uncheck`, "", config);
    
            promise.then(handleSucessUncheckHabit);
            promise.catch(handleError);
        } 
        else{
    
            const promise = axios.post(`${URL}/check`, "", config);
    
            promise.then(handleSucessCheckHabit);
            promise.catch(handleError);
            
        }
    }

    function handleSucessUncheckHabit(){
        const URL2 = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'

        const promise = axios.get(URL2, config);

        promise.then(handleSucessUptadeHabitsAfterUncheck)
        promise.catch(handleError)

    }

    function handleSucessUptadeHabitsAfterUncheck(response){
        setHabitsList(response.data);
        setChecked(false);
        setHabitsChecked(habitsChecked-1)
        if(!checked && currentSequence === highestSequence){
            setIsRecord(true);
        } else{
            setIsRecord(false);
        }
    
    }

    function handleSucessCheckHabit(){
        const URL2 = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'

        const promise = axios.get(URL2, config);

        promise.then(handleSucessUptadeHabitsAfterCheck)
        promise.catch(handleError)

    }

    function handleSucessUptadeHabitsAfterCheck(response){
        setHabitsList(response.data);
        setChecked(true);
        setHabitsChecked(habitsChecked+1);
        if(!checked && currentSequence === highestSequence){
            setIsRecord(true);
        } else{
            setIsRecord(false);
        }
    
    }

    function handleError(err){
        alert(err.response.data.message);
    }

    return(
        <MyHabitBox checked={checked} isRecord={isRecord}>
            <div>
                <h1>{name}</h1>
                <p>{`Sequência atual: `}</p> <h5>{`${currentSequence} dias`}</h5>
                <p> {`Seu recorde: `}</p> <h6>{`${highestSequence} dias`}</h6>
            </div>
            <button onClick={checkHabit}><ion-icon name="checkmark"></ion-icon></button>
        </MyHabitBox>
    )
}

export default TodayPage;

const Container = styled.div`
margin: 70px auto 110px auto;
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
    display: flex;


    button{
        box-sizing: border-box;
        width: 69px;
        height: 69px;
            
        background-color: ${props => props.checked ? '#8FC549' : '#EBEBEB' };
        border: 1px solid #E7E7E7;
        border-radius: 5px;
    }

    h5{
        color: ${props => props.checked ? '#8FC549' : '#666666' };
    }

    h6{
        color: ${props => props.isRecord ? '#8FC549' : '#666666' };
    }


`