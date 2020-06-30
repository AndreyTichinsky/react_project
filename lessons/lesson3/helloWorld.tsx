import React from "react";

interface Prop {
  username?: string;
}

export const HelloWorld: React.FC<Prop> = ({ username = "Andrey" }) => (
  <h1>Hello World, {username}!</h1>
);
