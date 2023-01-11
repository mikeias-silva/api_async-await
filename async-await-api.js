/**
 * Criar api para carregar 3 paginas e alterar o conteudo, sem reload da pragina 
 * quando nao encontrado mostrar pagina de não encontrado!
 * 
 */

document.addEventListener("click", function (evento) {
    let elemento = evento.target;
    if (elemento.tagName.toLowerCase() === 'a') {
        evento.preventDefault();
        loadPage(elemento)
    }

})


async function loadPage(elemento) {
    const link = elemento.getAttribute('href')

    try {
        const response = await fetch(link);
        if (response.status !== 200) {
            throw new Error;
        }
        const html = await response.text();
        carregaPagina(html);
    } catch (error) {
        carregaNaoEncontrado();
    }

}

function carregaPagina(html) {
    const div = document.querySelector('.conteudo');
    div.innerHTML = html;
}

function carregaNaoEncontrado() {
    const div = document.querySelector('.conteudo');
    fetch('./notFound.html')
        .then(response => {
            return response.text();
        })
        .then(html => div.innerHTML = html)
        .catch(error => {
            console.error(error);
        })
}
