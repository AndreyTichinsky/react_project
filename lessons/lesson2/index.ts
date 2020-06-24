import { createInterface } from "readline";
import { format } from "./format";
import { calculator } from "./calculator";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      const result = calculator(format(answer));

      if (result) {
        console.log(`Result: ${result}`);
      }

      resolve();
    });
  });

async function app(): Promise<null> {
  for (;;) {
    await question();
  }
}

app();
