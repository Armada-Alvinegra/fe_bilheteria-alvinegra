// Screen: Home — hero mascot + next match + CTA

function HomeScreen({ onRequest, onHistory, onProfile, user }) {
  const u = user || { name: 'Bruno Silva', memberId: '2047' };
  const match = {
    competition: 'Liga Portugal • Jornada 28',
    home: { code: 'NAC', label: 'Nacional', alvinegro: true },
    away: { code: 'MAR', label: 'Marítimo', alvinegro: false },
    date: '27 ABR 2026',
    time: '20:30',
    venue: 'Estádio da Madeira',
    stock: 142,
    total: 320,
  };

  return (
    <div style={{
      position: 'relative', minHeight: '100%',
      background: TOKENS.bg, color: TOKENS.white,
      fontFamily: FONT_BODY, overflow: 'hidden',
    }}>
      <GridBackdrop/>
      <Scanline/>

      {/* Header row */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 18px 8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ArmadaCrest size={36}/>
          <div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, letterSpacing: 3, color: TOKENS.white }}>ARMADA ALVINEGRA</div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1.5 }}>SÓCIO #{u.memberId} · DESDE 2014</div>
          </div>
        </div>
        <button onClick={onProfile} style={{
          width: 36, height: 36, borderRadius: 12,
          border: `1px solid ${TOKENS.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${TOKENS.violet}44, ${TOKENS.violetDeep}22)`,
          color: TOKENS.cyan, cursor: 'pointer',
          fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, letterSpacing: 1,
        }}>
          {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </button>
      </div>

      {/* Hero — mascot */}
      <div style={{ position: 'relative', zIndex: 2, margin: '10px 14px 0' }}>
        <NeonPanel style={{ padding: 0, overflow: 'hidden', borderRadius: 20 }} glow={TOKENS.cyan}>
          <div style={{ position: 'relative', aspectRatio: '16 / 11', overflow: 'hidden', borderRadius: 20 }}>
            <img src="assets/mascote.jpeg" alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%',
              filter: 'saturate(1.05) contrast(1.05)',
            }}/>
            {/* top gradient for text legibility */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(5,3,9,0.6) 0%, transparent 35%, transparent 60%, rgba(5,3,9,0.92) 100%)',
            }}/>
            {/* speech bubble — sits above-left, tail aimed at Furacão's beak */}
            <div style={{
              position: 'absolute', top: 10, left: 12, maxWidth: 180, zIndex: 3,
              padding: '10px 14px', borderRadius: 14,
              background: 'rgba(5,3,9,0.82)',
              border: `1px solid ${TOKENS.cyan}66`,
              boxShadow: `0 0 0 1px rgba(34,211,238,0.2) inset, 0 0 20px rgba(34,211,238,0.3)`,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.cyan, letterSpacing: 1.5, marginBottom: 4 }}>FURACÃO</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: TOKENS.white, lineHeight: 1.35, fontWeight: 500 }}>
                Olá, Armada. Já tens bilhete reservado para a próxima batalha?
              </div>
              {/* solid triangle tail close to bubble */}
              <div style={{
                position: 'absolute', bottom: -7, right: 28,
                width: 14, height: 14, transform: 'rotate(45deg)',
                background: 'rgba(5,3,9,0.82)',
                borderRight: `1px solid ${TOKENS.cyan}66`,
                borderBottom: `1px solid ${TOKENS.cyan}66`,
              }}/>
            </div>
            {/* dotted trail from bubble down to beak, overlaid on image */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              pointerEvents: 'none', zIndex: 2,
            }}>
              <path d="M 40 22 Q 44 36 52 46" fill="none"
                stroke={TOKENS.cyan} strokeOpacity="0.55"
                strokeWidth="0.4" strokeDasharray="1 1.4" vectorEffect="non-scaling-stroke"/>
              <circle cx="52" cy="46" r="1.2" fill={TOKENS.cyan} opacity="0.9"/>
              <circle cx="52" cy="46" r="2.2" fill="none" stroke={TOKENS.cyan} strokeOpacity="0.45" strokeWidth="0.3" vectorEffect="non-scaling-stroke"/>
            </svg>
            {/* bottom caption */}
            <div style={{
              position: 'absolute', bottom: 14, left: 16, right: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 2 }}>// BILHETEIRA ONLINE</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: 2, color: TOKENS.white, lineHeight: 1 }}>OPERACIONAL</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 999,
                background: 'rgba(16,245,168,0.12)',
                border: '1px solid rgba(16,245,168,0.4)',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 999, background: TOKENS.success,
                  boxShadow: `0 0 8px ${TOKENS.success}`,
                  animation: 'pulse 1.6s infinite',
                }}/>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.success, letterSpacing: 1.5, fontWeight: 600 }}>LIVE</span>
              </div>
            </div>
          </div>
        </NeonPanel>
      </div>

      {/* Next match card */}
      <div style={{ position: 'relative', zIndex: 2, margin: '14px 14px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 4px 8px',
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 2, textTransform: 'uppercase' }}>▸ Próxima batalha</div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 1.5 }}>T-09D · 14H</div>
        </div>

        <NeonPanel style={{ padding: 16 }} glow={TOKENS.violet}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1.5, marginBottom: 12 }}>
            {match.competition}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            {/* home team */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <TeamCrest size={56} primary="#f5f3ff" secondary="#050309" accent={TOKENS.violet} label="NAC"/>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: TOKENS.white }}>NACIONAL</div>
              <div style={{
                padding: '3px 8px', borderRadius: 4,
                background: `${TOKENS.violet}22`,
                fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.violet, letterSpacing: 1.2, fontWeight: 600,
              }}>CASA</div>
            </div>

            {/* vs */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              minWidth: 70,
            }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 28, fontWeight: 700, color: TOKENS.cyan, letterSpacing: 2, textShadow: `0 0 12px ${TOKENS.cyan}` }}>VS</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.white, letterSpacing: 1.5 }}>{match.time}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1 }}>{match.date}</div>
            </div>

            {/* away team */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <TeamCrest size={56} primary="#ef4444" secondary="#f5f3ff" accent="#ef4444" label="MAR"/>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, letterSpacing: 2, color: TOKENS.white }}>MARÍTIMO</div>
              <div style={{
                padding: '3px 8px', borderRadius: 4,
                background: 'rgba(237,233,254,0.08)',
                fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.2, fontWeight: 600,
              }}>VISIT.</div>
            </div>
          </div>

          {/* venue */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginTop: 14, paddingTop: 12,
            borderTop: `1px dashed ${TOKENS.line}`,
            fontFamily: FONT_MONO, fontSize: 11, color: TOKENS.mutedStrong, letterSpacing: 0.5,
          }}>
            <Icon.pin s={12} c={TOKENS.cyan}/>
            {match.venue} · Bancada Sul
          </div>

          {/* stock meter */}
          <div style={{ marginTop: 12 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1, marginBottom: 5,
            }}>
              <span>STOCK DA CLAQUE</span>
              <span style={{ color: TOKENS.cyan }}>{match.stock} / {match.total}</span>
            </div>
            <div style={{
              height: 5, borderRadius: 999, overflow: 'hidden',
              background: 'rgba(237,233,254,0.08)',
              border: `1px solid ${TOKENS.line}`,
            }}>
              <div style={{
                height: '100%', width: `${(match.stock / match.total) * 100}%`,
                background: `linear-gradient(90deg, ${TOKENS.violet}, ${TOKENS.cyan})`,
                boxShadow: `0 0 10px ${TOKENS.cyan}`,
              }}/>
            </div>
          </div>
        </NeonPanel>
      </div>

      {/* CTAs */}
      <div style={{ position: 'relative', zIndex: 2, padding: '16px 14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <NeonButton onClick={onRequest} icon={<Icon.ticket s={20} c="#fff"/>}>
          Pedir Bilhete
        </NeonButton>
        <div style={{ display: 'flex', gap: 10 }}>
          <NeonButton onClick={onHistory} variant="secondary" icon={<Icon.history s={18}/>} style={{ height: 48, fontSize: 13 }}>
            Histórico
          </NeonButton>
          <NeonButton variant="ghost" icon={<Icon.bolt s={14} c={TOKENS.mutedStrong}/>} style={{ height: 48, fontSize: 13 }}>
            Regulamento
          </NeonButton>
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: 'relative', zIndex: 2, textAlign: 'center', padding: '4px 0 18px',
        fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 2.5,
      }}>
        ∙ AA//2014 · GLÓRIA AOS ALVINEGROS ∙
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen });
