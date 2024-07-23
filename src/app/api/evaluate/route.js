// pages/api/evalate.js

import { NextResponse, NextRequest } from "next/server";
const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
import { readFile } from 'fs/promises';
import fs from 'fs';


export  async function POST(req) {
    try {
      const body = await req.json();
      const { githubUrl, code } = body;

      console.log("Test GITHUB URL : ",githubUrl);

      const filePath = "./tests/TestCase.spec.js"; // Define the path
      // Write the content to the file
      //Append content to the file
      
      const testScript = `const { test, expect } = require('@playwright/test');
      const urlToTest = require('./urlToTest.js');
      test.beforeEach(async ({ page }) => {
        const fetchedUrl = urlToTest;
        await page.goto(fetchedUrl);
      });
      
      `;
      let testCases = testScript + code;

      fs.writeFile(filePath, testCases, (err) => {
        if(err) {
          console.log("Hello Testcase API POST : ",err);

          const result = {
            success: false,
            message: "Failed to save the file."+ err.message,
          };
          return NextResponse.json(result, { status: 500,});
        }
        
      });

      //console.log("Hello Evaluate API POST : ",githubUrl);
      const fetchedUrl = await scrapeSandboxAddress(githubUrl);
      //console.log("Hello Evaluate API POST : ",fetchedUrl);
      const message = await main(fetchedUrl);
      //console.log("Hello Evaluate API POST : ",message);

      const result = {
        success: true,
        githubUrl: githubUrl,
        fetchedUrl: fetchedUrl,
        message: message,
      };
      return NextResponse.json(result, { status: 200,});
    } catch (error) {
      const result = {
        success: false,
        message: error.message,
      };
      return NextResponse.json(result, { status: 500,});

    }
}


export async function GET() {
    try {
      console.log("Hello Evaluate API GET");
      const result = {
        message: "Container started",
      };
      return NextResponse.json(result, { status: 200,});
    } catch (error) {
      //res.setHeader('Allow', ['GET']);
      return NextResponse.json(`Method ${NextRequest.method} Not Allowed`, { status: 405,});

    }
  };


  // Function to take a GitHub URL, modify it for CodeSandbox, and scrape the needed address
async function scrapeSandboxAddress(githubUrl) {
  // Modify the GitHub URL to match the CodeSandbox URL pattern
  const modifiedUrl = githubUrl.replace('https://github.com', 'https://githubbox.com');

  // Launch a headless browser
  const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser', // Path to the installed Chromium.
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  const page = await browser.newPage();

  try {
      // Navigate to the modified URL
      await page.goto(modifiedUrl, { waitUntil: 'networkidle2' });

      // Wait for the specific input element to be rendered and get its value
      const selector = 'input[aria-label="Address Bar Input"]';
      console.log('Test :', selector);
      await new Promise(r => setTimeout(r, 5000));
      await page.waitForSelector(selector);
      const addressValue = await page.$eval(selector, el => el.value);

      console.log('Scraped Address:', addressValue);
      return addressValue;
  } catch (error) {
      console.error('Error scraping the address:', error);
  } finally {
      await browser.close();
  }
}

// Main function to fetch URL and run Playwright tests
async function main(fetchedUrl) {
  //const fetchedUrl = await scrapeSandboxAddress(githubUrl);

  // Assuming the fetched URL is now dynamically injected into your Playwright test
  // This line writes the fetchedUrl to a temporal JS file to be required in your test
  require('fs').writeFileSync('./tests/urlToTest.js', `module.exports = "${fetchedUrl}";`);

  try {
    // Run Playwright tests with npx command
    // Ensure your terminal command is correctly pointing to the test files
     execSync('npx playwright test', { encoding: 'utf-8' });
    //console.log("---->",result.toString);
    let data = JSON.parse(await readFile("./ctrf/ctrf-report.json", "utf8"));
    //console.log("---->",data.results);
    return data.results.tests;
  } catch (error) {
    console.error('Error occurred running Playwright tests:', error.message);
    let data = JSON.parse(await readFile("./ctrf/ctrf-report.json", "utf8"));
    //console.log("---->",data.results);
    return data.results.tests;
  }
}

