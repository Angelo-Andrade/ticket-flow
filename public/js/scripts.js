const inputTelefone = document.getElementById('telefone');
inputTelefone.addEventListener('input', (event) => {
    let telefone = event.target.value;

    // Remove tudo que não for número
    telefone = telefone.replace(/\D/g, '');

    // Adiciona o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (telefone.length <= 10) {
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    // Atualiza o valor do campo com o formato
    event.target.value = telefone;
});

function adjustFontSize(action) {
    const root = document.documentElement;
    const currentFontSize = parseFloat(window.getComputedStyle(root).fontSize);
    const step = 1; 

    if (action === 'increase') {
        root.style.fontSize = (currentFontSize + step) + 'px';
    } else if (action === 'decrease') {
        root.style.fontSize = (currentFontSize - step) + 'px';
    }
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        body.classList.remove('menu-open');
    } else {
        sidebar.classList.add('open');
        body.classList.add('menu-open');
    }
}

function toggleDaltonicMode() {
    const daltonicStyle = document.getElementById('daltonic-style');
    const defaultStyle = document.getElementById('default-style');

    if (daltonicStyle.disabled) {
        daltonicStyle.disabled = false;
        defaultStyle.disabled = true;
    } else {
        daltonicStyle.disabled = true;
        defaultStyle.disabled = false;
    }
}

function confirmarCancelamento(chamadoId, elemento) {
    if (confirm('Tem certeza de que deseja cancelar este chamado?')) {
        elemento.parentElement.remove();
        
        // Redireciona para a página de histórico de chamados após um curto atraso
        setTimeout(function() {
            window.location.href = 'historico.html';
        }, 100); // 100 milissegundos de atraso para garantir a remoção do elemento
    }
}

function atualizarStatus(chamadoId, selectElement) {
    const chamadoItem = document.getElementById(chamadoId);
    const statusElement = chamadoItem.querySelector('.status');
    statusElement.textContent = selectElement.value;

    if (selectElement.value === "Fechado") {
        // Remove o chamado da lista
        chamadoItem.remove();
    }
}

function alterarTipoInput() {
    const filtroSelect = document.getElementById("filtro");
    const inputValor = document.getElementById("valor");

    if (filtroSelect.value === "c.data_criacao") {
        inputValor.type = "date";
    } else {
        inputValor.type = "text";
    }
}
window.onload = alterarTipoInput;

function toggleVisibilityPassword() {
    const input = document.querySelector('#senha');
    if (!input) {
        return
    }

    if(input.type === "password") return input.type="text"
    input.type = "password";
}