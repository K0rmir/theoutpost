import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import JobBoard from "./pages/JobBoard"
import Quests from "./pages/Quests";



export default function App() {

    const [quests, setQuests] = useState([]);

    useEffect(() => {
        handleGetQuests();
    }, []);
// Function to call /quests API endpoint to FETCH all of the quests
    async function handleGetQuests() {
        const response = await fetch("http://localhost:8080/quests");
        const data = await response.json()

        setQuests(data);
    }

    return (
        <>
        <h1>Welcome to <a href="/">The Outpost</a>, chum...</h1>
        <Link to="/jobboard">Job Board</Link>

        <Routes>
            <Route path="/" element={""}></Route>
            <Route path="/jobboard" element={<JobBoard quests={quests} />}/>
            <Route path="/jobboard/:id" element={<Quests />}></Route>
        </Routes>

        
        </>


    )
}