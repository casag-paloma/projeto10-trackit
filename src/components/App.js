import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react/";
import GlobalStyle from "./globalStyles";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import PercentageContext from "../contexts/PercentageContext";
import HabitsPage from "./HabitsPage";
import HistoryPage from "./HistoryPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import TodayPage from "./TodayPage";


function App(){

    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [percentage, setPercentage] = useState("");

    return(
        <UserContext.Provider value={{user, setUser}}>
            <TokenContext.Provider value={{token, setToken}}>
            <PercentageContext.Provider value={{percentage, setPercentage}}>
                <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/cadastro" element={<SignUpPage/>}/>
                        <Route path="/habitos" element={<HabitsPage/>}/>
                        <Route path="/hoje" element={<TodayPage/>}/>
                        <Route path="/historico" element={<HistoryPage/>}/>
                    </Routes>
                </BrowserRouter>
            </PercentageContext.Provider>
            </TokenContext.Provider>
        </UserContext.Provider>
    )
}

export default App;