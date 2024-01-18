import {Link} from "react-router-dom";
export default function JobBoard({quests}) {



    return (
        <>
        <nav>
            {quests.map((posts) => {
                return <Link to={`/jobboard/${posts.id}`} key={posts.id + posts.title}>{posts.title}</Link>
            })}
        </nav>
        
        </>
    );
}