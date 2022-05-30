import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import * as dayjs from 'dayjs'
import 'dayjs/locale/pt-br' 

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
    const [habitsDone, setHabitsDone] = useState([]);
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
        setHabitsDone(response.data.filter( habit => habit.done))

    }

    function handleError(err){
        console.log(err.response.data)
    }
    
    function renderMyTodayProgress(){
        
        if(habitsDone.length === 0){
            return <p> Nenhum hábito concluído ainda</p>
        } else{
            setPercentage(((habitsDone.length/habitsList.length)*100).toFixed(0))
            return <Subtitle> {` ${percentage}% dos hábitos concluídos`} </Subtitle>
        }

    }

    const todayProgress = renderMyTodayProgress();

    function renderMyTodayHabits(){

        return(
            habitsList.map((habit, index) => <Habit key={index} id={habit.id} name={habit.name} isDone={habit.done} currentSequence={habit.currentSequence} highestSequence={habit.highestSequence} setHabitsList={setHabitsList} setHabitsDone={setHabitsDone} />)
        )
            
    }
    
    return(
        <>
        <LocalStyle/>
        <Header/>
        <Container>
            <MyTodayHeader>
                <h1>{Today}</h1>
                <p>{todayProgress}</p>
            </MyTodayHeader>
            <MyTodayHabits>
                {renderMyTodayHabits()}
            </MyTodayHabits>
        </Container>
        <Menu/>
        </>
    )
}

function Habit({id, name, isDone, currentSequence, highestSequence, setHabitsList, setHabitsDone}){

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
            if(currentSequence >= highestSequence){
                setIsRecord(true);
            }
        }
    }, []);

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
        setHabitsDone(response.data.filter( habit => habit.done));
        setChecked(false);
        if(!checked && currentSequence >= highestSequence){
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
        setHabitsDone(response.data.filter( habit => habit.done));
        setChecked(true);
        if(!checked && currentSequence >= highestSequence){
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
                <Text>
                    <p>{`Sequência atual: `}</p> <h5>{`  ${currentSequence} dias`}</h5>
                </Text>
                <Text>
                    <p> {`Seu recorde: `}</p> <h6>{`  ${highestSequence} dias`}</h6>
                </Text>
            </div>
            <button onClick={checkHabit}><ion-icon name="checkmark"></ion-icon></button>
        </MyHabitBox>
    )
}

export default TodayPage;

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
    display: flex;
    flex-direction: column;
    align-items: center;

`

const MyTodayHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 28px 17px 0 17px;

    h1{
        font-size: 23px;
        line-height: 29px;
        padding: 0 17px 2px 17px;

        color: #126BA5;
    }

    p{
        font-size: 18px;
        line-height: 22px;
        padding-left: 9px;

        color: #BABABA;
    }

`

const Subtitle = styled.div`
    font-size: 18px;
    line-height: 22px;
    padding-left: 9px;
    color: #8FC549;

`
const MyTodayHabits = styled.div`
    margin: 28px auto;
`

const MyHabitBox = styled.div`
    width: 340px;
    min-height: 94px;
    box-sizing: border-box;
    padding: 13px 15px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;


    h1{
        width: 230px;
        padding-bottom:7px;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        word-wrap:break-word;
    }

    button{
        box-sizing: border-box;
        width: 69px;
        height: 69px;
        margin: auto 0;
            
        background-color: ${props => props.checked ? '#8FC549' : '#EBEBEB' };
        border: 1px solid #E7E7E7;
        border-radius: 5px;

        :hover{
            cursor: pointer;
        }
    }

    p{
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }

    h5{
        font-size: 13px;
        line-height: 16px;
        color: ${props => props.checked ? '#8FC549' : '#666666' };
    }

    h6{
        font-size: 13px;
        line-height: 16px;
        color: ${props => props.isRecord ? '#8FC549' : '#666666' };
    }

`

const Text = styled.div`
    display: flex;
    flex-direction: row;
`
