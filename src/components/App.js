import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react/";
import TokenContext from "../contexts/TokenContext";
import HabitsPage from "./HabitsPage";
import HistoryPage from "./HistoryPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodayPage from "./TodayPage";


function App(){

    const [token, setToken] = useState("");

    return(
        <TokenContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/cadastro" element={<SignUpPage/>}/>
                    <Route path="/habitos" element={<HabitsPage/>}/>
                    <Route path="/hoje" element={<TodayPage/>}/>
                    <Route path="/historico" element={<HistoryPage/>}/>
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}

export default App;