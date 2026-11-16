/* CR1E.Collab · configuração pública do app de teste.
   A chave do Firebase é pública por natureza: o acesso é protegido pelas regras do Firestore. */
window.CR1E_CONFIG = {
  firebase: {
    apiKey: "AIzaSyCBowBWEE_YaqW9FOb4Au0u8tXQ3qGhQSU",
    authDomain: "cr1e-collab-bcf3e.firebaseapp.com",
    projectId: "cr1e-collab-bcf3e",
    storageBucket: "cr1e-collab-bcf3e.firebasestorage.app",
    messagingSenderId: "993910958529",
    appId: "1:993910958529:web:5ab6adf45cc84e6a652740"
  },
  /* IA do planejamento (Firebase AI Logic). Deixe recaptcha vazio enquanto não ativar no console do Firebase.
     provider: "v3" ou "enterprise", conforme o tipo de chave reCAPTCHA registrada no App Check. */
  ia: { recaptcha: "", provider: "v3", model: "gemini-3.5-flash-lite" },
  /* WhatsApp da Tami para o recado de boas-vindas (só números, com DDI e DDD, ex.: 5511999999999). Vazio esconde o botão. */
  whatsapp: "",
  drive: "https://script.google.com/macros/s/AKfycbwVruBCw4Ru6UzQI6orfEZuTMp4kAa2yqAe2RS8x121sEqrk5ruyPI8Xnt8TX0gB-Nv/exec"
};
