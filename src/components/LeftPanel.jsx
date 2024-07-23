import EditorComponent from "./EditorComponent";
import { useState } from 'react';
//import { useFormData } from '../context/formDataContext';



const LeftPanel = ({ onAddTestCase,width,loading }) => {
    const [code, setCode] = useState(`test('<Title>', async ({ page }) => {

    // Write your test cases here
    //await expect(page).toHaveTitle("Jane Doe"); // Assuming you are looking for a specific title
        
});`);

const [githubUrl, setGithubUrl] = useState('');
 // const [testCases, setTestCases] = useState([]);
 // const [result, setResult] = useState(null); // To store the result from API
  const [isLoading, setIsLoading] = useState(loading);

//   const { updateFormData } = useFormData();
   //const [input, setInput] = useState('');



const handleAddTestCase = () => {
    setIsLoading(true);

    const data = {
        code : code,
        githubUrl : githubUrl,
        loading : isLoading
    }
    onAddTestCase(data); // This prop function will handle the API call
    setIsLoading(false);
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ input }); // Ideally, the structure of your data
  }; */

  /* const handleSubmit = async (e) => {
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


    return (
        <div id="leftPanel" style={{
            width: {width}, 
            color: 'white', 
            padding: '1rem', 
            display: 'flex', 
            flexDirection: 'column', 
            transition: 'width 0.3s ease'
        }}>
            {/* Placeholder for the actual content you want to have in your LeftPanel */}
            <h1>FSDMERN Project Evaluator - Teacher Mode</h1>
                <div className="container">
                    <div>
                    
                        <input
                        type="url"
                        value={githubUrl}
                         onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="Enter GitHub repository URL"
                        required
                        />
                        
                    </div>
                    {isLoading ? (
                <div className="loader"></div>  // Show loader when isLoading is true
            ):(
                <button onClick={handleAddTestCase} disabled={!code.trim()}>Evaluate Test Cases</button>
                )}

                <div id="editor">
                    <EditorComponent code={code} onChange={newCode => setCode(newCode)} />
                </div>
                    
            </div> 

                

            
                
            {/* Render more things here as needed */}
        </div>
    );
  };

  export default LeftPanel;
