import React from 'react';
import './App.css';
import QuestionDescription from './components/QuestionDescription';
import CodeEditor from './components/CodeEditor';
import ChatInterface from './components/ChatInterface';

function App() {
  const [chatMessages, setChatMessages] = React.useState([]);

  const handleCodeChange = async (code) => {
    // Mock API call to get AI response
    const response = await fetchAIResponse(code);
    setChatMessages((prevMessages) => [...prevMessages, response]);
  };

  const fetchAIResponse = async (code) => {
    // Simulate backend processing
    // In a real app, you'd use axios or fetch to call your backend API
    // For this example, we'll return a mock response
    return {
      sender: 'ai',
      message: `Here's a hint based on your code: ${code.slice(-20)}`,
    };
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