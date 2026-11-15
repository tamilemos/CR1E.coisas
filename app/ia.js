/* CR1E.Collab · IA do planejamento de conteúdo (Firebase AI Logic, API Gemini Developer).
   Carregado só quando alguém toca em "Gerar com IA". Só funciona depois de ativar no console do Firebase:
   1) AI Services > AI Logic > Get started > Gemini Developer API
   2) App Check > registrar o app web com reCAPTCHA e copiar a chave de site para config.js (ia.recaptcha)
   A versão do SDK aqui é independente da usada em dados.js. */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js';
import { initializeAppCheck, ReCaptchaV3Provider, ReCaptchaEnterpriseProvider } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app-check.js';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-ai.js';

const C = window.CR1E_CONFIG || {}, I = C.ia || {};
let model = null;
function start() {
  if (model) return model;
  if (!I.recaptcha) throw Object.assign(new Error('ia-off'), { code: 'ia-off' });
  const app = initializeApp(C.firebase, 'cr1e-ia');
  initializeAppCheck(app, { provider: I.provider === 'enterprise' ? new ReCaptchaEnterpriseProvider(I.recaptcha) : new ReCaptchaV3Provider(I.recaptcha), isTokenAutoRefreshEnabled: true });
  model = getGenerativeModel(getAI(app, { backend: new GoogleAIBackend() }), { model: I.model || 'gemini-3.5-flash-lite' });
  return model;
}
export async function ask(prompt) { const r = await start().generateContent(prompt); return { text: r.response.text() }; }
