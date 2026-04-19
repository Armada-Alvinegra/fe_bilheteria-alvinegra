# Bilheteira Alvinegra

Frontend da aplicação de requisição de bilhetes para a claque **Armada Alvinegra** do CD Nacional da Madeira.  
Corre como **Telegram Mini App** dentro do bot `@ArmadaAlvinegraBot`.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18 + Vite |
| Estilos | CSS Modules + CSS Custom Properties |
| Telegram | `window.Telegram.WebApp` (carregado via `<script>` em `index.html`) |
| Backend (futuro) | Java Spring |

---

## Arrancar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/
npm run preview   # preview do build
```

---

## Estrutura

```
src/
├── main.jsx                  # entry point
├── App.jsx                   # router por estado (localStorage)
├── styles.css                # reset global + CSS variables (design tokens)
├── tokens.js                 # tokens JS (SVG attrs e valores dinâmicos)
├── telegram.js               # wrapper Telegram.WebApp (ready, expand, theme)
│
├── components/
│   ├── atoms.jsx             # NeonPanel, NeonButton, StatusChip, crests, GridBackdrop, Scanline
│   ├── atoms.module.css
│   └── Icons.jsx             # biblioteca de ícones SVG
│
└── screens/
    ├── LoginScreen.jsx / .module.css       # auth via Telegram + verificação sócio
    ├── HomeScreen.jsx / .module.css        # hero mascote + card próximo jogo + CTAs
    ├── ProfileScreen.jsx / .module.css     # cartão de sócio + dados pessoais
    ├── RequestScreen.jsx / .module.css     # formulário de pedido (qty, setor, acompanhantes)
    ├── ConfirmationScreen.jsx / .module.css # estado do pedido (Pendente / Aprovado / Recusado)
public/
└── assets/
    └── mascote.jpeg          # Furacão (mascote oficial)
```

---

## Ecrãs

| Ecrã | Descrição |
|------|-----------|
| **Login** | Autenticação via Telegram (2 passos: OAuth → verificação nº sócio) |
| **Home** | Hero com Furacão + card do próximo jogo + stock da claque |
| **Pedido** | Quantidade, setor, acompanhantes, beneficiário (próprio ou outra pessoa) |
| **Confirmação** | Mascote reage ao estado; QR Code quando aprovado |
| **Histórico** | Lista de todos os pedidos com filtro por estado |
| **Perfil** | Cartão de sócio, estatísticas, dados pessoais, logout |

---

## Design System

Todas as cores são CSS variables definidas em `src/styles.css`:

```css
--violet      #a855f7    /* cor dominante */
--cyan        #22d3ee    /* acento neon */
--bg          #050309    /* fundo */
--success     #10f5a8
--warn        #fbbf24
--danger      #fb7185
```

Tipografia: **Oswald** (display) · **Space Grotesk** (corpo) · **JetBrains Mono** (HUD/mono)

Componentes reutilizáveis:
- `NeonPanel` — painel com bordas holográficas e corner ticks (prop `glow` define a cor)
- `NeonButton` — botão com 3 variantes: `primary` | `secondary` | `ghost`
- `StatusChip` — badge animado para estados de pedido
- `ArmadaCrest` — monograma AA com riscas alvinegras
- `TeamCrest` — escudo genérico parametrizável (cores + sigla)

---

## Integração Telegram

O ficheiro `src/telegram.js` expõe:

```js
initTelegram()     // chama ready(), expand(), setHeaderColor()
getTelegramUser()  // extrai { id, name, tgHandle } de initDataUnsafe
```

A validação do `initData` (HMAC-SHA256 com o bot token) é **responsabilidade do backend** Spring — nunca confiar no frontend para autenticar.

---

## Modo de desenvolvimento

O flow de login tem um **bypass activo para desenvolvimento** em `LoginScreen.jsx`:

```js
// DEV: saltar verificação de sócio — reverter removendo este bloco e descomentando setStep(2)
onLogin({ name: 'Bruno Silva', memberId: '2047', ... });
// setStep(2);
```

Para restaurar o flow real: apagar a linha `onLogin(...)` e descomentar `setStep(2)`.

---

## Roadmap (frontend)

- [ ] Ligação ao backend Spring (autenticação `initData`, listagem de jogos, submissão de pedidos)
- [ ] Área de admin (gestão de jogos, aprovação de pedidos)
- [ ] Estado global com Zustand ou Context
- [ ] Notificações via Telegram Bot API
- [ ] Internacionalização PT / EN
