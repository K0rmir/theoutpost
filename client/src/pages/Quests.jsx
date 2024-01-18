import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Quests() {

    const [questInfo, setQuestInfo] = useState([]);
    const { id } = useParams();
   

    useEffect(() => {
        handleGetQuest();
    }, []);

    async function handleGetQuest() {
        const response = await fetch("http://localhost:8080/quest/${id}");
        const data = await response.json()

        setQuestInfo(data);
    }





    return (
        <>
        {questInfo.map((posts) => {
                return <h1 key={posts.id + posts.title}>{posts.title}</h1>
            
})}

        
        </>
    )
}