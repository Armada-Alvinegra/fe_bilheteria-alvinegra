import s from './HomeScreen.module.css';
import {
  ArmadaCrest,
  TeamCrest,
  NeonPanel,
  NeonButton,
  GridBackdrop,
  Scanline,
  CompetitionCrest, StatusChip
} from '../components/atoms.jsx';
import { Icon } from '../components/Icons.jsx';
import { MATCHES, STATUS_CONFIG } from '../data/mock.js';
import { getInitials } from '../utils/user.js';

export default function HomeScreen({ onRequest, onProfile, onPending, user, theme = 'dark', status = 'open' }) {
  const u = user || { name: 'Bruno Silva', memberId: '2047' };
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG['open'];
  return (
    <div className={s.screen}>
      <GridBackdrop/>
      <Scanline/>

      {/* Hero como header — só imagem, sem overlay de informação */}
      <div className={s.heroHeader}>
        <img
          src="/assets/mascote.jpeg"
          alt="Furacão"
          style={{ filter: cfg.mascotFilter ?? undefined }}
        />
        <div className={s.heroHeaderGradient}/>
        <button className={s.avatarBtn} onClick={onProfile}>
          {getInitials(u.name)}
        </button>
      </div>

      <div className={s.matchSection}>
        <div className={s.matchSectionHeader}>
          <div className={s.matchSectionLabel}>▸ Próximas batalhas</div>
        </div>

        <div className={s.matchList}>
          {MATCHES.map(match => (
            <NeonPanel key={match.id} style={{ padding: 16 }} glow="var(--violet)">
              <div className={s.matchCompetition}>
                <CompetitionCrest size={70} src={theme === 'dark' ? match.competition.srcDark : match.competition.srcLight}/>
                <div>{match.competition.round}</div>
                <div style={{ marginLeft: 'auto' }}><StatusChip status={match.status}/></div>
              </div>
              <div className={s.matchTeams}>
                <div className={s.teamCol}>
                  <TeamCrest size={56} {...match.home}/>
                  <div className={s.teamName}>{match.home.name}</div>
                  <div className={s.teamBadgeHome}>CASA</div>
                </div>

                <div className={s.vsCol}>
                  <div className={s.vsText}>VS</div>
                  <div className={s.vsTime}>{match.time}</div>
                  <div className={s.vsDate}>{match.date}</div>
                </div>

                <div className={s.teamCol}>
                  <TeamCrest size={56} {...match.away}/>
                  <div className={s.teamName}>{match.away.name}</div>
                  <div className={s.teamBadgeAway}>VISIT.</div>
                </div>
              </div>

              <div className={s.matchVenue}>
                <Icon.pin s={12} c="var(--cyan)"/>
                {match.venue} · {match.sector}
              </div>

              {match.stock > 0 && (
                <>
                  <div className={s.stockRow}>
                    <span>STOCK DA CLAQUE</span>
                    <span className={s.stockValue}>{match.stock} / {match.total}</span>
                  </div>
                  <div className={s.stockBar}>
                    <div className={s.stockFill} style={{ width: `${(match.stock / match.total) * 100}%` }}/>
                  </div>
                </>
              )}

              <div className={s.matchCardCtas}>
                <div className={s.matchCardBtns}>
                  {match.status === 'open' && (
                    <NeonButton size="sm" onClick={onRequest} icon={<Icon.ticket s={16} c="#fff"/>}>
                      Pedir Bilhete
                    </NeonButton>
                  )}
                  {match.status === 'pending' && (
                    <NeonButton size="sm" onClick={onPending} icon={<Icon.eye s={16} c="#fff"/>}>
                      Ver Pedido
                    </NeonButton>
                  )}
                  {match.status === 'approved' && (
                    <div className={s.ticketsInChat}>
                      <Icon.check s={14} c="var(--success)"/>
                      <span>Bilhetes enviados para o teu chat</span>
                      <button className={s.openChatBtn} onClick={() => window.Telegram?.WebApp?.openTelegramLink('https://t.me/ArmadaAlvinegraBot')}>
                        Abrir
                      </button>
                    </div>
                  )}
                  {match.status === 'upcoming' && (
                    <div className={s.upcomingMsg}>
                      <Icon.clock s={13} c="var(--muted)"/>
                      <span>Bilheteira abre a {match.ticketOpenDate ?? '—'}</span>
                    </div>
                  )}
                  {match.status === 'rejected' && (
                    <NeonButton size="sm" onClick={onRequest} icon={<Icon.ticket s={16} c="#fff"/>}>
                      Pedir Bilhete
                    </NeonButton>
                  )}
                </div>
              </div>
            </NeonPanel>
          ))}
        </div>
      </div>

      <div className={s.tagline}>∙ AA//2014 · NÃO HÁ GENTE COMO A GENTE ∙</div>

      {/* Footer com identidade */}
      <div className={s.footer}>
        <ArmadaCrest size={32} src="/armada/armada-alvinegra.png"/>
        <div>
          <div className={s.footerTitle}>BILHETEIRA ALVINEGRA</div>
          <div className={s.footerSub}>SÓCIO #{u.memberId} · DESDE 2014</div>
        </div>
      </div>
    </div>
  );
}