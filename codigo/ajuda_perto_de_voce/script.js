let locais_proximos = [
    {
        "id": 1,
        "tipo": "delegacia",
        "nome": "Delegacia Especializada de Atendimento à Mulher",
        "endereco": "Av. Barbacena, 288 - Barro Preto, Belo Horizonte - MG"
    },
    {
        "id": 2,
        "tipo": "delegacia",
        "nome": "Divisão Especializada em Orientação e Proteção à Criança e ao Adolescente",
        "endereco": "Av. Olegário Maciel, 600 - Centro, Belo Horizonte - MG"
    },
    {
        "id": 3,
        "tipo": "hospital",
        "nome": "Hospital João XXIII",
        "endereco": "Av. Professor Alfredo Balena, 400 - Santa Efigênia, Belo Horizonte - MG"
    },
    {
        "id": 4,
        "tipo": "hospital",
        "nome": "Hospital das Clínicas UFMG",
        "endereco": "Av. Professor Alfredo Balena, 110 - Santa Efigênia, Belo Horizonte - MG"
    },
    {
        "id": 5,
        "tipo": "hospital",
        "nome": "Santa Casa de Belo Horizonte",
        "endereco": "Av. Francisco Sales, 1111 - Santa Efigênia, Belo Horizonte - MG"
    },
    {
        "id": 6,
        "tipo": "ong",
        "nome": "Casa Tina Martins",
        "endereco": "Rua Paraíba, 641 - Funcionários, Belo Horizonte - MG"
    },
    {
        "id": 7,
        "tipo": "ong",
        "nome": "Servas - Serviço Social Autônomo",
        "endereco": "Av. Cristóvão Colombo, 683 - Funcionários, Belo Horizonte - MG"
    },
    {
        "id": 8,
        "tipo": "apoio",
        "nome": "Centro de Referência da Mulher Benvinda",
        "endereco": "Rua Hermilo Alves, 34 - Santa Tereza, Belo Horizonte - MG"
    }
]

document.getElementById('btn-busca').addEventListener('click', function () {
    let local = document.getElementById('campo-busca').value.toLowerCase().trim()
    let divTela = document.getElementById('tela')

    let tiposValidos = ["delegacia", "hospital", "ong"]

    if (!tiposValidos.includes(local)) {
        divTela.innerHTML = "<p>Localização não definida. Tente: delegacia, hospital ou ong.</p>"
        return
    }

    // Filtra os locais pelo tipo digitado
    let resultados = locais_proximos.filter(function (item) {
        return item.tipo === local
    })

    // Monta o HTML com os resultados
    let html = ""
    resultados.forEach(function (item) {
        html += `
            <div class="card-local">
                <h2>${item.nome}</h2>
                <p>${item.endereco}</p>
            </div>
        `
    })

    divTela.innerHTML = html
})