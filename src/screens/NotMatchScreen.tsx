import React from "react";
import { Link } from "react-router-dom";

export const NotMatchScreen: React.FC<{}> = () => {
  return (
    <div>
      <h1>{`Page doesn't exist`}</h1>
      <Link to="/">Back to homepage</Link>
    </div>
  );
};
