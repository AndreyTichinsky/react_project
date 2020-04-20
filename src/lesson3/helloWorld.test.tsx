import React from "react";
import { shallow, mount } from "enzyme";
import "../../internals/setupTests.ts";

import { HelloWorld } from "./helloWorld";

describe("HelloWorld render check", function () {
  it("Default render", function () {
    expect(
      shallow(<HelloWorld />).matchesElement(<h1>Hello World, Andrey!</h1>)
    ).toBe(true);
  });

  it("Default render with prop", function () {
    expect(
      shallow(<HelloWorld username="John Doe" />).matchesElement(
        <h1>Hello World, John Doe!</h1>
      )
    ).toBe(true);
  });
});
