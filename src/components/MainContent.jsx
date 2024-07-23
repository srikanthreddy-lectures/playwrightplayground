// components/MainContent.js
import React, { useState } from 'react';
import PreviewBrowser from 'embedded-react-browser';
import ItemWithModal from '../components/ItemWithModal';
import Temp from '../components/temp';




function MainContent(data) {
  const { url, result, loading } = data;
  //console.log("url1 : ",url);
 // console.log("result1 : ",result);
  // State for storing the GitHub URL and test cases
  //const [githubUrl, setGithubUrl] = useState('');
  //const [testCases, setTestCases] = useState([]);
  const [result1, setResult1] = useState(result); // To store the result from API
  const [isLoading, setIsLoading] = useState(loading);
  const [url1, setUrl1] = useState(url);
  //console.log("URL-MAIN : ",url1);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  /* // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Sample test case to be sent; you might want to gather these in a different manner
    setTestCases(prevTestCases => [...prevTestCases, "Sample test case"]);

    try {
      const response = await fetch('/api/evaluate', { // Assuming '/api/evaluate' is your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubUrl,
          testCases,
        }),
      });

      // Assuming the response contains a JSON with some result data
      const data = await response.json();

      // Update the state with the result to display it
      setResult(data.message);
      setUrl(data.fetchedUrl);

      console.log("Result:", result);
    } catch (error) {
      console.error("Error submitting test cases:", error);
      setResult({ error: "Failed to evaluate the GitHub URL and test cases." });
    }
    setIsLoading(false);
  }; */

 /*  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Sample test case to be sent; you might want to gather these in a different manner
    setTestCases(prevTestCases => [...prevTestCases, "Sample test case"]);

    try {
      const response = await fetch('/api/evaluate', { // Assuming '/api/evaluate' is your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          githubUrl,
          testCases,
        }),
      });

      // Assuming the response contains a JSON with some result data
      const data = await response.json();

      // Update the state with the result to display it
      setUrl(data.fetchedUrl);
      setResult(data.message);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error submitting test cases:", error);
      setResult({ error: "Failed to evaluate the GitHub URL and test cases." });
    }
    setIsLoading(false);
  }; */

  

  return (
    <div>
    <div className="main-content">
         <h1>FSDMERN Project Evaluator - Teacher Mode</h1>
         
        {/* <div className="container">
            <div>
            <form onSubmit={handleSubmit}>
                <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="Enter GitHub repository URL"
                required
                />
                {isLoading ? (
        <div className="loader"></div>  // Show loader when isLoading is true
      ):(
                <button type="submit">Evaluate Test Cases</button>
                )}
            </form>
            </div>
            
       </div>  */}
       
        <div id="testcases-results">
            <h2>Test Case Results</h2>
            <div id="testcase-list">
                { result && result.map((res, index) => 
                    {
                      return <ItemWithModal key={index} data={res} /> 
                    })
                }
            </div>
        </div>
    </div>

    

    <div className="browser">

    {/* <PreviewBrowser url={url} theme="dark" /> */}



     {url1 ? (
    <iframe
        src={url}
        frameBorder="0"
        style={{ width: '100%', height: '100%' }}
        allow="autoplay; encrypted-media"
        allowFullScreen
    ></iframe>
    ) : (
    <p>{console.log("URL", url1)}</p>
    )} 
  </div>
</div>
  );
};

export default MainContent;