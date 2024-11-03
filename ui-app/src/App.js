// App.js
import React from 'react';
import './App.css';
import QuestionDescription from './components/QuestionDescription';
import CodeEditor from './components/CodeEditor';
import ChatInterface from './components/ChatInterface';
import axios from 'axios';

function App() {
  const [chatMessages, setChatMessages] = React.useState([]);

  const handleCodeChange = async (currentCode, changedLineCode) => {
    const response = await fetchAIResponse(currentCode, changedLineCode);
    setChatMessages((prevMessages) => [...prevMessages, response]);
  };

  const fetchAIResponse = async (currentCode, changedLineCode) => {
    try {
      const response = await axios.post('http://127.0.0.1:3001/generate-hint', {
        current_code: currentCode,
        changed_line_code: changedLineCode,
      });
      return {
        sender: 'ai',
        message: response.data.hint,
      };
    } catch (error) {
      console.error(error);
      return {
        sender: 'ai',
        message: 'Error generating hint.',
      };
    }
  };

  return (
    <div className="app-container">
      <div className="question-container">
        <QuestionDescription />
      </div>
      <div className="code-chat-container">
        <CodeEditor onCodeChange={handleCodeChange} />
        <ChatInterface messages={chatMessages} />
      </div>
    </div>
  );
}

export default App;