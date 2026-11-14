/* CR1E.Collab · versão de teste
   Login (Firebase Authentication), dados da rede (Firestore) e envios para o Drive da CR1E.Coisas (Apps Script).
   As chaves abaixo são públicas por natureza: quem protege os dados são as regras do Firestore e a checagem de login no script do Drive. */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, onSnapshot, query, orderBy, limit, updateDoc, deleteDoc, arrayUnion, arrayRemove, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const FIREBASE_CONFIG = window.CR1E_CONFIG?.firebase;
const DRIVE_URL = window.CR1E_CONFIG?.drive || '';

if (!FIREBASE_CONFIG) throw new Error('CR1E.Collab: configuração do Firebase ausente');
const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);
auth.languageCode = 'pt-BR';
const db = getFirestore(app);

const MSG = {
  'auth/email-already-in-use': 'Já existe uma conta com esse e-mail. Toque em "Já tenho senha" para entrar.',
  'auth/invalid-email': 'Esse e-mail não parece válido.',
  'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  'auth/missing-password': 'Escreva a sua senha.',
  'auth/invalid-credential': 'E-mail ou senha não conferem.',
  'auth/wrong-password': 'E-mail ou senha não conferem.',
  'auth/user-not-found': 'Não encontramos uma conta com esse e-mail.',
  'auth/too-many-requests': 'Muitas tentativas. Espere alguns minutos e tente de novo.',
  'auth/network-request-failed': 'Sem conexão. Verifique a internet e tente de novo.',
};
const msg = (err) => MSG[err && err.code] || 'Algo deu errado. Tente de novo em instantes.';

/* fotos menores para a rede (o original vai para o Drive) */
const shrink = (dataUrl, max = 480) => new Promise((ok) => {
  if (!dataUrl) return ok('');
  const im = new Image();
  im.onload = () => { const m = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement('canvas'); c.width = Math.round(im.naturalWidth * m); c.height = Math.round(im.naturalHeight * m); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); ok(c.toDataURL('image/jpeg', .72)); };
  im.onerror = () => ok(''); im.src = dataUrl;
});

/* envio para o Drive: texto vai para a planilha, arquivos para a pasta da pessoa */
async function drive(type, data, files = []) {
  if (!DRIVE_URL || !auth.currentUser) return false;
  try {
    const idToken = await auth.currentUser.getIdToken();
    const r = await fetch(DRIVE_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ idToken, type, data, files }) });
    const j = await r.json().catch(() => ({}));
    return !!j.ok;
  } catch (e) { return false; }
}
const fileOf = (name, dataUrl) => dataUrl ? { name, mime: 'image/jpeg', b64: dataUrl.split(',')[1] } : null;

/* perfil público (sem e-mail) */
const pub = (S) => ({ name: S.name, role: S.role, sk: S.sk, hb: S.hb, want: S.want, cvBio: S.cvBio || '', cv: S.cv || [], links: S.links || [], uf: S.uf || '', cid: S.cid || '', conns: [...(S.follow || [])], follow: [...(S.follow || [])], chats: [...(S.chats || [])], done: true, updated: serverTimestamp() });

