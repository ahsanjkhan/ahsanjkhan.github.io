const socket = io.connect("https://157.245.9.192:3000", {transports: ['websocket']});

let registered = false;
let myname = "";


socket.on("dm", receivedDM);

let chosen = false;
let toSend = "";
var myDiv1;
var myDiv2;


function func(){
    document.getElementById('to_div').style.display = 'none';
    document.getElementById("message_div").style.display='none';
}


function receivedDM(dataSent) {
    let message = JSON.parse(dataSent);
    console.log(message);
    let chatElement = document.getElementById("chat_history");
    let formattedMessage = "<b>" + message['from'] + "</b>: " + message['message'] + "<br/>";
    chatElement.innerHTML = chatElement.innerHTML + formattedMessage;
}

function register() {
    let username = document.getElementById("username").value;
    myname = username;
    socket.emit("register", username);
    document.getElementById("username_div").innerHTML = "";
    document.getElementById("to_div").style.display="";
    document.getElementById("message_div").style.display="";
    registered = true;
}

function sendMessage() {  //current msg would have to be in this format -> {"to":"usernameToSendTo", "message":"messageToSend"}
    if (registered) {
        let from = "";
        if (!chosen){
            from = document.getElementById("chat_recipient").value;
            toSend = from;
            chosen = true;
        }
        else{
            from = toSend;
        }
        console.log(myname);
        let message = document.getElementById("message_input").value;
        document.getElementById("message_input").value = "";
        let send = JSON.stringify({"to": from, "message": message,"from":myname});
        document.getElementById("chat_history").innerHTML = document.getElementById("chat_history").innerHTML + "<b>" + "Me" + "</b>: " + message + "<br/>";
        socket.emit("direct_message", send);
        document.getElementById("to_div").innerHTML = "";
    }
}
