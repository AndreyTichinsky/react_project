export const format = (line: string) => {
  return line
    .replace(/(\)|\(|!)/g, " $1 ")
    .replace(/(fib|cos|sin|tan)/gi, (match, p1) => ` ${p1.toLowerCase()} `)
    .replace(/\*{2}/g, "^ 2") // substitute ** operation with ^ 2
    .split(" ")
    .filter((el) => el !== "")
    .join(" ");
};
