import {Link, Routes, Route, Outlet} from "react-router-dom";
export default function JobBoard({quests}) {



    return (
        <>
        <nav>
            {quests.map((posts) => {
                return <Link to={`/jobboard/${posts.posts_id}`} key={posts.title}>{posts.title}</Link>
            })}            
        </nav>
        <Outlet/>
        
        </>
    );
}