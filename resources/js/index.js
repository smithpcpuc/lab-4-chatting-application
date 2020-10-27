// Elements
const nameInput = document.getElementById("myName");
const myMessage = document.getElementById("myMessage");
const sendButton = document.getElementById("sendButton");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

async function updateMessages() {
   
    const messages = await fetchMessages();
    console.log(messages);

    let formattedMessages = "";
    messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
    });
    chatBox.innerHTML = formattedMessages;
}

updateMessages()

function sendMessages (username, text) {
    const newMessage = {
        sender: username,
        text: text,
        timestamp: new Date()
    }

fetch(serverURL, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMessage)
    });
}

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}
 function formatMessage(message, myName) {
     const time = new Date(message.timestamp);
     const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

     if (myName === message.sender) {
         return `
         <div class="mine messages">
             <div class="message">
                 ${message.text}
             </div>
             <div class="sender-info">
                 ${formattedTime}
             </div>
         </div>
         `
     } else {
         return `
             <div class="yours messages">
                 <div class="message">
                     ${message.text}
                 </div>
                 <div class="sender-info">
                     ${message.sender} ${formattedTime}
                 </div>
             </div>
         `
     }
 }
 
 sendButton.addEventListener("click", function(sendButtonClickEvent) {
    sendButtonClickEvent.preventDefault();
    const sender = nameInput.value;
    const message = myMessage.value;

    sendMessages(sender,message);
    myMessage.value = "";
});