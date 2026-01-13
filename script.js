const nome = document.getElementById("nome")
const email = document.getElementById("email")
const botao = document.getElementById("botao")
const cadastroDeCliente = document.getElementById("cadastroDeCliente")

const API_URL = "https://crudcrud.com/api/4a09f6a0532a4162a6ff458cc7613b63/clientes"

// LISTAR CLIENTES (GET)
function carregarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(clientes => {
            cadastroDeCliente.innerHTML = ""

            clientes.forEach(cliente => {
                criarClienteNaTela(cliente)
            })
        })
}

carregarClientes()

// CRIAR CLIENTE NA TELA
function criarClienteNaTela(cliente) {
    const li = document.createElement("li")
    li.textContent = `${cliente.nome} - ${cliente.email}`

    const botaoExcluir = document.createElement("button")
    botaoExcluir.textContent = "Excluir"

    botaoExcluir.addEventListener("click", function () {
        excluirCliente(cliente._id, li)
    })

    li.appendChild(botaoExcluir)
    cadastroDeCliente.appendChild(li)
}

// CADASTRAR CLIENTE (POST)
botao.addEventListener("click", function () {
    const nomeDigitado = nome.value.trim()
    const emailDigitado = email.value.trim()

    if (nomeDigitado === "" || emailDigitado === "") {
        alert("Preencha nome e email")
        return
    }

    const cliente = {
        nome: nomeDigitado,
        email: emailDigitado
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    })
        .then(response => response.json())
        .then(data => {
            criarClienteNaTela(data)
            nome.value = ""
            email.value = ""
        })
})

// EXCLUIR CLIENTE (DELETE)
function excluirCliente(id, li) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            li.remove()
        })
}


