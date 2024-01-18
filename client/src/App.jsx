import { Routes, Route, Link} from "react-router-dom";
import JobBoard from "./pages/JobBoard"



export default function App() {

    return (
        <>
        <h1>Welcome to <a href="/">The Outpost</a>, chum...</h1>
        <Link to="/jobboard">Job Board</Link>

        <Routes>
            <Route path="/" element={""}></Route>
            <Route path="/jobboard" element={<JobBoard />}/>
        </Routes>

        
        </>


    )
}