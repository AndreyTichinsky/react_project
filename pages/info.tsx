import React, { Component } from "react";
import Link from "next/link";

class Info extends Component {
  render() {
    return (
      <div>
        <h1>Info page</h1>

        <Link href="/">
          <a>Back to home</a>
        </Link>
        <br />
        <Link href="/members/chewbacca">
          <a>Chewbacca</a>
        </Link>
        <br />
        <Link href="/members/han_solo">
          <a>Han Solo</a>
        </Link>
      </div>
    );
  }
}

export default Info;
