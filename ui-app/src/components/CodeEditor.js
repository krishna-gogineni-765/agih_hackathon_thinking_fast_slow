import React, { useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import debounce from 'lodash.debounce';

// Import Ace editor modes and themes
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

// Import the worker scripts
import 'ace-builds/src-noconflict/worker-javascript';

function CodeEditor({ onCodeChange }) {
  const [code, setCode] = React.useState('// Start coding here');
  const previousCodeRef = useRef(code);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const processCodeChange = React.useCallback(
    debounce((prevCode, newCode) => {
      const prevLines = prevCode.split('\n');
      const newLines = newCode.split('\n');

      let changedLineIndex = -1;
      let changedLineCode = '';

      for (let i = 0; i < newLines.length; i++) {
        if (newLines[i] !== prevLines[i]) {
          changedLineIndex = i;
          changedLineCode = newLines[i];
          break;
        }
      }

      if (changedLineIndex !== -1) {
        // Line has changed
        onCodeChange(newCode, changedLineCode);
      }

      previousCodeRef.current = newCode;
    }, 1500), // Debounce time in milliseconds
    [onCodeChange]
  );

  useEffect(() => {
    const prevCode = previousCodeRef.current;
    const newCode = code;

    processCodeChange(prevCode, newCode);
  }, [code, processCodeChange]);

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
        setOptions={{ useWorker: false }}
      />
    </div>
  );
}

export default CodeEditor;