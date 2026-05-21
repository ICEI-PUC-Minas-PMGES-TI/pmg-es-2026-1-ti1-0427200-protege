const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
    document.querySelector("#email").value;

    const senha =
    document.querySelector("#senha").value;

    try{

        const resposta = await fetch(
            "http://localhost:3000/usuarios"
        );

        const usuarios = await resposta.json();

        const usuarioEncontrado =
        usuarios.find((usuario) => {

            return (
                usuario.email === email &&
                usuario.senha === senha
            );
        });

        if(usuarioEncontrado){

            localStorage.setItem(
                "usuarioLogado",
                "true"
            );

            alert("Login realizado!");

            window.location.href =
            "index.html";

        }else{

            alert("Email ou senha inválidos");
        }

    }catch(error){

        console.log(error);

        alert(
            "Erro ao conectar com o servidor"
        );
    }
});