import React, { Component } from "react";
import Link from "next/link";

class Info extends Component {
  render() {
    return (
      <div>
        <h1>Chewbacca page</h1>
        <Link href="/info">
          <a>Back to info</a>
        </Link>
      </div>
    );
  }
}

export default Info;
