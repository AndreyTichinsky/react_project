import React from "react";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("./home"), {
  loading: () => <div>loading...</div>,
});

const App = (props: any) => (
  <div>
    <Home {...props} />
  </div>
);

export async function getServerSideProps() {
  return {
    props: {
      data: "success",
    },
  };
}

export default App;
