let locais_proximos = [
    { "id": 1, "tipo": "delegacia", "publico": ["adulto", "idoso"], "nome": "Delegacia Especializada de Atendimento à Mulher", "endereco": "Av. Barbacena, 288 - Barro Preto, BH" },
    { "id": 2, "tipo": "delegacia", "publico": ["criança", "adolescente"], "nome": "Divisão Especializada em Orientação e Proteção à Criança e ao Adolescente", "endereco": "Av. Olegário Maciel, 600 - Centro, BH" },
    { "id": 3, "tipo": "hospital", "publico": ["criança", "adolescente", "adulto", "idoso"], "nome": "Hospital João XXIII", "endereco": "Av. Professor Alfredo Balena, 400 - Santa Efigênia, BH" },
    { "id": 4, "tipo": "hospital", "publico": ["criança", "adolescente", "adulto", "idoso"], "nome": "Hospital das Clínicas UFMG", "endereco": "Av. Professor Alfredo Balena, 110 - Santa Efigênia, BH" },
    { "id": 5, "tipo": "hospital", "publico": ["criança", "adolescente", "adulto", "idoso"], "nome": "Santa Casa de Belo Horizonte", "endereco": "Av. Francisco Sales, 1111 - Santa Efigênia, BH" },
    { "id": 6, "tipo": "ong", "publico": ["adulto", "idoso"], "nome": "Casa Tina Martins", "endereco": "Rua Paraíba, 641 - Funcionários, BH" },
    { "id": 7, "tipo": "ong", "publico": ["adulto"], "nome": "Servas - Serviço Social Autônomo", "endereco": "Av. Cristóvão Colombo, 683 - Funcionários, BH" },
    { "id": 8, "tipo": "apoio", "publico": ["adulto", "idoso"], "nome": "Centro de Referência da Mulher Benvinda", "endereco": "Rua Hermilo Alves, 34 - Santa Tereza, BH" }
]

function getChecked(grupo) {
    return [...document.querySelectorAll(`.filtro-grupo:nth-of-type(${grupo}) input:checked`)]
        .map(cb => cb.value)
}

function exibirResultados() {
    const publicoSelecionado = getChecked(1)
    const tipoSelecionado = getChecked(2)

    let resultados = locais_proximos.filter(item => {
        const passaPublico = publicoSelecionado.length === 0 ||
            publicoSelecionado.some(p => item.publico.includes(p))

        const passaTipo = tipoSelecionado.length === 0 ||
            tipoSelecionado.includes(item.tipo)

        return passaPublico && passaTipo
    })

    const divTela = document.getElementById('tela')

    if (resultados.length === 0) {
        divTela.innerHTML = "<p class='sem-resultado'>Nenhum local encontrado para os filtros selecionados.</p>"
        return
    }

    divTela.innerHTML = resultados.map(item => `
        <div class="card-local">
            <span class="card-tipo">${item.tipo}</span>
            <strong>${item.nome}</strong>
            <p>${item.endereco}</p>
        </div>
    `).join("")
}

// Atualiza ao mudar qualquer checkbox
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', exibirResultados)
})

// Exibe todos ao carregar a página
exibirResultados()