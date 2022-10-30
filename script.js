const loginUser = "https://mock-api.driven.com.br/api/v6/uol/participants ";
const urlStatus = "https://mock-api.driven.com.br/api/v6/uol/status";
const getMessagens = "https://mock-api.driven.com.br/api/v6/uol/messages";

let mensagem = {horario: "", nome:"", destinatário:"", tipo:"", horario:""};

const nomeUsuario = prompt("Qual o seu nome?");
axios.post(loginUser, nomeUsuario);