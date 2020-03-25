// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

const messageCon = document.querySelector(".message-container");

const name = prompt("What is your name?");

appendMessage(`${name} joined`);

socket.emit('new-user', name);

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

function setUserId({sID, message}) {
    console.log(message);
    vm.socketID = sID;
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageCon.append(messageElement);
}

function runDisconnectMesaage(packet) {
    console.log(packet);
}

function appendNewMessage(msg) {
    vm.messages.push(msg);
}

 const vm = new Vue({
    data: {
        socketID: "",
        messages: [],
        message: "",
        nickName: ""
    },

    methods: {
        dispatchMessage() {
            console.log('handling send message');

            socket.emit("chat_message", {
                name: this.nickName || "anonymous",
                content: this.message
            })

            this.message = ""
         }

     },

     
     components: {
         newmessage: ChatMessage
    },

    mounted: function() {
        console.log('mounted');
    }
 }).$mount("#app");


// sone event handling -? these event are coming from the server
socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnected', runDisconnectMesaage);
socket.addEventListener('new_message', appendNewMessage);
