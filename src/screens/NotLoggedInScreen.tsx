import React from "react";
import { useParams, Link } from "react-router-dom";

export const NotLoggedInScreen: React.FC<{}> = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>{`User ${username} not found`}</h1>
      <Link to="/">You must be logged in to access this page</Link>
    </div>
  );
};
