import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Menu from "./Menu";

function HabitsPage(){

    const [ create, setCreate] = useState(false);
    const [ habitName, setHabitName] = useState('');
    const [ chosenDays, setChosenDays] = useState([]);
    const [ loading, setLoading ] = useState(false);

    function renderNewHabit(){
        setCreate(true);
    }

    function renderWeekDays(){

        const weekdayslist = ['D', 'S', 'T', 'Q', 'Q', 'S','S']
        
        return(
            <>
                {weekdayslist.map((iten, index) => < Day key={index} name={iten} id={index} chosenDays={chosenDays} setChosenDays={setChosenDays} />)}
            </>
        )
    };

    const myWeekdays = renderWeekDays();
    
    function renderHabits(){
        return(
            <>
                <HabitForm>
                    <input type="text" placeholder="nome do hábito" value={habitName} onChange={(e) => setHabitName(e.target.value)}></input>
                    {myWeekdays}
                    <Buttons>
                        <CancelButton loading={loading}> Cancelar </CancelButton>
                        <SaveButton loading={loading} onClick={submitNewHabit}> Salvar</SaveButton>
                    </Buttons>

                </HabitForm>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </>
        )
    };

    const myHabits = renderHabits();

    function submitNewHabit(){
        setLoading(true);
    }

    return(
        <Container>
            <Header/>
            <MyHabitsHeader>
                <h1> Essa é uma HabitsPage</h1>
                <button onClick={renderNewHabit}> + </button>
            </MyHabitsHeader>
            <MyHabits>{myHabits}</MyHabits>
            <Menu/>
        </Container>
    )
}

function Day({name, id, chosenDays, setChosenDays}){
    const [chosen, setChosen] = useState(false);
    
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
        <DayButton chosen={chosen} onClick={()=> chooseDay(id)}>{name}</DayButton>
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

const MyHabits = styled.div`
    background-color: green;
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