// Screen: History — list of past requests

function HistoryScreen({ onBack, onOpenItem }) {
  const items = [
    { id: 'AA-2026-0823', match: 'Nacional vs Marítimo', date: '27 ABR', qty: 2, status: 'pending', zone: 'Sul · Claque' },
    { id: 'AA-2026-0811', match: 'Nacional vs Moreirense', date: '12 ABR', qty: 3, status: 'approved', zone: 'Sul · Claque' },
    { id: 'AA-2026-0792', match: 'Famalicão vs Nacional', date: '05 ABR', qty: 1, status: 'rejected', zone: 'Visitante' },
    { id: 'AA-2026-0774', match: 'Nacional vs Braga', date: '22 MAR', qty: 2, status: 'approved', zone: 'Sul · Claque' },
    { id: 'AA-2026-0761', match: 'Nacional vs Porto', date: '15 MAR', qty: 4, status: 'approved', zone: 'Sul · Claque' },
    { id: 'AA-2026-0738', match: 'Vizela vs Nacional', date: '01 MAR', qty: 1, status: 'rejected', zone: 'Visitante' },
  ];

  const stats = {
    total: 47,
    approved: 38,
    pending: 2,
    rejected: 7,
  };

  return (
    <div style={{
      position: 'relative', minHeight: '100%',
      background: TOKENS.bg, color: TOKENS.white, fontFamily: FONT_BODY,
      overflow: 'hidden',
    }}>
      <GridBackdrop/>
      <Scanline/>

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '16px 18px 14px',
        borderBottom: `1px solid ${TOKENS.line}`,
        background: 'rgba(5,3,9,0.7)',
        backdropFilter: 'blur(8px)',
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(20,8,40,0.6)',
          border: `1px solid ${TOKENS.line}`,
          color: TOKENS.white, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon.back s={18}/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 2 }}>// ARQUIVO DE MISSÕES</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>HISTÓRICO</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '18px 14px 20px' }}>
        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 18 }}>
          {[
            { k: 'Total', v: stats.total, c: TOKENS.white },
            { k: 'Aprov.', v: stats.approved, c: TOKENS.success },
            { k: 'Pend.', v: stats.pending, c: TOKENS.warn },
            { k: 'Rec.', v: stats.rejected, c: TOKENS.danger },
          ].map(s => (
            <div key={s.k} style={{
              padding: '10px 6px', borderRadius: 10,
              background: 'rgba(20,8,40,0.6)',
              border: `1px solid ${TOKENS.line}`,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700,
                color: s.c, lineHeight: 1,
                textShadow: s.c !== TOKENS.white ? `0 0 10px ${s.c}66` : 'none',
              }}>{s.v}</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.2, marginTop: 4, textTransform: 'uppercase' }}>{s.k}</div>
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto' }}>
          {['Todos', 'Aprovados', 'Pendentes', 'Recusados'].map((f, i) => (
            <div key={f} style={{
              padding: '6px 12px', borderRadius: 999, flexShrink: 0,
              background: i === 0 ? `${TOKENS.violet}33` : 'rgba(20,8,40,0.6)',
              border: i === 0 ? `1px solid ${TOKENS.violet}` : `1px solid ${TOKENS.line}`,
              color: i === 0 ? TOKENS.white : TOKENS.muted,
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.2, fontWeight: 600,
              textTransform: 'uppercase', cursor: 'pointer',
            }}>{f}</div>
          ))}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((it, idx) => {
            const statusColor = {
              pending: TOKENS.warn, approved: TOKENS.success, rejected: TOKENS.danger,
            }[it.status];
            return (
              <div key={it.id} onClick={() => onOpenItem && onOpenItem(it)} style={{
                position: 'relative',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'linear-gradient(180deg, rgba(20,8,40,0.65), rgba(8,4,20,0.8))',
                border: `1px solid ${TOKENS.line}`,
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer',
              }}>
                {/* Date block */}
                <div style={{
                  width: 42, textAlign: 'center', flexShrink: 0,
                  padding: '6px 0', borderRadius: 8,
                  background: `${statusColor}12`,
                  border: `1px solid ${statusColor}44`,
                }}>
                  <div style={{
                    fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700,
                    color: statusColor, letterSpacing: 0.5, lineHeight: 1,
                  }}>{it.date.split(' ')[0]}</div>
                  <div style={{
                    fontFamily: FONT_MONO, fontSize: 8, color: TOKENS.muted,
                    letterSpacing: 1, marginTop: 3,
                  }}>{it.date.split(' ')[1]}</div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13, letterSpacing: 1,
                    color: TOKENS.white, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{it.match.toUpperCase()}</div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1,
                  }}>
                    <span>{it.id}</span>
                    <span style={{ width: 3, height: 3, borderRadius: 999, background: TOKENS.muted }}/>
                    <span>{it.qty}× · {it.zone}</span>
                  </div>
                </div>

                {/* Status dot + chevron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: 999, background: statusColor,
                    boxShadow: `0 0 8px ${statusColor}`,
                    animation: it.status === 'pending' ? 'pulse 1.6s infinite' : 'none',
                  }}/>
                  <Icon.chevron s={14} c={TOKENS.muted}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* End note */}
        <div style={{
          textAlign: 'center', marginTop: 18,
          fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 2,
        }}>
          ∙ FIM DO ARQUIVO · AA//2014 ∙
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HistoryScreen });
