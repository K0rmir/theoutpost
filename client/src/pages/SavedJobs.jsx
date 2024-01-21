import {Link, Routes, Route, Outlet} from "react-router-dom";
import {useState, useEffect} from "react";

export default function SavedJobs() {
  const [savedQuests, setSavedQuests] = useState([]);

  useEffect(() => {
    handleGetSavedQuests();
  }, []);

  async function handleGetSavedQuests() {
    const response = await fetch("http://localhost:8080/myjobs");
    const data = await response.json();

    setSavedQuests(data);
  }

  return (
    <>
      <nav id="jobCardArea">
        {savedQuests.map((posts) => {
          return (
            <div id="jobCard">
              <h2>{posts.title}</h2>
            </div>
          );
        })}
      </nav>
      <Outlet />
    </>
  );
}
