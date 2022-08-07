import puppeteer from "puppeteer";
import accounts from "./accounts.json";

const url = "https://io.scelgozero.it/auth.html#/login/";
const username = accounts[0].username;
const password = accounts[0].password;

const loginInputSelector = "form input[type='text']";
const pswInputSelector = "form input[type='password']";
const submitSelector = "form button[type='submit']";

const giftWaitingToBeActivatedSelector = ".GTM-gift-unlock";
const giftArchiveSelector = ".gift-archive";
const giftItemSelector = giftArchiveSelector + " .gift-item"; //they can be more than one
const giftInProgressSelector = ".gift-progress";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  // wait for submit button
  await page.waitForSelector(submitSelector);
  //type user
  await page.type(loginInputSelector, username);
  //type password
  await page.type(pswInputSelector, password);
  // submit form
  await page.click(submitSelector);

  await browser.close();
})();
