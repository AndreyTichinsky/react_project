import React, { Component } from "react";
import Link from "next/link";

class Faq extends Component {
  render() {
    return (
      <div>
        <h1>FAQ</h1>

        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    );
  }
}

export default Faq;
