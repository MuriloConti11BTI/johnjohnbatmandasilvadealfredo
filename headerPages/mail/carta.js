    function abrirCarta() {
    const carta = document.getElementById("carta");
    const envelope = document.getElementById("envelope");
    const selo = document.getElementById("selo");
    
    if (carta.classList.contains("aberta")) {
        // Fecha a carta
        carta.classList.remove("aberta");
        envelope.classList.remove("aberto");
        selo.classList.remove("girado");
        document.removeEventListener("click", fecharCartaFora);
    } else {
        // Abre a carta
        carta.classList.add("aberta");
        envelope.classList.add("aberto");
        selo.classList.add("girado");
        setTimeout(() => {
            document.addEventListener("click", fecharCartaFora);
        }, 100);
    }
}

function fecharCartaFora(e) {
    const carta = document.getElementById("carta");
    const envelope = document.getElementById("envelope");
    const selo = document.getElementById("selo");
    
    if (!carta.contains(e.target) && !selo.contains(e.target) && !envelope.contains(e.target)) {
        carta.classList.remove("aberta");
        envelope.classList.remove("aberto");
        selo.classList.remove("girado");
        document.removeEventListener("click", fecharCartaFora);
    }
}

/* === CARREGAMENTO  DO LOADER AO ENTRAR === */

const MIN_TIME = 1350
window.addEventListener("load", () => {
    const loader = document.getElementById("loader")

    const startTime = performance.timing.navigationStart
    const elapsed = Date.now() - startTime
    const remaining = MIN_TIME - elapsed

    setTimeout(() => {
        document.body.classList.add("loaded")

        setTimeout(() => {
            loader.style.display = "none"
        }, 800);
    }, remaining > 0 ? remaining : 0)
})

// === MENU HAMBURGUER === //

const hamburger = document.getElementById('hamburger')
const navMenu = document.getElementById('nav-menu')

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active')

    hamburger.classList.toggle('open')
})