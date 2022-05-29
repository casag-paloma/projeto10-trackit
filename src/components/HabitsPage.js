import { useState, useEffect, useContext } from "react";
import axios from 'axios'
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";
import TokenContext from '../contexts/TokenContext';

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

    function renderNewHabitsForm(){
        if(create){
            return(
                    <HabitForm>
                        <input disabled={loading} type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></input>
                        {myWeekdays}
                        <Buttons>
                            <CancelButton disabled={loading} onClick={()=> setCreate(false)}> Cancelar </CancelButton>
                            <SaveButton disabled={loading} onClick={submitNewHabit}> Salvar</SaveButton>
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
        console.log(response.data);

        const promise = axios.get(URL, config);
        promise.then(handleSucessGetList)
        promise.catch(handleError)
    }

    return(
        <Container>
            <Header/>
            <MyHabitsHeader>
                <h1> Essa é uma HabitsPage</h1>
                <button onClick={addNewHabit}> + </button>
            </MyHabitsHeader>
            <MyNewHabitForm>
                <div>{newHabitForm}</div>
            </MyNewHabitForm>
            <MyHabits>{myHabits}</MyHabits>
            <Menu/>
        </Container>
    )
}

function Day({name, id, chosenDays, setChosenDays, loading, isChosen}){
    const [chosen, setChosen] = useState(false);
    console.log(isChosen);

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
        <div>
            <p>{name}</p>
            {showDaysHabits()}
            <ion-icon name="trash-outline" onClick={() => deleteHabit(id)}></ion-icon>
        </div>
    )
}

export default HabitsPage;

const Container = styled.div`
    width: 100%;
    height:100%;
    background-color: #F2F2F2;;
`

const MyHabitsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 70px 18px 10px 18px;
    
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;

        color: #126BA5;
    }

    button{
        width: 40px;
        height: 35px;
    
        background: #52B6FF;
        border-radius: 5px;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 28px;
        line-height: 34px;
        text-align: center;

        color: #FFFFFF;
    }

`
const MyNewHabitForm = styled.div``

const MyHabits = styled.div`
`
const HabitForm = styled.div`
    background-color: red;

`

const DayButton = styled.button`
    box-sizing: border-box;
    width: 30px;
    height: 30px;
        
    background-color: ${props => props.chosen ? '#CFCFCF' : '#FFFFFF' } ;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    color: ${props => props.chosen ? '#FFFFFF' : '#DBDBDB' };
`

const Buttons = styled.div``
const CancelButton = styled.button``
const SaveButton = styled.button``