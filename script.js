const loginUser = "https://mock-api.driven.com.br/api/v6/uol/participants ";
const loginStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
const messagens = "https://mock-api.driven.com.br/api/v6/uol/messages";

let mensagemRecebida = {from: "",to: "",text: "",type: "",time: ""};
let mensagemEnviar = {from:"", to:"", text:"", type:""};

let mainUser = {name: ""};
let login;

function fLogin(){
    let ok = true;
    mainUser.name = prompt("Qual o seu nome?");
    login = axios.post(loginUser, mainUser);
    login.then(manterLogin);
    login.catch(fLogin);
}

function manterLogin_aux(){
    axios.post(loginStatus, mainUser);
}

function manterLogin(){
    setInterval(manterLogin_aux, 5000);
}

fLogin();

function erroMsg(){
    window.location.reload();
}

function enviaMsg(){
    let msg = document.getElementById("mensagem").value;
    mensagemEnviar.from = mainUser.name;
    mensagemEnviar.to = "Todos";
    mensagemEnviar.text = msg;
    mensagemEnviar.type = "message";
    let msgEnviada = axios.post(messagens, mensagemEnviar);
    msgEnviada.then();
    msgEnviada.catch(erroMsg);
}

function getMsgs(){
    let msgs = axios.get(messagens);
}