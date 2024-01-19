import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Quests() {

    const [questInfo, setQuestInfo] = useState({});
    const { id } = useParams();
   

    useEffect(() => {
        handleGetQuest();
    }, []);

    async function handleGetQuest() {
        const response = await fetch(`http://localhost:8080/quest/${id}`);
        const data = await response.json()

        setQuestInfo(data);
        console.log(questInfo);
    }

    console.log(questInfo.content);





    return (
        <>
         <h1>{questInfo.title}</h1>
         <h3>{questInfo.content}</h3>
         <p>{questInfo.type}</p>
         <p>{questInfo.name}</p>

        
        </>
    )
}