import { useState, useEffect } from 'react';

export function useTypewriter(text, { delay = 700, startDelay = 350, speed = 38 } = {}) {
  const [visible, setVisible]     = useState(false);
  const [typedText, setTypedText] = useState('');
  const [typing, setTyping]       = useState(false);

  useEffect(() => {
    setTypedText('');
    setTyping(false);
    setVisible(false);
    const show = setTimeout(() => {
      setVisible(true);
      const start = setTimeout(() => setTyping(true), startDelay);
      return () => clearTimeout(start);
    }, delay);
    return () => clearTimeout(show);
  }, [text, delay, startDelay]);

  useEffect(() => {
    if (!typing) return;
    if (typedText.length >= text.length) { setTyping(false); return; }
    const t = setTimeout(() => setTypedText(text.slice(0, typedText.length + 1)), speed);
    return () => clearTimeout(t);
  }, [typing, typedText, text, speed]);

  return { visible, typedText, typing };
}
