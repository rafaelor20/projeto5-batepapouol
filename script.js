const loginUser = "https://mock-api.driven.com.br/api/v6/uol/participants ";
const loginStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
const messagens = "https://mock-api.driven.com.br/api/v6/uol/messages";

let mensagemEnviar = {from:"", to:"", text:"", type:""};

let mainUser = {name: ""};//obj com nome do usuario como propriedade
let login;//obj axios com nome do usuario logado
let msgs;
let msg;

function funcaoLogin(){
    let ok = true;
    mainUser.name = prompt("Qual o seu nome?");
    login = axios.post(loginUser, mainUser);
    login.then(iniciaChat);
    login.catch(erroLogin);
}

function erroLogin(){
    alert("Tente outro nome!");
    funcaoLogin();
}

function manterLogin(){
    axios.post(loginStatus, mainUser);
}

function iniciaChat(){
    setInterval(manterLogin, 5000);
    setInterval(getMsgs, 3000);
}

function atualizaPagina(){
    window.location.reload();
}

function enviaMsg(){
    let msg = document.getElementById("mensagem").value;
    mensagemEnviar.from = mainUser.name;
    mensagemEnviar.to = "Todos";
    mensagemEnviar.text = msg;
    mensagemEnviar.type = "message";
    let msgEnviada = axios.post(messagens, mensagemEnviar);
    enviaMsg();
}

function getMsgs(){
    msgs = axios.get(messagens);
    msgs.then(renderizaMsgs);
    msgs.catch(atualizaPagina);
}

function renderizaMsgs(msgs){
    let lstMsgs = msgs.data;
    let caixa_mensagens = document.querySelector(".caixa-mensagens");
    caixa_mensagens.innerHTML = "";
    for (let i = 0; i<lstMsgs.length; i++){
        if (lstMsgs[i].type == "status"){
            renderizaMsgStatus(lstMsgs[i]);
        } else if (lstMsgs[i].type == "message"){
            renderizaMsgPublica(lstMsgs[i]);
        } else if (lstMsgs[i].type == "private_message"){
            renderizaMsgPrivada(lstMsgs[i]);
        }
    }
    scrollMsg();
}

function renderizaMsgStatus(msg){
    let caixa_mensagens = document.querySelector(".caixa-mensagens");
    let mensagemStatus = `
            <div class="caixa-mensagem msg-status" "data-test="message">
                <p class="fonte-msg"><span class="horario-msg">(${msg.time})  </span> 
                <span class="usuario">${msg.from}</span> ${msg.text}</p>
            </div>`;
    caixa_mensagens.innerHTML = caixa_mensagens.innerHTML + mensagemStatus;
}

function renderizaMsgPublica(msg){
    let caixa_mensagens = document.querySelector(".caixa-mensagens");
    let mensagemPublica = `
        <div class="caixa-mensagem msg-publica" "data-test="message"><p class="fonte-msg"><span class="horario-msg">(${msg.time})  
        </span> <span class="usuario">${msg.from} </span> para 
        <span class="usuario">${msg.to} </span>:${msg.text}</p>
        </div>`;
    caixa_mensagens.innerHTML = caixa_mensagens.innerHTML +  mensagemPublica;
}

function renderizaMsgPrivada(msg){
    if (msg.from === mainUser || msg.to === mainUser){
        let caixa_mensagens = document.querySelector(".caixa-mensagens");
        let mensagemPrivada = `
        <div class="caixa-mensagem msg-privada" "data-test="message"><p class="fonte-msg"><span class="horario-msg">(${msg.time})  
        </span> <span class="usuario">${msg.from} </span> reservadamente para 
        <span class="usuario">${msg.to} </span>:${msg.text}</p>
        </div>`;
        caixa_mensagens.innerHTML = caixa_mensagens.innerHTML +  mensagemPrivada;
    }
}

function scrollMsg(){
    const elementoQueQueroQueApareca = document.querySelectorAll(".caixa-mensagem");
    const ultimoIndice = elementoQueQueroQueApareca.length - 1;
    elementoQueQueroQueApareca[ultimoIndice].scrollIntoView();
}

funcaoLogin();