export function LocalizacaoPage() {
  return `
         <section class="localizacao">
      <div class="localizacao-container">
        <h1 class="localizacao-titulo">Restaurantes Próximos</h1>
        <p class="localizacao-descricao">
          Encontre os melhores restaurantes perto de você! Veja abaixo algumas opções selecionadas para sua região.
        </p>
        <div class="localizacao-grid">
          <div class="localizacao-card" id="loc-card"></div>    
        </div>
      </div>
    </section>
    `;
}