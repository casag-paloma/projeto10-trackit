import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import { createGlobalStyle } from "styled-components";
import TokenContext from '../contexts/TokenContext';
import LoadingSpinner from "./LoadingSpinner";


function HabitsPage(){

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'

    const {token} = useContext(TokenContext);
    
    const config = {
    headers: {
        "Authorization": `Bearer ${token}`
    }}

    const [ create, setCreate] = useState(false);
    const [ habitName, setHabitName] = useState('');
    const [ chosenDays, setChosenDays] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ habitsUser, setHabitsUser] = useState([]);

    useEffect(() => {
        const promise = axios.get(URL, config);

        promise.then(handleSucessGetList)
        promise.catch(handleError)

    }, [])

    function handleSucessGetList(response){
        setHabitsUser(response.data )
    }

    function handleError(err){
        console.log(err.response.data)
    }

    function addNewHabit(){
        setCreate(true);
    }

    function renderWeekDays(){       
        const weekdayslist = ['D', 'S', 'T', 'Q', 'Q', 'S','S'];

        const weekdaysListToShow = weekdayslist.map((name, index) => {
            if(chosenDays.includes(index)){
                return {name: name, chosen: true}
            } else{
                return {name: name, chosen: false}
            }
        })

        return(
            <>
                {weekdaysListToShow.map((day, index) => < Day key={index} name={day.name} id={index} loading={loading} isChosen={day.chosen} chosenDays={chosenDays} setChosenDays={setChosenDays} />)}
            </>
        )
    };

    const myWeekdays = renderWeekDays();

    function toSave(){
        if(loading) return <LoadingSpinner height={20} width={20}/> 
        else return <> Salvar </>
    }

    const saveButton = toSave();


    function renderNewHabitsForm(){
        if(create){
            return(
                    <HabitForm>
                        <input disabled={loading} type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></input>
                        <div>{myWeekdays}</div>
                        <Buttons>
                            <CancelButton disabled={loading} onClick={()=> setCreate(false)}> Cancelar </CancelButton>
                            <SaveButton disabled={loading} onClick={submitNewHabit}> {saveButton}</SaveButton>
                        </Buttons>
                    </HabitForm>
            )
        }
    }
    
    const newHabitForm = renderNewHabitsForm();

    function renderHabits(){
        if( habitsUser.length === 0){
            return   <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        } else{
            return (
                habitsUser.map(habit => <HabitUser key={habit.id} id={habit.id} name={habit.name} days={habit.days} setHabitsUser={setHabitsUser} />)
            )
        }
    };
    
    const myHabits = renderHabits();

    function submitNewHabit(){
        setLoading(true);

        const body = {
            name: habitName,
            days: chosenDays 
        }

        const promise = axios.post(URL, body, config);

        promise.then(handleSuccessPostNewHabit);
        promise.catch(handleError);
    }

    function handleSuccessPostNewHabit(response){
        setHabitName('');
        setChosenDays([]);
        setLoading(false);
        setCreate(false);

        const promise = axios.get(URL, config);
        promise.then(handleSucessGetList)
        promise.catch(handleError)
    }

    return(
        <>
            <LocalStyle/>
            <Header/>
            <Container>
                <Title> 
                    <h1> Meus hábitos </h1>
                    <button onClick={addNewHabit}> + </button>
                </Title>
                <div> {newHabitForm} </div>
                <MyHabits>{myHabits}</MyHabits>
            </Container>
            <Menu/>

        </>
    )
}

function Day({name, id, chosenDays, setChosenDays, loading, isChosen}){
    const [chosen, setChosen] = useState(false);

    useEffect(()=> setChosen(isChosen), []);

    function chooseDay(id){
        if(chosen){
            setChosenDays(chosenDays.filter(day => day !== id)) 
            setChosen(false)
        } 
        else{
            setChosenDays([...chosenDays, id]);
            setChosen(true);
        }
    }

    return(

        <DayButton disabled={loading} chosen={chosen} onClick={()=> chooseDay(id)}>{name}</DayButton>
    )
}

