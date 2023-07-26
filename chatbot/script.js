const APIkey = "b4d6d48f677c4dac83d2cc97fd5e0bff";
const ReqID = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
const projectName = "MIS-1";
const deploymentName = "MIS_QA";
const url = "https://chatrobot2.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";
const chatContainer = document.getElementById("chatContainer");
const inputMessage = document.getElementById("inputMessage");

function displayMessage(message, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.className = "message " + (isUser ? "question" : "answer");
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
  const message = inputMessage.value.trim();
  if (message === "") return;

  displayMessage(message, true);
  inputMessage.value = "";

  const payload = {
    kind: "Conversation",
    analysisInput: {
      conversationItem: {
        id: "1",
        text: message,
        modality: "text",
        participantId: "user1"
      }
    },
    parameters: {
      projectName: projectName,
      verbose: true,
      deploymentName: deploymentName,
      stringIndexType: "TextElement_V8"
    }
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": APIkey,
      "Apim-Request-Id": ReqID,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => {
      const topIntent = data.result.prediction.topIntent;
      displayMessage(topIntent, false);
    })
    .catch((error) => console.error("Error:", error));
}
