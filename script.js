const loginUser = "https://mock-api.driven.com.br/api/v6/uol/participants ";
const loginStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
const messagens = "https://mock-api.driven.com.br/api/v6/uol/messages";

let mensagemRecebida = {from: "",to: "",text: "",type: "",time: ""};
let mensagemEnviar = {from:"", to:"", text:"", type:""};

let mainUser = {name: ""};
let login;
let msgs;
let msg;

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
    setInterval(getMsgs, 3000);
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
}

function getMsgs(){
    msgs = axios.get(messagens);
    msgs.then(renderizaMsgs);
    msgs.catch(erroMsg);
}

function renderizaMsgs(msgs){
    console.log(msgs.data);
    let lstMsgs = msgs.data;
    for (let i = 0; i<lstMsgs.length; i++){
        if (lstMsgs[i].type == "status"){
            renderizaMsgStatus(lstMsgs[i]);
        } else if (lstMsgs[i].type == "message"){
            renderizaMsgPublica(lstMsgs[i]);
        }
    }
}

function renderizaMsgStatus(msg){
    console.log(msg.type);
    let caixa_mensagens = document.querySelector(".caixa-mensagens");
    let mensagemStatus = `
            <div class="caixa-mensagem msg-status">
                <p class="fonte-msg"><span class="horario-msg">${msg.time}</span> 
                <span class="usuario">${msg.from}</span> ${msg.text}</p>
            </div>`;
    caixa_mensagens.innerHTML = caixa_mensagens.innerHTML + mensagemStatus;
}

function renderizaMsgPublica(msg){
    console.log(msg.type);
    let caixa_mensagens = document.querySelector(".caixa-mensagens");
    let mensagemPublica = `
        <div class="caixa-mensagem msg-publica"><p class="fonte-msg"><span class="horario-msg">${msg.time}
        </span> <span class="usuario">${msg.from}</span> para 
        <span class="usuario">${msg.to}</span>:${msg.text}</p>
        </div>`;
    caixa_mensagens.innerHTML = caixa_mensagens.innerHTML +  mensagemPublica;
}