import React from 'react';

function ChatInterface({ messages }) {
  return (
    <div className="chat-interface">
      <h3>AI Assistant</h3>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'ai' ? 'ai-message' : 'user-message'}`}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatInterface;