import Modal from './Modal';
import { useState } from 'react';

const ItemWithModal = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    console.log("res : ",data);

    function stripAnsi(str) {
        const ansiRegex = /\x1b\[[0-9;]*m/g;
        return str.replace(ansiRegex, '');
      }
    
       const stripAnsi1 = (message) => {
    
        const strippedMessage = stripAnsi(message);
        //console.log("strippedMessage : ",strippedMessage);
        // Adjusted Regex pattern to correctly extract details
      const pattern = /Error: ([\s\S]+?)\n\nLocator: ([\s\S]+?)\nExpected string: "([\s\S]+?)"\nReceived string: "([\s\S]+?)"/;
      
      const matches = strippedMessage.match(pattern);
      let rest = {};
      if (matches) {
        rest = {
          errorDescription: matches[1].trim(),
          locator: matches[2].trim(),
          expectedString: matches[3],
          receivedString: matches[4]
        };
    }
    
      console.log(JSON.stringify(rest));
        return rest;
      }
  
    return (
      <>
                    <div className="testcase-result">
                                <span className={`icon ${data.status==='passed' ? 'correct' : 'wrong'}`}>
                                    {data.status==='passed' ? '✓' : '✗'}
                                </span>
                                    <p><b>    Test Case :    </b>{JSON.stringify(data.name)}</p>
                                    {data.status==='passed' ? '' : <div>
                                    <button onClick={() => setShowModal(true)}>View</button>
                                    <Modal show={showModal} onClose={() => setShowModal(false)} children={stripAnsi1(data.message)} />
        
    </div>}
                                </div>
      </>
    );
  };


  export default ItemWithModal