function HabitUser({id, name, days, setHabitsUser}){
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'

    const {token} = useContext(TokenContext);
    
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };
    
    const weekdayslist = ['D', 'S', 'T', 'Q', 'Q', 'S','S'];

    function showDaysHabits(){
        
        const weekdaysListToShow = weekdayslist.map((name, index) => {
            if(days.includes(index)){
                return {name: name, chosen: true}
            } else{
                return {name: name, chosen: false}
            }
        })

        return(
            weekdaysListToShow.map((day, index) =>  <DayButton key={index} chosen={day.chosen}>{day.name}</DayButton>)
        )
    }

    function deleteHabit(id){
        if(window.confirm('Você realmente quer deletar esse hábito?')){

            const promise = axios.delete(`${URL}/${id}`, config);
            promise.then(handleSuccessDeleteHabit);
            promise.catch(handleError);
        }
    }

    function handleSuccessDeleteHabit(){
        const promise = axios.get(URL, config);
        promise.then(handleSucessGetList)
        promise.catch(handleError)
    }

    function handleSucessGetList(response){
        setHabitsUser(response.data )
    }

    function handleError(err){
        console.log(err.response.data)
    }


    return(
        <MyHabitBox>
            <p>{name}</p>
            <div>{showDaysHabits()}</div>
            <ion-icon name="trash-outline" onClick={() => deleteHabit(id)}></ion-icon>
        </MyHabitBox>
    )
}

export default HabitsPage;

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
    margin: 70px auto 105px auto;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 17px 20px 17px;

    h1{
        font-size: 23px;
        line-height: 29px;
        margin-left: 17px;

        color: #126BA5;
    }

    button{
        width: 40px;
        height: 35px;
        padding: 0;
        margin-right: 17px;
    
        background: #52B6FF;
        border-radius: 5px;

        font-size: 27px;
        text-align: center;

        color: #FFFFFF;

        :hover{
            cursor: pointer;
        }
    }

`

const MyHabits = styled.div`

    display: flex;
    flex-direction: column;
    margin: 0 17px;

    p{
        font-size: 18px;
        line-height: 22px;
        margin-top: 8px;  

        color: #666666;
    }

`
const MyHabitBox = styled.div`
    width: 340px;
    min-height: 91px;
    position: relative;
    margin-bottom: 10px;

    background: #FFFFFF;
    border-radius: 5px;

    p{
        width: 300px;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        
        padding: 13px 0 8px 15px;
        word-wrap: break-word;

    }

    div{
        padding: 0 0 15px 14px;
    }

    ion-icon{
        position: absolute;
        top: 11px;
        right: 10px;

        :hover{
            cursor: pointer;
        }
    }
`

const HabitForm = styled.div`
    width: 340px;
    height: 180px;
    position: relative;
    margin-bottom: 20px;
    
    background: #FFFFFF;
    border-radius: 5px;

    display:flex;
    flex-direction: column;

    input{            
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        margin: 18px 18px 8px 18px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        font-size: 20px;
        line-height: 25px;
        color: #666666;

        :placeholder{
            font-size: 20px;
            line-height: 25px;        
            color: #DBDBDB;
        }
    }

    div{
        margin-left: 18px;
    }

`

const DayButton = styled.button`
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    margin-right: 4px;
        
    background-color: ${props => props.chosen ? '#CFCFCF' : '#FFFFFF' } ;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: ${props => props.chosen ? '#FFFFFF' : '#DBDBDB' };

    :hover{
        cursor: pointer;
    }
`

const Buttons = styled.div`
    position: absolute;
    right: 16px;
    bottom: 15px;
`
const CancelButton = styled.button`
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    border: none;
    background-color: #FFFFFF;
    color: #52B6FF;
    margin-right: 23px;

    &&:hover{
        cursor: pointer;
    }

`
const SaveButton = styled.button`
    width: 84px;
    height: 35px;
    background: #52B6FF;
    border-radius: 5px;
    padding: 0;

    font-size: 16px;
    line-height: 20px;
    text-align: center;
    
    color: #FFFFFF;
    
    div{
        width: 84px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items:center;
        margin: 0;
        
    }

    &&:hover{
        cursor: pointer;
    }
`