let unsub = [];
const A = {
  msg,
  user: () => auth.currentUser,
  async signUp(name, email, pass) {
    const c = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(c.user, { displayName: name }).catch(() => {});
    await sendEmailVerification(c.user, { url: location.origin + '/app/' }).catch(() => {});
    await setDoc(doc(db, 'private', c.user.uid), { email, name, created: serverTimestamp() }).catch(() => {});
    return c.user;
  },
  async signIn(email, pass) {
    const c = await signInWithEmailAndPassword(auth, email, pass);
    return A.loadProfile(c.user.uid);
  },
  async loadProfile(uid) {
    const s = await getDoc(doc(db, 'profiles', uid || auth.currentUser.uid));
    return s.exists() ? s.data() : null;
  },
  reset: (email) => sendPasswordResetEmail(auth, email),
  async logout() { unsub.forEach((u) => u()); unsub = []; await signOut(auth); },
  /* salva o perfil na rede e manda o registro para o Drive */
  async saveProfile(S, event) {
    const u = auth.currentUser; if (!u) return;
    const avatar = await shrink(S.avatar), fotos = await Promise.all((S.fotos || []).map((f) => shrink(f))); const cover = await shrink(S.cover, 900);
    await setDoc(doc(db, 'profiles', u.uid), { ...pub(S), avatar, fotos, cover, ...(event === 'cadastro' ? { created: serverTimestamp(), consent: true } : {}) }, { merge: true });
    if (event) {
      const files = event === 'cadastro' || event === 'fotos' ? [fileOf('perfil.jpg', S.avatar), fileOf('capa.jpg', S.cover), ...(S.fotos || []).map((f, i) => fileOf(`trabalho-${i + 1}.jpg`, f))].filter(Boolean) : [];
      drive(event === 'cadastro' ? 'Cadastros' : 'Perfis', { evento: event, nome: S.name, perfil: S.role, cidade: [S.cid, S.uf].filter(Boolean).join(', '), areas_habilidades: (S.role === 'empresa' ? S.want : S.sk).join(', '), gostos: (S.hb || []).join(', '), bio: S.cvBio || '', curriculo: (S.cv || []).map((c) => `${c.a} · ${c.t} · ${c.o}`).join(' | '), links: (S.links || []).map((l) => `${l.n}: ${l.u}`).join(' | ') }, files);
    }
  },
  drive,
  /* rede: perfis, mural e fórum de quem está no teste */
  listen(hooks) {
    unsub.forEach((u) => u()); unsub = [];
    unsub.push(onSnapshot(query(collection(db, 'profiles'), limit(300)), (snap) => {
      const me = auth.currentUser && auth.currentUser.uid;
      hooks.profiles(snap.docs.filter((d) => d.id !== me).map((d) => ({ uid: d.id, ...d.data() })));
    }, () => {}));
    unsub.push(onSnapshot(query(collection(db, 'posts'), orderBy('ts', 'desc'), limit(100)), (snap) => hooks.posts(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => {}));
    unsub.push(onSnapshot(query(collection(db, 'forum'), orderBy('ts', 'desc'), limit(100)), (snap) => hooks.forum(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => {}));
  },
  async post(S, t) {
    const u = auth.currentUser; await addDoc(collection(db, 'posts'), { uid: u.uid, name: S.name, t, likes: [], reposts: [], replies: [], ts: serverTimestamp() });
    drive('Mural', { nome: S.name, texto: t });
  },
  togglePost: (id, field, on) => updateDoc(doc(db, 'posts', id), { [field]: on ? arrayUnion(auth.currentUser.uid) : arrayRemove(auth.currentUser.uid) }),
  async replyPost(S, id, t) {
    const u = auth.currentUser; await updateDoc(doc(db, 'posts', id), { replies: arrayUnion({ uid: u.uid, name: S.name, t, at: Date.now() }) });
    drive('Mural', { nome: S.name, resposta: t, publicacao: id });
  },
  delPost: (id) => deleteDoc(doc(db, 'posts', id)),
  resendVerify: () => auth.currentUser ? sendEmailVerification(auth.currentUser, { url: location.origin + '/app/' }) : Promise.resolve(),
  async topic(S, cat, t, m) {
    const u = auth.currentUser; await addDoc(collection(db, 'forum'), { uid: u.uid, cat, t, msgs: [{ uid: u.uid, name: S.name, t: m, at: Date.now() }], ts: serverTimestamp() });
    drive('Fórum', { nome: S.name, categoria: cat, assunto: t, mensagem: m });
  },
  async reply(S, id, t, topicTitle) {
    const u = auth.currentUser; await updateDoc(doc(db, 'forum', id), { msgs: arrayUnion({ uid: u.uid, name: S.name, t, at: Date.now() }) });
    drive('Fórum', { nome: S.name, assunto: topicTitle || id, resposta: t });
  },
  /* conversa entre dois contatos */
  chatId: (a, b) => [a, b].sort().join('_'),
  listenChat(otherUid, cb) {
    const u = auth.currentUser; if (!u || !otherUid) return () => {};
    return onSnapshot(doc(db, 'chats', A.chatId(u.uid, otherUid)), (s) => cb(s.exists() ? (s.data().msgs || []) : []), () => cb([]));
  },
  async sendChat(S, otherUid, t) {
    const u = auth.currentUser, id = A.chatId(u.uid, otherUid);
    await setDoc(doc(db, 'chats', id), { members: [u.uid, otherUid].sort(), msgs: arrayUnion({ uid: u.uid, name: S.name, t, at: Date.now() }) }, { merge: true });
  },
};
window.CR1E_AUTH = A;

/* sessão: quem já entrou antes volta direto para o app */
let first = true;
onAuthStateChanged(auth, async (u) => {
  if (!first) return; first = false;
  let prof = null;
  if (u) { try { prof = await A.loadProfile(u.uid); } catch (e) {} }
  window.__cr1eResolve && window.__cr1eResolve({ A, user: u, prof });
});
