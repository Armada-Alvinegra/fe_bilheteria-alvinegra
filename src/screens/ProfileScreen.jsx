import s from './ProfileScreen.module.css';
import { NeonPanel, GridBackdrop, Scanline } from '../components/atoms.jsx';
import { Icon } from '../components/Icons.jsx';
import { getInitials } from '../utils/user.js';

export default function ProfileScreen({ onBack, onLogout, onToggleTheme, theme = 'dark', user }) {
  const u = user || { name: 'Bruno Silva', memberId: '2047', tgHandle: '@brunos_md', since: 2018 };

  return (
    <div className={s.screen}>
      <GridBackdrop/>
      <Scanline/>

      <div className={s.topBar}>
        <button className={s.backBtn} onClick={onBack}>
          <Icon.back s={18}/>
        </button>
        <div>
          <div className={s.topBarLabel}>// CARTÃO DE SÓCIO</div>
          <div className={s.topBarTitle}>PERFIL</div>
        </div>
      </div>

      <div className={s.body}>
        <NeonPanel style={{ padding: 0, overflow: 'hidden', borderRadius: 18 }} glow="var(--violet)">
          <div className={s.cardInner}>
            <div className={s.cardStripes}/>
            <div className={s.cardTop}>
              <div className={s.avatar}>{getInitials(u.name)}</div>
              <div>
                <div className={s.memberStatus}>SÓCIO ATIVO</div>
                <div className={s.memberName}>{u.name.toUpperCase()}</div>
                <div className={s.memberHandle}>{u.tgHandle}</div>
              </div>
            </div>
            <div className={s.cardBottom}>
              <div>
                <div className={s.memberIdLabel}>// Nº DE SÓCIO</div>
                <div className={s.memberId}>#{u.memberId}</div>
              </div>
              <div>
                <div className={s.sinceLabel}>MEMBRO DESDE</div>
                <div className={s.sinceValue}>{u.since}</div>
              </div>
            </div>
          </div>
        </NeonPanel>

        <div className={s.statCard}>
          <div>
            <div className={s.statLabel}>// Jogos com bilhete</div>
            <div className={s.statValue}>47</div>
          </div>
          <div className={s.statSeason}>época 25/26</div>
        </div>

        <div className={s.sectionLabel}>// PREFERÊNCIAS</div>
        <NeonPanel style={{ padding: 0, overflow: 'hidden', marginBottom: 18 }}>
          <div className={s.dataRow}>
            <span className={s.dataKey}>Aparência</span>
            <button className={s.themeToggle} onClick={onToggleTheme} aria-label="Alternar tema">
              <span className={`${s.themeOption} ${theme === 'dark' ? s.themeActive : ''}`}>☾ Escuro</span>
              <span className={`${s.themeOption} ${theme === 'light' ? s.themeActive : ''}`}>☀ Claro</span>
            </button>
          </div>
        </NeonPanel>

        <div className={s.sectionLabel}>// DADOS PESSOAIS</div>

        <NeonPanel style={{ padding: 0, overflow: 'hidden' }}>
          {[
            ['Email', 'bruno.silva@mail.pt'],
            ['Contacto', '+351 926 •••876'],
            ['CC / Doc.', '14•••••0·Z'],
            ['Notificações', 'Telegram ativo'],
          ].map(([k, v]) => (
            <div key={k} className={s.dataRow}>
              <span className={s.dataKey}>{k}</span>
              <span className={s.dataVal}>
                {v}
                <Icon.chevron s={12} c="var(--muted)"/>
              </span>
            </div>
          ))}
        </NeonPanel>

        <button className={s.logoutBtn} onClick={onLogout}>Terminar sessão</button>

        <div className={s.footer}>∙ AA//2014 · app v0.1 ∙</div>
      </div>
    </div>
  );
}