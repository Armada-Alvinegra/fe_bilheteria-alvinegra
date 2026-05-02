import { useState } from 'react';
import s from './LoginScreen.module.css';
import { ArmadaCrest, GridBackdrop, Scanline, NeonPanel, NeonButton } from '../components/atoms.jsx';
import { getTelegramUser } from '../telegram.js';

export default function LoginScreen({ onLogin }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [memberId, setMemberId] = useState('');
  const [loading, setLoading] = useState(false);

  const connectTelegram = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const tgUser = getTelegramUser();
      if (tgUser) {
        onLogin({ name: tgUser.name, tgHandle: tgUser.tgHandle, memberId: null, since: null });
      } else {
        setStep(2);
      }
    }, 300);
  };

  const verify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: name.trim() || 'Alvinegro', memberId: memberId || null, tgHandle: '', since: null });
    }, 600);
  };

  return (
    <div className={s.screen}>
      <GridBackdrop/>
      <Scanline/>
      <div className={s.ambientGlow}/>

      <div className={s.inner}>
        <div className={s.header}>
          <div className={s.crestWrap}>
            <div className={s.crestGlow}/>
            <ArmadaCrest size={72}/>
          </div>
          <div className={s.wordmark}>ARMADA ALVINEGRA</div>
          <div className={s.tagline}>// BILHETEIRA · DESDE 2014</div>
        </div>

        <div className={s.mascotMini}>
          <div className={s.mascotRatio}>
            <img src="/assets/mascote.jpeg" alt=""/>
            <div className={s.mascotOverlay}/>
            <div className={s.mascotCaption}>
              "{step === 1 ? 'Identifica-te, alvinegro.' : 'Confirma os teus dados.'}"
            </div>
          </div>
        </div>

        <NeonPanel style={{ padding: 18 }} glow="var(--violet)">
          {step === 1 && (
            <div className={s.step}>
              <div className={s.stepLabel}>// PASSO 01/02</div>
              <div className={s.stepTitle}>ENTRAR VIA TELEGRAM</div>
              <div className={s.stepDesc}>
                Autentica-te com a tua conta Telegram. É rápido e não guardamos palavras-passe.
              </div>

              <button className={s.tgBtn} onClick={connectTelegram} disabled={loading}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                </svg>
                {loading ? 'A conectar…' : 'Continuar com Telegram'}
              </button>

              <div className={s.divider}>
                <div className={s.dividerLine}/>OU<div className={s.dividerLine}/>
              </div>

              <button className={s.emailBtn}>Entrar com email</button>
            </div>
          )}

          {step === 2 && (
            <div className={s.step}>
              <div className={s.stepLabel}>// PASSO 02/02</div>
              <div className={s.stepTitle}>DADOS DE ACESSO</div>
              <div className={s.stepDesc}>
                Introduz o teu nome e nº de sócio da Armada Alvinegra.
              </div>

              <div style={{ marginBottom: 12 }}>
                <label className={s.memberLabel}>Nome</label>
                <input
                  className={s.memberInput}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nome completo"
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label className={s.memberLabel}>Nº de sócio</label>
                <input
                  className={s.memberInput}
                  value={memberId}
                  onChange={e => setMemberId(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="0000"
                />
              </div>

              <NeonButton onClick={verify} disabled={loading || name.trim().length < 2} style={{ height: 52 }}>
                {loading ? 'A entrar…' : 'Entrar na Bilheteira'}
              </NeonButton>

              <button className={s.backBtn} onClick={() => setStep(1)}>← Voltar</button>
            </div>
          )}
        </NeonPanel>

        <div className={s.spacer}/>
        <div className={s.footer}>∙ AA//2014 · NÃO HÁ GENTE COMO A GENTE ∙</div>
      </div>
    </div>
  );
}
