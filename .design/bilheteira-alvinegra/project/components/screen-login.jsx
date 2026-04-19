// Screen: Login — Telegram-style auth + member number

function LoginScreen({ onLogin }) {
  const [step, setStep] = React.useState(1); // 1: telegram, 2: member verify
  const [memberId, setMemberId] = React.useState('');
  const [pin, setPin] = React.useState(['', '', '', '']);
  const [loading, setLoading] = React.useState(false);

  const fieldStyle = {
    width: '100%', height: 52, padding: '0 16px',
    background: 'rgba(8,4,20,0.7)',
    border: `1px solid ${TOKENS.line}`,
    borderRadius: 12,
    color: TOKENS.white,
    fontFamily: FONT_MONO, fontSize: 16, letterSpacing: 2,
    outline: 'none',
    textAlign: 'center',
  };

  const updatePin = (i, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    setPin(prev => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
    if (v && i < 3) {
      const nextInput = document.getElementById(`pin-${i+1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const connectTelegram = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 900);
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: 'Bruno Silva',
        memberId: memberId || '2047',
        tgHandle: '@brunos_md',
        since: 2018,
      });
    }, 900);
  };

  return (
    <div style={{
      position: 'relative', minHeight: '100%',
      background: TOKENS.bg, color: TOKENS.white,
      fontFamily: FONT_BODY, overflow: 'hidden',
    }}>
      <GridBackdrop/>
      <Scanline/>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 380, height: 380, borderRadius: 999,
        background: `radial-gradient(circle, ${TOKENS.violet}25, transparent 65%)`,
        pointerEvents: 'none', zIndex: 1,
      }}/>

      <div style={{
        position: 'relative', zIndex: 2,
        padding: '28px 20px 20px',
        display: 'flex', flexDirection: 'column',
        minHeight: '100%',
      }}>
        {/* Crest + wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, marginBottom: 18 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -14, borderRadius: 999,
              background: `radial-gradient(circle, ${TOKENS.cyan}33, transparent 70%)`,
              filter: 'blur(8px)',
            }}/>
            <ArmadaCrest size={72}/>
          </div>
          <div style={{
            fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: 4,
            color: TOKENS.white, marginTop: 14,
            textShadow: `0 0 14px ${TOKENS.cyan}55`,
          }}>ARMADA ALVINEGRA</div>
          <div style={{
            fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan,
            letterSpacing: 2.5, marginTop: 4,
          }}>// BILHETEIRA · DESDE 2014</div>
        </div>

        {/* Mascote mini */}
        <div style={{ margin: '0 auto 18px', width: 180, borderRadius: 14, overflow: 'hidden', border: `1px solid ${TOKENS.cyan}55`, boxShadow: `0 0 24px ${TOKENS.cyan}33` }}>
          <div style={{ position: 'relative', aspectRatio: '16 / 9' }}>
            <img src="assets/mascote.jpeg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,3,9,0.1), rgba(5,3,9,0.75))' }}/>
            <div style={{
              position: 'absolute', bottom: 8, left: 10, right: 10,
              fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.cyan, letterSpacing: 1.2, lineHeight: 1.3,
            }}>
              "{step === 1 ? 'Identifica-te, alvinegro.' : 'Confirma o nº de sócio.'}"
            </div>
          </div>
        </div>

        {/* Step panel */}
        <NeonPanel style={{ padding: 18 }} glow={TOKENS.violet}>
          {step === 1 && (
            <>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 2, marginBottom: 6 }}>// PASSO 01/02</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>ENTRAR VIA TELEGRAM</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: TOKENS.mutedStrong, lineHeight: 1.5, marginBottom: 18 }}>
                Autentica-te com a tua conta Telegram. É rápido e não guardamos palavras-passe.
              </div>

              <button onClick={connectTelegram} disabled={loading} style={{
                width: '100%', height: 56, borderRadius: 14,
                background: loading ? 'rgba(34,211,238,0.1)' : `linear-gradient(180deg, #2AABEE, #229ED9)`,
                color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 15, letterSpacing: 1.5,
                textTransform: 'uppercase',
                cursor: loading ? 'wait' : 'pointer',
                boxShadow: '0 8px 24px rgba(42,171,238,0.4), inset 0 0 0 1px rgba(255,255,255,0.15)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                </svg>
                {loading ? 'A conectar…' : 'Continuar com Telegram'}
              </button>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                margin: '14px 0 10px',
                fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.5,
              }}>
                <div style={{ flex: 1, height: 1, background: TOKENS.line }}/>
                OU
                <div style={{ flex: 1, height: 1, background: TOKENS.line }}/>
              </div>

              <button style={{
                width: '100%', height: 46, borderRadius: 12,
                background: 'transparent',
                color: TOKENS.mutedStrong, border: `1px solid ${TOKENS.line}`,
                fontFamily: FONT_MONO, fontSize: 11, letterSpacing: 1.5, fontWeight: 600,
                cursor: 'pointer', textTransform: 'uppercase',
              }}>
                Entrar com email
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 2, marginBottom: 6 }}>// PASSO 02/02</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>VERIFICAR SÓCIO</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: 12.5, color: TOKENS.mutedStrong, lineHeight: 1.5, marginBottom: 16 }}>
                Introduz o teu nº de sócio da Armada Alvinegra para associar esta conta.
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{
                  display: 'block', fontFamily: FONT_MONO, fontSize: 10,
                  color: TOKENS.cyan, letterSpacing: 1.5, marginBottom: 6,
                  textTransform: 'uppercase',
                }}>Nº de sócio</label>
                <input
                  value={memberId}
                  onChange={e => setMemberId(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="0000"
                  style={{ ...fieldStyle, fontFamily: FONT_DISPLAY, fontSize: 22, letterSpacing: 6, fontWeight: 700 }}
                />
              </div>

              <NeonButton onClick={verify} disabled={loading || memberId.length < 3} style={{ height: 52 }}>
                {loading ? 'A validar…' : 'Entrar na Bilheteira'}
              </NeonButton>

              <button onClick={() => setStep(1)} style={{
                width: '100%', marginTop: 10,
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted,
                letterSpacing: 1.5, textTransform: 'uppercase',
              }}>
                ← Voltar
              </button>
            </>
          )}
        </NeonPanel>

        <div style={{ flex: 1 }}/>

        <div style={{
          textAlign: 'center', paddingTop: 16,
          fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 2,
        }}>
          ∙ AA//2014 · GLÓRIA AOS ALVINEGROS ∙
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });
