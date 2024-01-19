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
    }





    return (
        <>
         <h1 key={questInfo.id}>{questInfo.title}</h1>
         <h3 key={questInfo.id}>{questInfo.content}</h3>

        
        </>
    )
}