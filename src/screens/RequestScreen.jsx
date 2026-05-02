import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import s from './RequestScreen.module.css';
import { NeonPanel, NeonButton, TeamCrest, GridBackdrop, Scanline } from '../components/atoms.jsx';
import { Icon } from '../components/Icons.jsx';
import { MATCH, PAYMENT } from '../data/mock.js';
import { getInitials } from '../utils/user.js';
import { validateCC } from '../utils/validation.js';

export default function RequestScreen({ onBack, onSubmit, user, status = 'open' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const u = user || { name: 'Bruno Silva', memberId: '2047', tgHandle: '@brunos_md' };
  const isAddingToApproved = status === 'approved';

  const [submitted, setSubmitted] = useState(location.state?.submitted ?? false);

  // Sync submitted state when navigating back/forward (e.g. back from edit mode)
  useEffect(() => {
    if (location.state?.submitted != null) setSubmitted(location.state.submitted);
  }, [location.key]);

  // Form state
  const [beneficiary, setBeneficiary] = useState({ mode: 'self', name: '', doc: '' });
  const [editingBen, setEditingBen] = useState(false);
  const [qty, setQty] = useState(1);
  const [companions, setCompanions] = useState([]);
  const [existingCompanionCount] = useState(() => isAddingToApproved ? 1 : 0);
  const [zone, setZone] = useState('sul');
  const minQty = isAddingToApproved ? existingCompanionCount + 1 : 1;

  // Payment state
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [proofSent, setProofSent] = useState(false);
  const fileInputRef = useRef(null);
  const lastStepRef  = useRef(0);

  function step(delta) {
    const now = Date.now();
    if (now - lastStepRef.current < 150) return;
    lastStepRef.current = now;
    setQty(q => Math.max(minQty, Math.min(6, q + delta)));
  }

  useEffect(() => {
    const needed = Math.max(0, qty - 1);
    setCompanions(prev => {
      if (prev.length === needed) return prev;
      if (prev.length < needed)
        return [...prev, ...Array(needed - prev.length).fill(null).map(() => ({ name: '', doc: '' }))];
      if (isAddingToApproved && needed < existingCompanionCount) return prev;
      return prev.slice(0, needed);
    });
  }, [qty]);

  const updateCompanion = (i, key, val) =>
    setCompanions(prev => prev.map((c, idx) => idx === i ? { ...c, [key]: val } : c));

  function removeCompanion(i) {
    setCompanions(prev => prev.filter((_, idx) => idx !== i));
    setQty(q => q - 1);
  }

  const [errors, setErrors] = useState({});

  const hasFullName = val => val.trim().split(/\s+/).filter(Boolean).length >= 2;
  const maskDoc = val => {
    const v = val.replace(/\s/g, '');
    if (v.length < 3) return v;
    return v[0] + '*'.repeat(v.length - 3) + v.slice(-2);
  };

  const benInitials = beneficiary.mode === 'self'
    ? getInitials(u.name)
    : getInitials(beneficiary.name) || '?';

  function handleSubmit() {
    const newErrors = {};
    companions.forEach((c, i) => {
      if (!hasFullName(c.name))   newErrors[`companion_${i}_name`] = true;
      if (!validateCC(c.doc))    newErrors[`companion_${i}_doc`]  = true;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onSubmit?.();
    setSubmitted(true);
    navigate('/request', { state: { submitted: true }, replace: true });
  }

  function handleCopy() {
    navigator.clipboard.writeText(PAYMENT.mbway.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) setProofFile(file);
  }

  function handleSendProof() {
    setProofSent(true);
  }

  return (
    <div className={s.screen}>
      <GridBackdrop/>
      <Scanline/>

      <div className={s.topBar}>
        <button className={s.backBtn} onClick={onBack}>
          <Icon.back s={18}/>
        </button>
        <div style={{ flex: 1 }}>
          <div className={s.topBarLabel}>PASSO 01 / 02</div>
          <div className={s.topBarTitle}>
            {isAddingToApproved ? 'ADICIONAR BILHETES' : 'NOVO PEDIDO'}
          </div>
        </div>
        <div className={s.matchTag}>{MATCH.home.label} vs {MATCH.away.label}</div>
      </div>

      <div className={s.body}>
        {/* Match strip */}
        <div className={s.matchStrip}>
          <div className={s.matchStripTeams}>
            <TeamCrest size={24} {...MATCH.home}/>
            <span>{MATCH.home.label}</span>
            <span className={s.matchStripVs}>VS</span>
            <span>{MATCH.away.label}</span>
            <TeamCrest size={24} {...MATCH.away}/>
          </div>
          <div className={s.matchStripTime}>{MATCH.dateShort} · {MATCH.time}</div>
        </div>

        {/* Beneficiary */}
        <div className={s.benBox}>
          <div className={s.benRow}>
            <div className={s.benAvatar} data-mode={beneficiary.mode}>{benInitials}</div>
            <div className={s.benInfo}>
              <div className={s.benLabel}>// PEDIDO A NOME DE</div>
              <div className={s.benName}>
                {beneficiary.mode === 'self' ? (
                  <>{u.name.toUpperCase()} <span className={s.benId}>#{u.memberId}</span></>
                ) : (
                  <>{(beneficiary.name || 'OUTRA PESSOA').toUpperCase()}
                    {beneficiary.doc && <span className={s.benId}>{beneficiary.doc}</span>}</>
                )}
              </div>
            </div>
            {!isAddingToApproved && !submitted && (
              <button
                className={s.editBtn}
                data-open={editingBen ? 'true' : 'false'}
                onClick={() => {
                  if (editingBen && beneficiary.mode === 'other') {
                    const newErrors = {};
                    if (!hasFullName(beneficiary.name)) newErrors.benName = true;
                    if (!validateCC(beneficiary.doc))   newErrors.benDoc  = true;
                    if (Object.keys(newErrors).length > 0) { setErrors(e => ({ ...e, ...newErrors })); return; }
                  }
                  setErrors(e => ({ ...e, benName: false, benDoc: false }));
                  setEditingBen(v => !v);
                }}
              >
                {editingBen ? 'Fechar' : 'Alterar'}
              </button>
            )}
          </div>

          {editingBen && (
            <div className={s.benExpanded}>
              <div className={s.modeRow}>
                {[{ id: 'self', label: 'Para mim' }, { id: 'other', label: 'Outra pessoa' }].map(o => (
                  <button
                    key={o.id}
                    className={`${s.modeBtn} ${beneficiary.mode === o.id ? s.active : ''}`}
                    onClick={() => setBeneficiary(b => ({ ...b, mode: o.id }))}
                  >{o.label}</button>
                ))}
              </div>
              {beneficiary.mode === 'other' && (
                <>
                  <div className={s.benNote}>
                    O bilhete fica em nome do beneficiário. Tu (sócio #{u.memberId}) manténs-te responsável pelo pedido.
                  </div>
                  <div className={s.benFields}>
                    <div>
                      <input className={`${s.field} ${s.fieldSm} ${errors.benName ? s.fieldError : ''}`}
                        placeholder="Nome completo do beneficiário"
                        value={beneficiary.name}
                        onChange={e => setBeneficiary(b => ({ ...b, name: e.target.value }))}/>
                      {errors.benName && <div className={s.errorMsg}>Indica nome e apelido</div>}
                    </div>
                    <div>
                      <input className={`${s.field} ${s.fieldSm} ${s.fieldMono} ${errors.benDoc ? s.fieldError : ''}`}
                        placeholder="CC / Doc."
                        value={submitted ? maskDoc(beneficiary.doc) : beneficiary.doc}
                        readOnly={submitted}
                        onChange={e => setBeneficiary(b => ({ ...b, doc: e.target.value }))}/>
                      {errors.benDoc && <div className={s.errorMsg}>Nº CC inválido (ex: 12345678ZZ4)</div>}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quantity */}
        <div className={s.sectionLabel}>// BILHETES</div>
        <NeonPanel style={{ padding: 14, marginBottom: 20 }}>
          <div className={s.qtyRow}>
            <div className={s.qtyInfo}>
              <div className={s.qtyTitle}>QUANTIDADE</div>
              <div className={s.qtySub}>Máx. 6 por sócio · €12/bilhete</div>
            </div>
            <div className={s.stepper}>
              <button className={s.stepperBtn} onClick={() => step(-1)} disabled={submitted}>
                <Icon.minus s={16} c="var(--cyan)"/>
              </button>
              <div className={s.stepperVal}>{qty}</div>
              <button className={s.stepperBtn} onClick={() => step(1)} disabled={submitted}>
                <Icon.plus s={16} c="var(--cyan)"/>
              </button>
            </div>
          </div>
        </NeonPanel>

        {/* Companions */}
        {qty > 1 && (
          <>
            <div className={s.companionsHeader}>
              <div className={s.sectionLabel} style={{ marginBottom: 0 }}>// ACOMPANHANTES · {companions.length}</div>
            </div>
            <div className={s.companionsList}>
              {companions.map((c, i) => {
                const locked = isAddingToApproved && i < existingCompanionCount;
                return (
                  <NeonPanel key={i} style={{ padding: 12 }} glow={locked ? 'var(--muted)' : 'var(--cyan)'}>
                    <div className={s.companionHeader}>
                      <div className={s.companionTitle}>
                        <span className={s.companionNum}>{i + 1}</span>
                        ACOMPANHANTE
                        {locked && <span className={s.lockedBadge}>APROVADO</span>}
                      </div>
                      {!locked && !submitted && (
                        <button className={s.removeBtn} onClick={() => removeCompanion(i)}>
                          <Icon.trash s={14} c="#ef4444"/>
                          Remover
                        </button>
                      )}
                    </div>
                    <div className={s.companionFields}>
                      <div>
                        <input className={`${s.field} ${s.fieldSm} ${locked || submitted ? s.fieldLocked : ''} ${errors[`companion_${i}_name`] ? s.fieldError : ''}`}
                          placeholder="Nome completo" value={c.name} readOnly={locked || submitted}
                          onChange={locked || submitted ? undefined : e => updateCompanion(i, 'name', e.target.value)}/>
                        {errors[`companion_${i}_name`] && <div className={s.errorMsg}>Indica nome e apelido</div>}
                      </div>
                      <div>
                        <input className={`${s.field} ${s.fieldSm} ${s.fieldMono} ${locked || submitted ? s.fieldLocked : ''} ${errors[`companion_${i}_doc`] ? s.fieldError : ''}`}
                          placeholder="CC / Doc." value={locked || submitted ? maskDoc(c.doc) : c.doc} readOnly={locked || submitted}
                          onChange={locked || submitted ? undefined : e => updateCompanion(i, 'doc', e.target.value)}/>
                        {errors[`companion_${i}_doc`] && <div className={s.errorMsg}>Nº CC inválido (ex: 12345678ZZ4)</div>}
                      </div>
                    </div>
                  </NeonPanel>
                );
              })}
            </div>
          </>
        )}

        {/* Summary */}
        <NeonPanel style={{ padding: 14, marginBottom: submitted ? 16 : 20 }} inner>
          <div className={s.summaryRow}>
            <span className={s.summaryKey}>Bilhetes × {qty}</span>

          </div>

          <div className={s.summaryTotal}>
            <span className={s.summaryTotalLabel}>TOTAL</span>
            <span className={s.summaryTotalVal}>€ {(qty * 12 * 0.8).toFixed(2)}</span>
          </div>
        </NeonPanel>

        {/* MBWay — aparece após submissão */}
        {submitted && (
          <NeonPanel style={{ padding: 14 }} glow="var(--warn)">
            <div className={s.payLabel}>// PAGAMENTO MBWAY</div>
            <div className={s.mbwayRow}>
              <div>
                <div className={s.mbwayNum}>{PAYMENT.mbway}</div>
                <div className={s.mbwayTitular}>{PAYMENT.titular}</div>
              </div>
              <button className={`${s.copyBtn} ${copied ? s.copyBtnDone : ''}`} onClick={handleCopy}>
                {copied ? <Icon.check s={16} c="var(--success)"/> : <Icon.copy s={16} c="var(--cyan)"/>}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className={s.payDivider}/>

            {proofSent ? (
              <div className={s.proofSent}>
                <Icon.check s={18} c="var(--success)"/>
                <span>Comprovativo enviado — validação até ao final do dia {PAYMENT.validationDeadline}</span>
              </div>
            ) : (
              <div className={s.uploadSection}>
                <div className={s.uploadHint}>
                  Após o pagamento, envia o comprovativo (imagem ou PDF)
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className={s.fileInput}
                  onChange={handleFileChange}
                />
                {proofFile ? (
                  <div className={s.fileSelected}>
                    <div className={s.fileName}>
                      <Icon.check s={14} c="var(--success)"/>
                      <span>{proofFile.name}</span>
                    </div>
                    <NeonButton onClick={handleSendProof} icon={<Icon.upload s={16} c="#fff"/>}>
                      Enviar comprovativo
                    </NeonButton>
                  </div>
                ) : (
                  <button className={s.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                    <Icon.upload s={18} c="var(--cyan)"/>
                    <span>Selecionar ficheiro</span>
                  </button>
                )}
              </div>
            )}
          </NeonPanel>
        )}
      </div>

      <div className={s.ctaBar}>
        {!submitted ? (
          <NeonButton onClick={handleSubmit} icon={<Icon.ticket s={18} c="#fff"/>}>
            Submeter Pedido
          </NeonButton>
        ) : (
          <>
            <NeonButton onClick={() => navigate('/request', { state: { submitted: false } })} icon={<Icon.edit s={18} c="#fff"/>}>
              Editar pedido
            </NeonButton>
          </>
        )}
      </div>
    </div>
  );
}