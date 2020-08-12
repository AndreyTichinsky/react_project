import React, { Component } from "react";
import Link from "next/link";

type HomeProps = {
  data: string;
};

class Home extends Component<HomeProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <h2>status {this.props.data}</h2>
        <Link href="/info">
          <a>Info</a>
        </Link>
        <br />
        <Link href="/faq">
          <a>Blog</a>
        </Link>
      </div>
    );
  }
}

export default Home;
