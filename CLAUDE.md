# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre o Projeto

**Bilheteira Alvinegra** — Telegram Mini App para pedidos de bilhetes da Armada Alvinegra (claque do CD Nacional da Madeira). Corre dentro do bot `@ArmadaAlvinegraBot`.

## Comandos

```bash
npm install       # Instalar dependências
npm run dev       # Servidor de desenvolvimento em http://localhost:5173
npm run build     # Build de produção → dist/
npm run preview   # Pré-visualizar o build local
```

Sem scripts de teste ou lint configurados.

## Arquitetura

### Roteamento

`App.jsx` usa `HashRouter` (react-router-dom v7) — o hash é necessário para compatibilidade com o Telegram WebApp. O estado global é gerido com o hook `usePersistedState` (wrapper sobre `localStorage`).

Chaves de `localStorage`:
- `aa:user` — Objeto do utilizador autenticado (JSON)
- `aa:status` — Estado do pedido (`pending`, `approved`, `rejected`)
- `aa:theme` — Tema (`dark` / `light`)

Fluxo de rotas:
1. `/login` → `LoginScreen` (guarda automaticamente se `!user`)
2. `/` → `HomeScreen`
3. `/request` → `RequestScreen`
4. `/confirmation` → `ConfirmationScreen`
5. `/profile` → `ProfileScreen`

### Ecrãs (`src/screens/`)

Cada ecrã tem o seu `.jsx` e `.module.css`. O `App.jsx` passa props diretamente (sem Context/Zustand):

| Ecrã | Responsabilidade |
|---|---|
| `LoginScreen` | Autenticação 2 passos: Telegram + verificação de sócio |
| `HomeScreen` | Hero com mascote, próximo jogo, botões de ação |
| `RequestScreen` | Formulário de pedido (quantidade, zona, acompanhantes) |
| `ConfirmationScreen` | Feedback do estado; mascote muda de humor conforme `status` |
| `ProfileScreen` | Cartão de sócio, toggle de tema, logout |

### Componentes e Utilitários

- **`src/components/atoms.jsx`** — Primitivos reutilizáveis: `NeonPanel`, `NeonButton`, `StatusChip`, `ArmadaCrest`, `TeamCrest`, `GridBackdrop`, `Scanline`
- **`src/components/Icons.jsx`** — Ícones SVG inline
- **`src/hooks/usePersistedState.js`** — `useState` com persistência em `localStorage`
- **`src/hooks/useTypewriter.js`** — Efeito de escrita caracter a caracter
- **`src/data/mock.js`** — Dados mock (jogos, utilizador, pedidos) — substituir com API quando o backend estiver pronto
- **`src/utils/user.js`** — Helpers para o objeto utilizador

### Design System

Tokens centralizados em dois ficheiros sincronizados (manter em sincronia ao alterar cores):
- `src/styles.css` — CSS custom properties; inclui `--surface-*` para suporte a light mode via `data-theme`
- `src/tokens.js` — Objeto JS com os mesmos tokens (para uso programático em SVG e estilos inline)

Paleta: fundo escuro `#13111c`, primária violeta `#a855f7`, acento ciano `#22d3ee`.

### Integração Telegram

`src/telegram.js` encapsula `window.Telegram.WebApp`. O SDK é carregado via CDN em `index.html`. Funções exportadas: `initTelegram()` (chama `tg.ready()`, `expand()`, define cores do header) e `getTelegramUser()` (extrai user do `initDataUnsafe`). Ambas têm fallback silencioso fora do Telegram.

A validação real do `initData` (HMAC-SHA256 com o bot token) deve ocorrer no backend.

**Bypass de desenvolvimento:** `LoginScreen.jsx` tem um auto-login com o utilizador de teste Bruno Silva (#2047). Para restaurar o fluxo real: remover a chamada `onLogin(...)` e descomentar `setStep(2)`.

### Estado Atual (dados mock)

O frontend não tem integração de API. Todos os dados (jogos, utilizador, pedidos) são mock em `src/data/mock.js`. O backend Java Spring é trabalho futuro e irá tratar: validação de auth, listagem de jogos, armazenamento de pedidos, fluxo de aprovação.