import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Quests() {
  const [questInfo, setQuestInfo] = useState({});
  const {id} = useParams();

  useEffect(() => {
    handleGetQuest();
  }, []);

  async function handleGetQuest() {
    const response = await fetch(`http://localhost:8080/quest/${id}`);
    const data = await response.json();

    setQuestInfo(data);
  }

  return (
    <>
      <h1>{questInfo.title}</h1>
      <p>{questInfo.name}</p>
      <h3>{questInfo.content}</h3>
      <p>Difficulty: {questInfo.type}</p>
    </>
  );
}
