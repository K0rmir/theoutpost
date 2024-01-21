import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "../css/Quests.css";

export default function Quests() {
  const [questInfo, setQuestInfo] = useState({});
  const {id} = useParams();

  useEffect(() => {
    handleGetQuest();
  }, []);

  async function handleGetQuest() {
    const response = await fetch(
      `https://the-outpost.onrender.com/quest/${id}`
    );
    const data = await response.json();

    setQuestInfo(data);
  }

  async function handleAcceptQuest() {
    const response = await fetch(
      `https://the-outpost.onrender.com/quest/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return (
    <>
      <div id="jobContent">
        <h1>{questInfo.title}</h1>
        <p>{questInfo.name}</p>
        <h3>{questInfo.content}</h3>
        <p>Difficulty: {questInfo.type}</p>
      </div>
      <div id="jobBtns">
        <button
          onClick={() => {
            handleAcceptQuest();
            window.location.href = "https://theoutpost.onrender.com/jobboard";
          }}>
          Accept
        </button>
        <Link to={`/jobboard`}>
          <button>Decline</button>
        </Link>
      </div>
    </>
  );
}
