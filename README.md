### Puppeteer Code to Log into the ETHz Moodle

```ts
import puppeteer from 'puppeteer';

// 1. RUNS BOT
// 2. EXTRACTS DATA
// 3. RETURNS ALL ASSIGNMENTS
export default async function BOT() {
  const browser = await puppeteer.launch({ devtools: true });

  const page = await browser.newPage();

  await page.goto('https://moodle-app2.let.ethz.ch/my/');

  // Make sure the page is loaded in a PC layout 
  // and no funky mobile CSS rendering.
  await page.setViewport({width: 1080, height: 1024});

  // Wait until university select screen is loaded.
  const shibbolethBodyId = '#page-auth-shibboleth-login';
  await page.waitForSelector(shibbolethBodyId);
  
  // Select the university we are attending. (ETHz)
  await page.select('#idp', 'https://aai-logon.ethz.ch/idp/shibboleth')

  // Click 'Select' button.
  const button = await page.waitForSelector('div ::-p-text(Select)');
  await button?.click();

  // Wait until ETH login screen is loaded.
  const ethLoginBodyId = '#corp';
  await page.waitForSelector(ethLoginBodyId);

  const usernameInput = await page.waitForSelector("#username");
  const passwordInput = await page.waitForSelector("#password");

  // Fill in username & password.
  await usernameInput?.type("<BRUH>");
  await passwordInput?.type("<BRUH>");

  // Press login button.
  const loginButton = await page.waitForSelector('.form-buttons > button');
  await loginButton?.click();

  // Wait for Moodle
  await page.waitForSelector("");

  // Now presenting: 𝓽𝓱𝓮 𝓭𝓲𝓼𝓰𝓾𝓼𝓽𝓲𝓷𝓰 𝓱𝓪𝓻𝓭𝓬𝓸𝓭𝓲𝓷𝓰 𝓹𝓪𝓻𝓽 

  const pprogAssignments = [];

  // PPROG 
  await page.goto("https://moodle-app2.let.ethz.ch/course/view.php?id=22281");
  await page.waitForSelector("#section-2 > .section");

  // ... keep going

  await browser.close();
}

// DEBUG
BOT();

```
