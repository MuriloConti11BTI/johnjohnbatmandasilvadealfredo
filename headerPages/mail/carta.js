    function mostrarMensagem() {
        const msg = document.getElementById("mensagem");
        msg.innerText = "Você é a melhor parte dos meus dias. Te amo! 💖";
        msg.style.display = "block";
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