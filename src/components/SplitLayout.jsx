// SplitLayout.js
import React, { useState, useRef, useCallback, useEffect } from 'react';
import LeftPanel from './LeftPanel';
// import { useFormData } from './contexts/FormDataContext';
import MainContent from './MainContent';

export default function SplitLayout() {
    const [isDragging, setIsDragging] = useState(false);
    const [leftWidth, setLeftWidth] = useState(725); // Initial width of the left panel
    const startPos = useRef(0);
    const leftPanelRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null); // To store the result from API

    // const { formData, updateApiResult } = useFormData();

    const [url, setUrl] = useState('https://tsrikanthreddy.com');



   /*  const onAddTestCase = async (testCasesContent) => {
        setIsLoading(true);
        try {
          
    
          
            console.log("TESTTSTST")

          // Handle success
          handleSubmit();
          //console.log('Test case saved successfully');
        } catch (error) {
            alert('Failed to save test case');
          console.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }; */

      const onAddTestCase = async (testCasesContent) => {
        //e.preventDefault();
        const { code, githubUrl } = testCasesContent;
        setIsLoading(true);
        
        try {
          const response = await fetch('/api/evaluate', { // Assuming '/api/evaluate' is your API endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                githubUrl,
            }),
          });
    
          // Assuming the response contains a JSON with some result data
          const data = await response.json();
    
          // Update the state with the result to display it
          setResult(data.message);
          setUrl(data.fetchedUrl);
    
          //console.log("Result:", result);
        } catch (error) {
          console.error("Error submitting test cases:", error);
          setResult({ error: "Failed to evaluate the GitHub URL and test cases." });
        }
        setIsLoading(false);
      };
    


    const startDragging = useCallback((e) => {
        e.preventDefault();
        startPos.current = e.clientX;
        setIsDragging(true);
    }, []);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onMouseMove = useCallback(
        (e) => {
            if (!isDragging) return;
            const newWidth = leftWidth + (e.clientX - startPos.current);
            if (newWidth > 100 && newWidth < window.innerWidth - 100) {
                setLeftWidth(newWidth);
                startPos.current = e.clientX;
            }
        },
        [isDragging, leftWidth]
    );

    // Setup event listeners for mouse move and mouse up
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', stopDragging);
            return () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', stopDragging);
            };
        }
    }, [isDragging, onMouseMove, stopDragging]);

    return (
        <>
         
        <div style={{ display: 'flex', height: '100%' }}>
            <div
                ref={leftPanelRef}
                style={{ width: `${leftWidth}px`, backgroundColor: '#f0f0f0' }}
            >
                <LeftPanel onAddTestCase={onAddTestCase} width={leftWidth} loading={isLoading}/>
            </div>
            <div
                onMouseDown={startDragging}
                style={{
                    cursor: 'ew-resize',
                    width: '10px',
                    backgroundColor: '#ccc',
                }}
            />
            
        </div>
        <div >{isLoading ? <div className="browser">Evaluating Test Cases...<div className="loader"></div></div> : result!==null ? (
        <MainContent result={result} url={url} loading={isLoading}/>
      ):(
        <MainContent url='https://tsrikanthreddy.com' loading={isLoading}/>
                )}</div>
        </>
    );
}