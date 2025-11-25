
export function Navbar(currentPage = 'home') {
    return `
        <nav class="navbar">
            <div class="navbar-logo">
                <img src="../assets/logo.png" alt="Logo" class="logo" />
            </div>
            <ul class="navbar-links">
                <li><a href="#/" class="${currentPage === 'home' ? 'active' : ''}">Início</a></li>
                <li><a href="#/cardapio" class="${currentPage === 'cardapio' ? 'active' : ''}">Cardápio</a></li>
                <li><a href="#/localizacao" class="${currentPage === 'localizacao' ? 'active' : ''}">Localização</a></li>
                <li><a href="#/contato" class="${currentPage === 'contato' ? 'active' : ''}">Contato</a></li>
            </ul>
        </nav>
    `;
}