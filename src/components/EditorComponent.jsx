import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const EditorComponent = ({ code, onChange }) => {
    return (
        <AceEditor
            mode="javascript"
            theme="monokai"
            name="editor"
            editorProps={{ $blockScrolling: true, }}
            setOptions={{ enableBasicAutocompletion: true, enableLiveAutocompletion: true, enableSnippets: true,fontSize: "12pt" }}
            value={code}
            onChange={onChange}
            width="100%"
            height="100%"
            minLines={63}
            maxLines={Infinity} 
        />
    );
};

export default EditorComponent;