// pages/api/testcase.js

import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';

export  async function POST(req) {
    try {
      const body = await req.json();
      const { testCasesContent } = body;


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
      let testCases = testScript + testCasesContent;

      fs.writeFile(filePath, testCases, (err) => {
        if(err) {
          console.log("Hello Testcase API POST : ",err);

          const result = {
            success: false,
            message: "Failed to save the file."+ err.message,
          };
          return NextResponse.json(result, { status: 500,});
        }
        const result = {
          success: true,
          message: "Test case saved successfully.",
        };
        return NextResponse.json(result, { status: 200,});
      });
      const result = {
        success: true,
        message: "Test case saved successfully.",
      };
      return NextResponse.json(result, { status: 200,});
    } catch (error) {
      console.log("Hello Testcase API POST : ",error.message);

      const result = {
        success: false,
        message: error.message,
      };
      return NextResponse.json(result, { status: 500,});

    }
}
