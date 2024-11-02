import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

function CodeEditor({ onCodeChange }) {
  const [code, setCode] = React.useState('// Start coding here');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    onCodeChange(newCode);
  };

  return (
    <div className="code-editor">
      <AceEditor
        mode="javascript"
        theme="github"
        onChange={handleCodeChange}
        name="code_editor"
        value={code}
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="500px"
      />
    </div>
  );
}

export default CodeEditor;