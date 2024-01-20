import {Link, Routes, Route, Outlet} from "react-router-dom";
import "../css/JobBoard.css";

export default function JobBoard({quests}) {
  return (
    <>
      <nav id="jobCardArea">
        {quests.map((posts) => {
          return (
            <Link to={`/jobboard/${posts.posts_id}`} key={posts.title}>
              <div id="jobCard">
                <h2>{posts.title}</h2>
                <p>{posts.name}</p>
                <p>{posts.type}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      <Outlet />
    </>
  );
}
