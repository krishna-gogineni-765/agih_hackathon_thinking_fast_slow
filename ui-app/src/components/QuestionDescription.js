// QuestionDescription.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuestionDescription() {
  const [question, setQuestion] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/get-question');
        setQuestion(response.data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, []);

  return (
    <div className="question-description">
      <h2>{question.title}</h2>
      <div
        className="question-content"
        dangerouslySetInnerHTML={{ __html: question.description }}
      />
    </div>
  );
}

export default QuestionDescription;