export function ContatoPage() {
  return `
        <section class="contato">
            <div class="container">
                <h1>Entre em Contato</h1>
                <p>Estamos prontos para atendê-lo!</p>

                <div class="contato-content">
                    <div class="contato-info">
                        <h2>Informações de Contato</h2>
                        <p><strong>Telefone:</strong> (69) 1234-5678</p>
                        <p><strong>WhatsApp:</strong> (69) 98765-4321</p>
                        <p><strong>Email:</strong> contato@ofulano.com.br</p>
                    </div>

                    <div class="contato-form">
                        <h2>Envie uma Mensagem</h2>
                        <form id="contact-form">
                            <input type="text" placeholder="Seu nome" required />
                            <input type="email" placeholder="Seu e-mail" required />
                            <textarea placeholder="Sua mensagem" rows="5" required></textarea>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
}