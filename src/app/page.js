// pages/index.js
'use client'
import SplitLayout from '@/components/SplitLayout';
import { useState } from 'react';
import EditorComponent from '../components/EditorComponent';
import LeftPanel from '../components/LeftPanel';


function renderTestCases() {
  const container = document.getElementById('testcases-container');
  container.innerHTML = '';
  testcases.forEach((testcase, index) => {
    const card = document.createElement('div');
    card.className = 'testcase-card';
    card.innerHTML = `
      <h3>Test Case ${index + 1}</h3>
      <pre>${testcase}</pre>
    `;
    container.appendChild(card);
  });
}

function renderTestCaseResults() {
  const container = document.getElementById('testcase-list');
  container.innerHTML = '';
  const sampleResults = [
    { passed: true, description: "Check if main branch is protected" },
    { passed: false, description: "Verify commit message format" },
    { passed: true, description: "Test CI/CD pipeline execution" },
    { passed: true, description: "Check code coverage above 80%" },
    { passed: false, description: "Ensure no sensitive data in commits" }
  ];
  sampleResults.forEach((result, index) => {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'testcase-result';
    resultDiv.innerHTML = `
      <span class="icon ${result.passed ? 'correct' : 'wrong'}">
        ${result.passed ? '✓' : '✗'}
      </span>
      <p>Test Case ${index + 1}: ${result.description}</p>
    `;
    container.appendChild(resultDiv);
  });
}

/* function initializeEditor() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/javascript");
  editor.setOptions({
    maxLines: Infinity
  });
} */


export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');

  const handleSubmission = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ githubUrl }),
    });

    // Handle response
    const data = await response.json();
    console.log(data);
  };

  const [code, setCode] = useState('// Write your code here');


  return (
    <div>
     {/*  <form onSubmit={handleSubmission}>
        <input
          type="text"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="GitHub Repository URL"
          required
        />
        <button type="submit">Deploy</button>
      </form>
 */}

        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <SplitLayout />
           
        </div>


    </div>
  );
}