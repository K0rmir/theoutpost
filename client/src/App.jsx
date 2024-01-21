import {Routes, Route, Link, Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import JobBoard from "./pages/JobBoard";
import Quests from "./pages/Quests";
import JobForm from "./components/JobForm";
import SavedJobs from "./pages/SavedJobs";
import "./App.css";
// import "./css/JobBoard.css";

export default function App() {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    handleGetQuests();
  }, []);
  // Function to call /quests API endpoint to FETCH all of the quests
  async function handleGetQuests() {
    const response = await fetch("http://localhost:8080/quests");
    const data = await response.json();

    setQuests(data);
  }

  return (
    <>
      <header id="welcome">
        <h1>
          Welcome to <a href="/">The Outpost</a> chum...
        </h1>
        <p>Need some work? Lookin' to make allies?</p>
        <p>Hit up the job board, see what's posted.</p>
        <p>Hell, even post up your own...</p>
      </header>
      <div id="jobBtns">
        <Link to="/jobboard">
          <button>Job Board</button>
        </Link>
        <Link to="/jobboard/jobform">
          <button>Post A Job</button>
        </Link>
        <Link to="/jobboard/myjobs">
          <button>My Jobs</button>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={""}></Route>
        <Route path="/jobboard" element={<JobBoard quests={quests} />} />
        <Route path="/jobboard/:id" element={<Quests />}></Route>
        <Route path="/jobboard/jobform" element={<JobForm></JobForm>}></Route>
        <Route
          path="/jobboard/myjobs"
          element={<SavedJobs></SavedJobs>}></Route>{" "}
      </Routes>
      <footer></footer>
    </>
  );
}
