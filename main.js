let count = 1; // Contador de tentativas
let limite = 10; // Intervalo de 1 a 10
let numero_secreto = obterNumeroSecreto(); // Número secreto gerado aleatoriamente
let tentativas = 3; // Número de tentativas definidas como 3

// Função para obter um número secreto aleatório entre 1 e 'limite'
function obterNumeroSecreto() {
    return parseInt(Math.random() * limite + 1);
}

// Função para inserir texto e falar com voz
function insereTexto(tag, texto) {
    let varTag = document.querySelector(tag);
    varTag.innerHTML = texto;
    responsiveVoice.speak(texto, "UK English Female", { pitch: 1 });
}

// Função para inicializar o texto exibido na página
function inicializarTexto() {
    insereTexto('h1', 'Número Secreto do Gustavo');
    insereTexto('p', `Escolha um número de 1 a ${limite}:`);
}

inicializarTexto(); // Chama a função para inicializar o texto na página

// Função para verificar o chute do usuário
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);

    // Verifica se o chute é válido
    if (isNaN(chute) || chute < 1 || chute > limite) {
        insereTexto('p', 'Por favor, insira um número válido dentro do intervalo.');
        return;
    }

    // Verifica se ainda há tentativas disponíveis
    if (tentativas > 0) {
        if (numero_secreto === chute) {
            let palavra_tentativas = count > 1 ? 'tentativas' : 'tentativa';
            insereTexto('h1', `Parabéns! Você acertou em ${count} ${palavra_tentativas}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('chutar').setAttribute('disabled', true);
            document.querySelector('input').setAttribute('disabled', true);
        } else {
            tentativas--; // Decrementa o número de tentativas
            if (chute > numero_secreto) {
                insereTexto('h1', 'O número é menor.');
                insereTexto('p', `Você tem ${tentativas} tentativa${tentativas === 1 ? '' : 's'} restante${tentativas === 1 ? '' : 's'}.`);
            } else {
                insereTexto('h1', 'O número é maior.');
                insereTexto('p', `Você tem ${tentativas} tentativa${tentativas === 1 ? '' : 's'} restante${tentativas === 1 ? '' : 's'}.`);
            }
        }
    } else {
        // Fim de jogo, sem mais tentativas
        insereTexto('h1', 'Fim de Jogo!');
        insereTexto('p', 'Você não tem mais tentativas.');
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }

    limpaInput(); // Limpa o campo de input
    count++; // Incrementa o contador de tentativas
}

// Função para limpar o valor do input
function limpaInput() {
    document.querySelector('input').value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    count = 1; // Reinicia o contador de tentativas
    tentativas = 3; // Reinicia o número de tentativas para 3
    numero_secreto = obterNumeroSecreto(); // Gera um novo número secreto
    inicializarTexto(); // Re-inicializa o texto exibido
    document.querySelector('input').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    limpaInput(); // Limpa o campo de input
}

// Adiciona um ouvinte de eventos para o teclado
document.querySelector('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarChute(); // Verifica o chute quando a tecla Enter é pressionada
    }
});
