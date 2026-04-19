// Screen: Confirmation — pending / approved / rejected states

function ConfirmationScreen({ onHome, onHistory, status = 'pending' }) {
  const states = {
    pending: {
      color: TOKENS.warn,
      glow: TOKENS.warn,
      headline: 'PEDIDO EM ANÁLISE',
      sub: 'O Furacão está a carimbar o teu pedido',
      mood: 'A direção tem 24h úteis para validar. Recebes notificação no Telegram.',
      mascotFilter: 'hue-rotate(-20deg) saturate(0.9) brightness(0.95)',
      quote: 'Aguenta aí, Armada — estamos a conferir a lista.',
      imagePos: 'center 30%',
    },
    approved: {
      color: TOKENS.success,
      glow: TOKENS.success,
      headline: 'BILHETE GARANTIDO',
      sub: 'Vemo-nos na bancada, alvinegro',
      mood: 'QR Code e detalhes enviados. Entrada pela Porta 7, Bancada Sul.',
      mascotFilter: 'hue-rotate(80deg) saturate(1.2) brightness(1.05)',
      quote: 'Bem-vindo à Armada. Faz barulho por nós.',
      imagePos: 'center 30%',
    },
    rejected: {
      color: TOKENS.danger,
      glow: TOKENS.danger,
      headline: 'PEDIDO RECUSADO',
      sub: 'Lotação esgotada no teu setor',
      mood: 'Podes tentar Topo Norte ou inscrever-te na lista de espera.',
      mascotFilter: 'hue-rotate(-60deg) saturate(0.7) brightness(0.85) contrast(1.05)',
      quote: 'Não desanimes. Próxima batalha é certa.',
      imagePos: 'center 30%',
    },
  };
  const s = states[status];

  const ref = 'AA-2026-' + (status === 'approved' ? '0821' : status === 'rejected' ? '0819' : '0823');

  return (
    <div style={{
      position: 'relative', minHeight: '100%',
      background: TOKENS.bg, color: TOKENS.white,
      fontFamily: FONT_BODY, overflow: 'hidden',
    }}>
      <GridBackdrop/>
      <Scanline/>

      {/* ambient glow */}
      <div style={{
        position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
        width: 340, height: 340, borderRadius: 999,
        background: `radial-gradient(circle, ${s.glow}22, transparent 65%)`,
        pointerEvents: 'none', zIndex: 1,
      }}/>

      <div style={{ position: 'relative', zIndex: 2, padding: '20px 14px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 2 }}>// REF · {ref}</div>
          <StatusChip status={status}/>
        </div>

        {/* Mascot reaction */}
        <NeonPanel style={{ padding: 0, overflow: 'hidden', borderRadius: 20 }} glow={s.glow}>
          <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 20 }}>
            <img src="assets/mascote.jpeg" alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover', objectPosition: s.imagePos,
              filter: s.mascotFilter, transition: 'filter 0.5s ease',
            }}/>
            {/* colored overlay tint */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(180deg, ${s.color}08 0%, transparent 30%, transparent 55%, rgba(5,3,9,0.95) 100%)`,
              mixBlendMode: 'screen',
            }}/>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(5,3,9,0.3) 0%, transparent 35%, transparent 55%, rgba(5,3,9,0.95) 100%)',
            }}/>

            {/* huge status icon badge */}
            <div style={{
              position: 'absolute', top: 16, left: 16,
              width: 52, height: 52, borderRadius: 16,
              background: 'rgba(5,3,9,0.82)',
              border: `1.5px solid ${s.color}`,
              boxShadow: `0 0 24px ${s.color}66, inset 0 0 0 1px ${s.color}22`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color,
              animation: status === 'pending' ? 'pulseBadge 2s infinite' : 'none',
            }}>
              {status === 'approved' && <Icon.check s={26} c={s.color}/>}
              {status === 'rejected' && <Icon.x s={26} c={s.color}/>}
              {status === 'pending' && <Icon.clock s={26} c={s.color}/>}
            </div>

            {/* speech bubble */}
            <div style={{
              position: 'absolute', bottom: 74, left: 16, right: 16,
              padding: '10px 14px', borderRadius: 14,
              background: 'rgba(5,3,9,0.85)',
              border: `1px solid ${s.color}66`,
              boxShadow: `0 0 20px ${s.color}33, inset 0 0 0 1px ${s.color}22`,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: s.color, letterSpacing: 1.5, marginBottom: 3 }}>FURACÃO DIZ</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 13, color: TOKENS.white, lineHeight: 1.35, fontWeight: 500 }}>
                {s.quote}
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: s.color, letterSpacing: 2, marginBottom: 2 }}>
                ▸ ESTADO DO PEDIDO
              </div>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, letterSpacing: 2,
                color: TOKENS.white, lineHeight: 1,
                textShadow: `0 0 16px ${s.color}99`,
              }}>{s.headline}</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12, color: TOKENS.mutedStrong, marginTop: 4 }}>{s.sub}</div>
            </div>
          </div>
        </NeonPanel>

        {/* Details */}
        <NeonPanel style={{ padding: 14, marginTop: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Jogo', 'Nacional vs Marítimo'],
              ['Data', '27 ABR 2026 · 20:30'],
              ['Setor', 'Bancada Sul · Claque'],
              ['Quantidade', '2 bilhetes'],
              ['Total', '€ 19,20'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1.5, textTransform: 'uppercase' }}>{k}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: TOKENS.white, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${TOKENS.line}`,
            fontFamily: FONT_BODY, fontSize: 12, color: TOKENS.mutedStrong, lineHeight: 1.5,
          }}>
            {s.mood}
          </div>
        </NeonPanel>

        {/* QR on approved */}
        {status === 'approved' && (
          <NeonPanel style={{ padding: 14, marginTop: 14 }} glow={TOKENS.cyan} inner>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 90, height: 90, borderRadius: 10,
                background: '#f5f3ff',
                padding: 8, flexShrink: 0,
                boxShadow: `0 0 18px ${TOKENS.cyan}55`,
              }}>
                {/* faux QR */}
                <svg viewBox="0 0 25 25" width="100%" height="100%">
                  {[...Array(625)].map((_, i) => {
                    const x = i % 25, y = Math.floor(i / 25);
                    const corner = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17);
                    const rand = ((x * 37 + y * 53) % 7) < 3;
                    if (!corner && !rand) return null;
                    return <rect key={i} x={x} y={y} width="1" height="1" fill="#050309"/>;
                  })}
                  {/* finder patterns */}
                  {[[0,0],[18,0],[0,18]].map(([fx, fy], i) => (
                    <g key={i}>
                      <rect x={fx} y={fy} width="7" height="7" fill="#050309"/>
                      <rect x={fx+1} y={fy+1} width="5" height="5" fill="#f5f3ff"/>
                      <rect x={fx+2} y={fy+2} width="3" height="3" fill="#050309"/>
                    </g>
                  ))}
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 1.5, marginBottom: 4 }}>// BILHETE DIGITAL</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 16, fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>APRESENTA NA ENTRADA</div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, lineHeight: 1.5 }}>Porta 7 · Sul<br/>Ativo desde 19:00</div>
              </div>
            </div>
          </NeonPanel>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          <NeonButton onClick={onHome}>Voltar ao início</NeonButton>
          <NeonButton onClick={onHistory} variant="secondary" style={{ height: 48, fontSize: 13 }}>
            Ver histórico
          </NeonButton>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ConfirmationScreen });
