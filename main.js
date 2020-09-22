    import React, { Component } from 'react';
    import { Smile } from 'react-feather';

    
  
     
    

    const form = document.querySelector("form");
    const input = document.querySelector(".input");
    const messages = document.querySelector(".messages");
    const username = prompt("Please enter a nickname: ", "");
    const socket = io();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        addMessage(username + ": " + input.value);

        socket.emit("chat_message", {
            message: input.value
        });

        input.value = "";
        return false;
    }, false);

    

    socket.on("chat_message", function(data) {
        addMessage(data.username + ": " + data.message);
    });

    socket.on("user_join", function(data) {
        addMessage(data + " just joined the chat!");
    });

    socket.on("user_leave", function(data) {
        addMessage(data + " has left the chat.");
    });

    addMessage("You have joined the chat as '" + username  + "'.");
    socket.emit("user_join", username);

    function addMessage(message) {
        const li = document.createElement("li");
        li.innerHTML = message;
        messages.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);
    }

    socket.on("typing", function (data) {
        const { isTyping, user } = data;
      
        if (!isTyping) {
          fallback.innerHTML = "";
          return;
        }
      
        fallback.innerHTML = `<p>${user} is typing...</p>`;
      });

      export default main;