import { Navbar } from './navbar.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/Home.js';
import { CardapioPage } from './pages/Cardapio.js';
import { SobrePage } from './pages/Sobre.js';
import { LocalizacaoPage } from './pages/Localizacao.js';
import { ContatoPage } from './pages/Contato.js';

const routes = {
    '/': { page: HomePage, name: 'home' },
    '/cardapio': { page: CardapioPage, name: 'cardapio' },
    '/sobre': { page: SobrePage, name: 'sobre' },
    '/localizacao': { page: LocalizacaoPage, name: 'localizacao' },
    '/contato': { page: ContatoPage, name: 'contato' }
};

function renderPage(path) {
    const route = routes[path] || routes['/'];
    const app = document.querySelector('#app');

    app.innerHTML = `
        ${Navbar(route.name)}
        <main>
            ${route.page()}
        </main>
        ${Footer()}
    `;

    window.scrollTo(0, 0);
}

export function navigateTo(path) {
    window.location.hash = path;
}

export function initRouter() {
    const initialPath = window.location.hash.slice(1) || '/';
    renderPage(initialPath);

    window.addEventListener('hashchange', () => {
        const path = window.location.hash.slice(1) || '/';
        renderPage(path);
    });

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.href.includes('#')) {
            const url = new URL(e.target.href);
            if (url.hash) {
                e.preventDefault();
                navigateTo(url.hash.slice(1));
            }
        }
    });
}