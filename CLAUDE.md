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
4. `/profile` → `ProfileScreen`

### Ecrãs (`src/screens/`)

Cada ecrã tem o seu `.jsx` e `.module.css`. O `App.jsx` passa props diretamente (sem Context/Zustand):

| Ecrã | Responsabilidade |
|---|---|
| `LoginScreen` | Autenticação 2 passos: Telegram + verificação de sócio |
| `HomeScreen` | Hero com mascote, lista de jogos com status por sócio, botões de ação |
| `RequestScreen` | Formulário de pedido (quantidade, zona, acompanhantes) + passo de pagamento MBWay |
| `ProfileScreen` | Cartão de sócio, toggle de tema, logout |

### Componentes e Utilitários

- **`src/components/atoms.jsx`** — Primitivos reutilizáveis: `NeonPanel`, `NeonButton`, `StatusChip`, `ArmadaCrest`, `TeamCrest`, `GridBackdrop`, `Scanline`
- **`src/components/Icons.jsx`** — Ícones SVG inline (acedidos via `Icon.ticket`, `Icon.home`, etc.)
- **`src/hooks/usePersistedState.js`** — `useState` com persistência em `localStorage`
- **`src/hooks/useTypewriter.js`** — Efeito de escrita caracter a caracter
- **`src/data/mock.js`** — Dados mock (jogos, utilizador, pedidos) — substituir com API quando o backend estiver pronto; inclui `STATUS_CONFIG` que mapeia status → cores, textos e filtro CSS da mascote
- **`src/utils/user.js`** — `getInitials(name)` para o avatar
- **`src/utils/validation.js`** — Validação do Cartão de Cidadão português (regex `\d{8}[A-Z]{2}\d`; algoritmo Luhn comentado para futura ativação)

### Design System

Tokens centralizados em dois ficheiros sincronizados (manter em sincronia ao alterar cores):
- `src/styles.css` — CSS custom properties; inclui `--surface-*` para suporte a light mode via `data-theme`
- `src/tokens.js` — Objeto JS com os mesmos tokens (para uso programático em SVG e estilos inline)

Paleta: fundo escuro `#13111c`, primária violeta `#a855f7`, acento ciano `#22d3ee`.

### Integração Telegram

`src/telegram.js` encapsula `window.Telegram.WebApp`. O SDK é carregado via CDN em `index.html`. Funções exportadas: `initTelegram()` (chama `tg.ready()`, `expand()`, define cores do header) e `getTelegramUser()` (extrai user do `initDataUnsafe`). Ambas têm fallback silencioso fora do Telegram.

A validação real do `initData` (HMAC-SHA256 com o bot token) deve ocorrer no backend.

**Bypass de desenvolvimento:** `LoginScreen.jsx` tem um auto-login com o utilizador de teste Bruno Silva (#2047). Para restaurar o fluxo real: remover a chamada `onLogin(...)` e descomentar `setStep(2)`.

### Design System — modo claro/escuro

O tema é aplicado via `document.documentElement.setAttribute('data-theme', theme)`. O CSS usa os seletores `[data-theme="light"]` e `[data-theme="dark"]` para alternar paletas. O `STATUS_CONFIG` em `mock.js` inclui um `mascotFilter` (string CSS `filter`) por estado para alterar a tonalidade da imagem da mascote conforme o humor.

### Estado Atual (dados mock)

O frontend não tem integração de API. Todos os dados (jogos, utilizador, pedidos) são mock em `src/data/mock.js`. O backend Java Spring é trabalho futuro.

O contrato completo da API (endpoints, payloads, regras de negócio) está em **`API_CONTRACT.md`**. Os endpoints principais são:
- `POST /auth/telegram` + `POST /auth/verify-member` — autenticação
- `GET /matches` — lista de jogos com status **por sócio**
- `POST /requests` — criar pedido; `POST /requests/{id}/proof` — upload de comprovativo
- `GET /payment/config` + `GET /pricing` — configuração dinâmica (sem deploy)