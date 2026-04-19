// Screen: Request — form for ticket request

function RequestScreen({ onBack, onSubmit, user }) {
  const u = user || { name: 'Bruno Silva', memberId: '2047', tgHandle: '@brunos_md' };
  const [beneficiary, setBeneficiary] = React.useState({ mode: 'self', name: '', doc: '' });
  const [editingBen, setEditingBen] = React.useState(false);
  const [qty, setQty] = React.useState(2);
  const [companions, setCompanions] = React.useState([
    { name: 'Marta Silva', doc: '14528790' },
  ]);
  const [zone, setZone] = React.useState('sul');

  // sync companions length with qty - 1
  React.useEffect(() => {
    const needed = Math.max(0, qty - 1);
    setCompanions(prev => {
      if (prev.length === needed) return prev;
      if (prev.length < needed) {
        return [...prev, ...Array(needed - prev.length).fill(null).map(() => ({ name: '', doc: '' }))];
      }
      return prev.slice(0, needed);
    });
  }, [qty]);

  const updateCompanion = (i, key, val) => {
    setCompanions(prev => prev.map((c, idx) => idx === i ? { ...c, [key]: val } : c));
  };

  const fieldStyle = {
    width: '100%', height: 46, padding: '0 14px',
    background: 'rgba(8,4,20,0.7)',
    border: `1px solid ${TOKENS.line}`,
    borderRadius: 10,
    color: TOKENS.white,
    fontFamily: FONT_BODY, fontSize: 14,
    outline: 'none',
    boxShadow: `inset 0 0 0 1px rgba(34,211,238,0.04)`,
  };

  const labelStyle = {
    display: 'block',
    fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1.5,
    color: TOKENS.cyan, textTransform: 'uppercase',
    marginBottom: 6, fontWeight: 600,
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
          color: TOKENS.white,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <Icon.back s={18}/>
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, letterSpacing: 2 }}>PASSO 01 / 01</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>NOVO PEDIDO</div>
        </div>
        <div style={{
          padding: '4px 8px', borderRadius: 4,
          background: `${TOKENS.violet}22`, border: `1px solid ${TOKENS.violet}55`,
          fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.violet, letterSpacing: 1,
        }}>
          NAC vs MAR
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '18px 14px 120px' }}>
        {/* Match recap strip */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px', marginBottom: 18,
          borderRadius: 10,
          background: 'linear-gradient(90deg, rgba(168,85,247,0.12), rgba(34,211,238,0.08))',
          border: `1px solid ${TOKENS.line}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TeamCrest size={24} label="NAC"/>
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12, letterSpacing: 1.5 }}>NAC</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted }}>VS</span>
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 12, letterSpacing: 1.5 }}>MAR</span>
            <TeamCrest size={24} primary="#ef4444" secondary="#f5f3ff" accent="#ef4444" label="MAR"/>
          </div>
          <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.mutedStrong, letterSpacing: 1 }}>
            27·04 · 20:30
          </div>
        </div>

        {/* Beneficiary chip — editable */}
        <div style={{
          padding: '10px 12px', marginBottom: 18,
          borderRadius: 12,
          background: 'rgba(20,8,40,0.6)',
          border: `1px dashed ${TOKENS.cyan}44`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: beneficiary.mode === 'self'
                ? `linear-gradient(135deg, ${TOKENS.violet}, ${TOKENS.violetDeep})`
                : `linear-gradient(135deg, ${TOKENS.cyan}88, ${TOKENS.cyanDeep}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: '#fff',
              border: `1px solid ${TOKENS.cyan}66`,
            }}>
              {beneficiary.mode === 'self'
                ? u.name.split(' ').map(n => n[0]).slice(0, 2).join('')
                : (beneficiary.name || 'OUT').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.cyan, letterSpacing: 1.5 }}>// PEDIDO A NOME DE</div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: TOKENS.white, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {beneficiary.mode === 'self' ? (
                  <>{u.name.toUpperCase()} <span style={{ color: TOKENS.cyan, fontSize: 11, marginLeft: 4 }}>#{u.memberId}</span></>
                ) : (
                  <>{(beneficiary.name || 'OUTRA PESSOA').toUpperCase()}{beneficiary.doc && <span style={{ color: TOKENS.cyan, fontSize: 11, marginLeft: 6 }}>{beneficiary.doc}</span>}</>
                )}
              </div>
            </div>
            <button onClick={() => setEditingBen(v => !v)} style={{
              padding: '5px 10px', borderRadius: 8,
              background: editingBen ? `${TOKENS.cyan}22` : 'rgba(34,211,238,0.08)',
              border: `1px solid ${TOKENS.cyan}55`,
              color: TOKENS.cyan, cursor: 'pointer',
              fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1, fontWeight: 600, textTransform: 'uppercase',
            }}>{editingBen ? 'Fechar' : 'Alterar'}</button>
          </div>

          {editingBen && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px dashed ${TOKENS.line}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
                {[
                  { id: 'self', label: 'Para mim' },
                  { id: 'other', label: 'Outra pessoa' },
                ].map(o => {
                  const active = beneficiary.mode === o.id;
                  return (
                    <button key={o.id} onClick={() => setBeneficiary(b => ({ ...b, mode: o.id }))} style={{
                      padding: '9px 8px', borderRadius: 10,
                      background: active ? `linear-gradient(180deg, ${TOKENS.violet}33, ${TOKENS.violetDeep}22)` : 'rgba(8,4,20,0.7)',
                      border: active ? `1px solid ${TOKENS.violet}` : `1px solid ${TOKENS.line}`,
                      color: active ? TOKENS.white : TOKENS.mutedStrong,
                      cursor: 'pointer',
                      fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, letterSpacing: 1,
                      boxShadow: active ? `0 0 14px rgba(168,85,247,0.3)` : 'none',
                    }}>{o.label}</button>
                  );
                })}
              </div>
              {beneficiary.mode === 'other' && (
                <>
                  <div style={{ fontFamily: FONT_MONO, fontSize: 9, color: TOKENS.muted, letterSpacing: 1.2, lineHeight: 1.4, marginBottom: 8 }}>
                    O bilhete fica em nome do beneficiário. Tu (sócio #{u.memberId}) manténs-te responsável pelo pedido.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 6 }}>
                    <input placeholder="Nome do beneficiário"
                      value={beneficiary.name}
                      onChange={e => setBeneficiary(b => ({ ...b, name: e.target.value }))}
                      style={{ ...fieldStyle, height: 40, fontSize: 13 }}/>
                    <input placeholder="CC / Doc."
                      value={beneficiary.doc}
                      onChange={e => setBeneficiary(b => ({ ...b, doc: e.target.value }))}
                      style={{ ...fieldStyle, height: 40, fontSize: 13, fontFamily: FONT_MONO }}/>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div style={{
          fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 2,
          color: TOKENS.muted, marginBottom: 10,
        }}>// BILHETES</div>

        <NeonPanel style={{ padding: 14, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, letterSpacing: 1.5 }}>QUANTIDADE</div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.muted, marginTop: 2 }}>Máx. 6 por sócio · €12/bilhete</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0,
              border: `1px solid ${TOKENS.cyan}66`,
              borderRadius: 10, overflow: 'hidden',
              boxShadow: `0 0 0 1px rgba(34,211,238,0.1) inset, 0 0 12px rgba(34,211,238,0.12)`,
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={stepperBtnStyle}>
                <Icon.minus s={16} c={TOKENS.cyan}/>
              </button>
              <div style={{
                width: 44, textAlign: 'center',
                fontFamily: FONT_DISPLAY, fontSize: 22, fontWeight: 700,
                color: TOKENS.white, letterSpacing: 1,
                background: 'rgba(34,211,238,0.05)',
                lineHeight: '38px',
              }}>{qty}</div>
              <button onClick={() => setQty(q => Math.min(6, q + 1))} style={stepperBtnStyle}>
                <Icon.plus s={16} c={TOKENS.cyan}/>
              </button>
            </div>
          </div>

          {/* Zone picker */}
          <div style={{ marginTop: 14 }}>
            <div style={{ ...labelStyle, marginBottom: 8 }}>Setor</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {[
                { id: 'sul', label: 'Sul', tag: 'CLAQUE' },
                { id: 'nascente', label: 'Nascente', tag: 'FAMÍLIA' },
                { id: 'topo', label: 'Topo Norte', tag: 'LIVRE' },
              ].map(z => {
                const active = zone === z.id;
                return (
                  <button key={z.id} onClick={() => setZone(z.id)} style={{
                    padding: '10px 6px', borderRadius: 10,
                    background: active ? `linear-gradient(180deg, ${TOKENS.violet}33, ${TOKENS.violetDeep}22)` : 'rgba(8,4,20,0.7)',
                    border: active ? `1px solid ${TOKENS.violet}` : `1px solid ${TOKENS.line}`,
                    color: active ? TOKENS.white : TOKENS.mutedStrong,
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    boxShadow: active ? `0 0 18px rgba(168,85,247,0.35)` : 'none',
                  }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>{z.label}</span>
                    <span style={{ fontFamily: FONT_MONO, fontSize: 8, color: active ? TOKENS.cyan : TOKENS.muted, letterSpacing: 1 }}>{z.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </NeonPanel>

        {/* Companions */}
        {qty > 1 && (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: 10,
            }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 2, color: TOKENS.muted }}>
                // ACOMPANHANTES · {companions.length}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {companions.map((c, i) => (
                <NeonPanel key={i} style={{ padding: 12 }} glow={TOKENS.cyan}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontFamily: FONT_MONO, fontSize: 10, color: TOKENS.cyan, letterSpacing: 1.5,
                    }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: 4,
                        background: `${TOKENS.cyan}22`, border: `1px solid ${TOKENS.cyan}55`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700,
                      }}>{i + 1}</span>
                      ACOMPANHANTE
                    </div>
                    <button onClick={() => setQty(q => q - 1)} style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: TOKENS.muted, display: 'flex', alignItems: 'center', gap: 4,
                      fontFamily: FONT_MONO, fontSize: 10, letterSpacing: 1,
                    }}>
                      <Icon.trash s={12}/>
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 8 }}>
                    <input placeholder="Nome" value={c.name} onChange={e => updateCompanion(i, 'name', e.target.value)} style={{ ...fieldStyle, height: 40, fontSize: 13 }}/>
                    <input placeholder="CC / Doc." value={c.doc} onChange={e => updateCompanion(i, 'doc', e.target.value)} style={{ ...fieldStyle, height: 40, fontSize: 13, fontFamily: FONT_MONO }}/>
                  </div>
                </NeonPanel>
              ))}
            </div>
          </>
        )}

        {/* Summary */}
        <NeonPanel style={{ padding: 14, marginBottom: 20 }} inner>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: TOKENS.muted, letterSpacing: 1 }}>Bilhetes × {qty}</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: TOKENS.white }}>€ {(qty * 12).toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: 11, color: TOKENS.muted, letterSpacing: 1 }}>Desc. sócio (20%)</span>
            <span style={{ fontFamily: FONT_MONO, fontSize: 12, color: TOKENS.cyan }}>− € {(qty * 12 * 0.2).toFixed(2)}</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 10, borderTop: `1px dashed ${TOKENS.line}`,
          }}>
            <span style={{ fontFamily: FONT_DISPLAY, fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>TOTAL</span>
            <span style={{
              fontFamily: FONT_DISPLAY, fontSize: 24, fontWeight: 700,
              color: TOKENS.cyan, letterSpacing: 1,
              textShadow: `0 0 10px ${TOKENS.cyan}88`,
            }}>€ {(qty * 12 * 0.8).toFixed(2)}</span>
          </div>
        </NeonPanel>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
        padding: '12px 14px 18px',
        background: 'linear-gradient(180deg, transparent, rgba(5,3,9,0.95) 30%)',
      }}>
        <NeonButton onClick={() => onSubmit({ beneficiary, socio: u, qty, companions, zone })} icon={<Icon.ticket s={18} c="#fff"/>}>
          Submeter Pedido
        </NeonButton>
      </div>
    </div>
  );
}

const stepperBtnStyle = {
  width: 38, height: 38, border: 'none', cursor: 'pointer',
  background: 'rgba(34,211,238,0.06)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};

Object.assign(window, { RequestScreen });
