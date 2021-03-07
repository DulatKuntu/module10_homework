const url = "wss://echo.websocket.org/";
let open_btn = document.querySelector(".open_connect");
let info_out = document.querySelector(".info_output");
let chat_out = document.querySelector(".chat_output");
let btn_send = document.querySelector(".btn_send");
let btn_geo = document.querySelector(".btn_geo");

let socket
console.log(open_btn)
open_btn.addEventListener("click", function() {
    socket = new WebSocket(url);
    socket.onopen = () => {
        document.querySelector(".chat_input").style.visibility ="visible";
        open_btn.style.display = "none";
        info_out.innerText = "Соединение установлено";
    }
    socket.onmessage = (event) => {
        let isLink = "www.openstreetmap.org"; // простой regex для поиска эхо ссылки
        let response = event.data
        if (!response.includes(isLink)) {
            writeToChat(response, true);
        };
        
    }
    socket.onerror = () => {
        info_out.innerText = "При передаче данных произошла ошибка";
    }
})
btn_send.addEventListener("click", function() {
    let chat = document.querySelector(".chat_input-field")
    if (!chat.value) {
        return
    }    
    socket.send(chat.value);
    writeToChat(chat.value, false);
    console.log(chat.value)
    chat.value = '';


})

function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chat_out.innerHTML += messageHTML;
}


btn_geo.addEventListener("click", function() {
    if (!navigator.geolocation) {
        info_out.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let mapLink = document.createElement("a");
        let geo_url = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.href = geo_url;
        mapLink.textContent = "Моя локация";
        socket.send(geo_url);
        writeToChat(mapLink.outerHTML, false)
    });
  }
})