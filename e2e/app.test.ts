import "expect-puppeteer";

describe("App", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080");
  });

  it('should display "Please, enter your name:" text on page', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("Please, enter your name:");
  });
  it("login form should contain Guest default value", async () => {
    await expect(page).toFillForm('form[name="login"]', {
      username: "Guest",
    });
  });
  it("when fill username in form and submit then new page content this name in greeting", async () => {
    await expect(page).toFill('input[name="username"]', "Andrey");
    await expect(page).toFillForm('form[name="login"]', {
      username: "Andrey",
    });
    await expect(page).toClick("button", { text: "submit" });
    await expect(page).toMatch("Hello, Andrey!");
  });
});
