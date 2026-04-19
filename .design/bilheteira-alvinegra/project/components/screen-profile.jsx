// Screen: Profile — member card + stats + settings

function ProfileScreen({ onBack, onLogout, user }) {
  const u = user || { name: 'Bruno Silva', memberId: '2047', tgHandle: '@brunos_md', since: 2018 };

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
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 2 }}>// CARTÃO DE SÓCIO</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>PERFIL</div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '18px 14px 20px' }}>
        {/* Member card */}
        <NeonPanel style={{ padding: 0, overflow: 'hidden', borderRadius: 18 }} glow={TOKENS.violet}>
          <div style={{
            position: 'relative',
            background: `
              radial-gradient(ellipse at top right, ${TOKENS.violet}33, transparent 60%),
              radial-gradient(ellipse at bottom left, ${TOKENS.cyan}22, transparent 60%),
              linear-gradient(180deg, rgba(20,8,40,0.9), rgba(8,4,20,0.98))
            `,
            padding: 18,
          }}>
            {/* stripes */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 60, opacity: 0.08,
              backgroundImage: 'repeating-linear-gradient(90deg, #f5f3ff 0 6px, transparent 6px 12px)',
            }}/>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
              {/* Avatar */}
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: `linear-gradient(135deg, ${TOKENS.violet}, ${TOKENS.violetDeep})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${TOKENS.cyan}`,
                boxShadow: `0 0 18px ${TOKENS.cyan}55`,
                fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700,
                color: '#fff', letterSpacing: 1,
              }}>
                {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.cyan, letterSpacing: 2, marginBottom: 3 }}>SÓCIO ATIVO</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 19, fontWeight: 700, letterSpacing: 1.5, lineHeight: 1.1 }}>
                  {u.name.toUpperCase()}
                </div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.mutedStrong, letterSpacing: 1, marginTop: 4 }}>
                  {u.tgHandle}
                </div>
              </div>
            </div>

            {/* Member ID — large */}
            <div style={{
              marginTop: 18, paddingTop: 14,
              borderTop: `1px dashed ${TOKENS.line}`,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.8 }}>// Nº DE SÓCIO</div>
                <div style={{
                  fontFamily: FONT_DISPLAY, fontSize: 36, fontWeight: 700, letterSpacing: 4,
                  color: TOKENS.white, lineHeight: 1,
                  textShadow: `0 0 12px ${TOKENS.cyan}77`,
                }}>#{u.memberId}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.5 }}>MEMBRO DESDE</div>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 700, color: TOKENS.cyan, letterSpacing: 1.5 }}>{u.since}</div>
              </div>
            </div>
          </div>
        </NeonPanel>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginTop: 14 }}>
          <div style={{
            padding: '14px 16px', borderRadius: 12,
            background: 'rgba(20,8,40,0.6)',
            border: `1px solid ${TOKENS.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.5, textTransform: 'uppercase' }}>// Jogos com bilhete</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: TOKENS.white, letterSpacing: 1, lineHeight: 1, marginTop: 4 }}>47</div>
            </div>
            <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 1 }}>época 25/26
            </div>
          </div>
        </div>

        {/* Personal data section */}
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 2,
          color: TOKENS.muted, marginTop: 18, marginBottom: 8,
        }}>// DADOS PESSOAIS</div>

        <NeonPanel style={{ padding: 0, overflow: 'hidden' }}>
          {[
            ['Email', 'bruno.silva@mail.pt'],
            ['Contacto', '+351 926 •••876'],
            ['CC / Doc.', '14•••••0·Z'],
            ['Notificações', 'Telegram ativo'],
          ].map(([k, v], i, arr) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 14px',
              borderBottom: i < arr.length - 1 ? `1px solid ${TOKENS.line}` : 'none',
            }}>
              <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 1.5, textTransform: 'uppercase' }}>{k}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: 13, color: TOKENS.white }}>{v}</span>
                <Icon.chevron s={12} c={TOKENS.muted}/>
              </span>
            </div>
          ))}
        </NeonPanel>

        {/* Logout */}
        <button onClick={onLogout} style={{
          width: '100%', marginTop: 20,
          padding: '14px',
          background: 'rgba(251,113,133,0.08)',
          border: `1px solid ${TOKENS.danger}44`,
          borderRadius: 12,
          color: TOKENS.danger,
          fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Terminar sessão
        </button>

        <div style={{
          textAlign: 'center', marginTop: 16,
          fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 2,
        }}>
          ∙ AA//2014 · app v0.1 ∙
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
