const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add a message to the chat log
function addMessage(message, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);
  chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the latest message
}

// Function to fetch responses from the OpenAI API
async function fetchPrintingResponse(userMessage) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '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'; // Replace with your OpenAI API key

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Use GPT-4
        messages: [
          { role: "system", content: "You are a helpful assistant that provides creative ideas and solutions for printing technologies." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content; // Extract the response text
  } catch (error) {
    console.error('Error fetching response:', error);
    return "Sorry, I couldn't fetch a response. Please try again later.";
  }
}

// Function to handle user input
async function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, true);
    userInput.value = ''; // Clear input field

    // Fetch and display bot response
    const botResponse = await fetchPrintingResponse(userMessage);
    addMessage(botResponse, false);
  }
}

// Event listeners
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleUserInput();
});