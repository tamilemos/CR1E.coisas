/* CR1E.Coisas · conteúdo (PT/EN) e utilidades compartilhadas pelas duas versões do site */
(() => {
  const root = document.documentElement;
  const G = {
    c: '<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="M8,22 C6,8 40,2 62,3 C88,4 97,14 95,23 C93,34 60,38 38,37 C14,36 4,30 10,18 C16,8 44,5 60,6"/></svg>',
    u: '<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="M2,6 C20,2 40,9 58,5 C72,2 86,7 98,4"/></svg>',
    s: '<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="M1,6 C25,2 50,8 99,3"/></svg>',
  };
  /* título: "/" quebra linha · ^larga · ^^larga em destaque · {circulada} · _sublinhada · -riscada · ~ une palavras */
  const fmt = (str) => str.split('/').map((ln) => '<span class="ln">' + ln.trim().split(' ').map((tk) => {
    const w = (s) => s.replace(/~/g, ' ');
    if (tk.startsWith('^^')) return `<span class="w a">${w(tk.slice(2))}</span>`;
    if (tk.startsWith('^')) return `<span class="w">${w(tk.slice(1))}</span>`;
    if (tk.startsWith('{')) return `<span class="g g-c w">${w(tk.replace(/[{}]/g, ''))}${G.c}</span>`;
    if (tk.startsWith('_')) return `<span class="g g-u w">${w(tk.slice(1))}${G.u}</span>`;
    if (tk.startsWith('-')) return `<span class="g g-s">${w(tk.slice(1))}${G.s}</span>`;
    return w(tk);
  }).join(' ') + '</span>').join('');

  const T = {
    nav_frentes: ['Frentes', 'What we do'], nav_metodo: ['Método', 'Method'], nav_cases: ['Cases', 'Work'], nav_tami: ['Quem cria', 'Founder'], nav_portal: ['Portal', 'Portal'], nav_contato: ['Contato', 'Contact'], nav_inicio: ['Início', 'Home'],
    entrar: ['Entrar', 'Log in'], cta: ['Vamos criar juntos', "Let's create together"], ver_cases: ['Ver cases', 'See the work'],
    tag1: ['Laboratório criativo', 'Creative lab'], tag2: ['Media house', 'Media house'], tag3: ['Brasil · Porto Rico · EUA', 'Brazil · Puerto Rico · USA'],
    assin: ['Comunicação com alma de artista.', "Communication with an artist's soul."],
    hero_t: ['Onde a {arte}/vira ^estratégia/de mercado', 'Where {art}/becomes ^market/^strategy'],
    hero_lead: ['Unimos estratégia de comunicação e arte para marcas que querem conteúdo, campanhas e experiências com autoria.', 'We blend communication strategy and art for brands that want content, campaigns and experiences with real authorship.'],
    mani_k: ['Manifesto', 'Manifesto'],
    mani: ['A CR1E.Coisas não é uma <s>agência</s>: é uma <b>zona de tradução.</b> Pegamos a verdade da <b>cultura</b> e entregamos com a inteligência de dados que as grandes marcas exigem. Não escolhemos entre arte ou business. Escolhemos <b>os dois juntos.</b>',
      'CR1E.Coisas is not an <s>agency</s>: it is a <b>translation zone.</b> We take the truth of <b>culture</b> and deliver it with the data intelligence big brands demand. We don\'t choose between art and business. We choose <b>both, together.</b>'],
    sw_a: ['Arte', 'Art'], sw_b: ['Business', 'Business'], sw_q: ['Escolha um lado', 'Pick a side'], sw_r: ['Escolhemos os dois juntos.', 'We choose both, together.'],
    human_t: ['^Human/generated,/^^human/connected.', '^Human/generated,/^^human/connected.'],
    human_p: ['Num mercado inundado por inteligência artificial, a humanidade virou o novo artigo de luxo. Usamos tecnologia para amplificar, nunca para substituir. O algoritmo escala; só o humano conecta.', 'In a market flooded with artificial intelligence, humanity became the new luxury. We use technology to amplify, never to replace. Algorithms scale; only humans connect.'],
    fr_t: ['Uma marca,/^quatro frentes', 'One brand,/^four fronts'],
    fr_p: ['Contrate por projeto ou como time contínuo. Cada frente abre conforme o que a sua marca precisa.', 'Hire us per project or as an ongoing team. Each front opens up to fit what your brand needs.'],
    fr_hint: ['Arraste para o lado', 'Swipe sideways'], entregas: ['Entregas', 'What you get'],
    mt_t: ['Metodologia/^CR1E.Coisas', 'The ^CR1E.Coisas/method'],
    mt_p: ['Comunicação e arte trocando o tempo todo. Uma entrega o que a outra não tem.', 'Communication and art in constant exchange. Each brings what the other lacks.'],
    mt_a: ['Comunicação', 'Communication'], mt_a_p: ['Alinhamos a visão estratégica e os recursos da comunicação tradicional.', 'We bring the strategic vision and resources of traditional communication.'],
    mt_b: ['Arte', 'Art'], mt_b_p: ['O poder da arte de construir conexões e gerar significado.', "Art's power to build connections and create meaning."],
    mt_go: ['Estratégia e recursos', 'Strategy and resources'], mt_back: ['Propósito e conexões', 'Purpose and connections'],
    cs_t: ['Todo case/vira ^^obra', 'Every case/becomes ^^art'], cs_all: ['Todos', 'All'],
    tami_k: ['Quem cria', 'Who creates'], tami_role: ['Fundadora e diretora criativa', 'Founder and creative director'],
    tami_quote: ['"Fundei a CR1E.Coisas ao perceber uma dicotomia no setor: a necessidade de trazer mais autenticidade e substância para a publicidade e a urgência de aplicar gestão estratégica para profissionalizar a cadeia das artes visuais."', '"I founded CR1E.Coisas after seeing a split in the industry: advertising needed more authenticity and substance, and the visual arts urgently needed strategic management to become a real profession."'],
    tami_bio: ['Publicitária, artista plástica e muralista, com 14 anos de carreira entre direção de arte e planejamento estratégico e criativo para grandes marcas. Em 2019 fundou o festival Crie Como Uma Garota (MIS/MASP), o catalisador que deu origem à CR1E.Coisas. TikTok Specialist pela primeira turma da ESPM.', 'Advertiser, visual artist and muralist with 14 years in art direction and strategic and creative planning for major brands. In 2019 she founded the Crie Como Uma Garota festival (MIS/MASP), the spark behind CR1E.Coisas. TikTok Specialist from ESPM\'s first class.'],
    tami_cta: ['Falar com a Tami', 'Talk to Tami'],
    pt_k: ['Em breve', 'Coming soon'],
    pt_t: ['O ^portal/da ^^rede', 'The ^network/^^portal'],
    pt_p: ['Uma área com login para clientes e artistas da rede: ferramentas, materiais e projetos num só lugar.', 'A members area for clients and network artists: tools, resources and projects in one place.'],
    pt_1: ['Ferramentas', 'Tools'], pt_1p: ['Metodologias e modelos da CR1E.Coisas para usar no dia a dia.', 'CR1E.Coisas methods and templates for everyday use.'],
    pt_2: ['Área do cliente', 'Client area'], pt_2p: ['Briefings, entregas e resultados de cada projeto.', 'Briefs, deliverables and results for each project.'],
    pt_3: ['Rede de artistas', 'Artist network'], pt_3p: ['Perfil, portfólio e convites para jobs com marcas.', 'Profile, portfolio and invitations to brand projects.'],
    pt_cta: ['Quero acesso antecipado', 'Get early access'],
    pt_d: ['O portal ainda não está aberto. Deixe seu contato e avisamos quando o login for liberado.', 'The portal is not open yet. Leave your contact and we will let you know when log in is available.'],
    pt_mail: ['E-mail', 'Email'], pt_pass: ['Senha', 'Password'], fechar: ['Fechar', 'Close'],
    close_t: ['Vamos ^criar/^C⬭isas/^incríveis juntos?', "Let's ^create/^amazing/^C⬭isas together?"],
    ct_reply: ['Respondemos em até 2 dias úteis. Atendemos marcas no Brasil, em Porto Rico e nos EUA.', 'We reply within 2 business days. Serving brands in Brazil, Puerto Rico and the US.'],
    copiar: ['Copiar', 'Copy'], f_nome: ['Nome', 'Name'], f_emp: ['Empresa', 'Company'], f_int: ['Interesse', 'Interest'], f_msg: ['Conte o projeto', 'Tell us about the project'], enviar: ['Enviar', 'Send'],
    ft_fotos: ['Fotos: acervo CR1E.Coisas; Arivaldo Publio.', 'Photos: CR1E.Coisas archive; Arivaldo Publio.'],
    in_a: ['Arraste a pílula para abrir', 'Drag the pill to open'], in_b: ['Toque para abrir', 'Tap to open'], pular: ['Entrar direto', 'Skip'], abrir: ['Abrir', 'Open'],
    deck_hint: ['Toque para trocar', 'Tap to shuffle'], paint_hint: ['Passe o dedo ou o mouse: a tela pinta', 'Move your finger or mouse: the screen paints'],
  };
  const FR = [
    { id: 'content', tag: ['Hub de conteúdo', 'Content hub'], h: ['Estratégia ^nativa', 'Native ^strategy'], img: 'reel2', pos: '50% 35%',
      p: ['Transformamos marcas em creators. Não adaptamos TV para o celular: unimos criatividade e ciência de dados para prender nos primeiros segundos e falar a língua de cada comunidade.', "We turn brands into creators. We don't squeeze TV into a phone: we pair creativity with data science to hold attention in the first seconds and speak each community's language."],
      li: [['Estratégia e criação de conteúdo', 'Content strategy and creation'], ['Produção de vídeo', 'Video production'], ['Cobertura de eventos', 'Event coverage'], ['Curadoria de UGC e TikTok', 'UGC and TikTok curation']] },
    { id: 'media', tag: ['Estratégia 360°', '360° strategy'], h: ['Visão de ^artista', "An ^artist's eye"], img: 'talk-ccug', pos: '50% 50%',
      p: ['Branding e campanhas que unem o racional do marketing com o emocional da arte.', "Branding and campaigns that join marketing's logic with art's emotion."],
      li: [['Diagnóstico', 'Diagnosis'], ['Posicionamento', 'Positioning'], ['Planejamento criativo', 'Creative planning']] },
    { id: 'experience', tag: ['Arte e ativação', 'Art and activation'], h: ['A arte ^saindo da tela', 'Art ^off the screen'], img: 'hershey-booth', pos: '50% 60%',
      p: ['Do Lollapalooza ao corporativo: muralismo, eventos proprietários e endomarketing. Levamos a atmosfera do ateliê para o seu evento.', 'From Lollapalooza to corporate: murals, proprietary events and internal engagement. We bring the studio atmosphere to your event.'],
      li: [['Ativações de marca', 'Brand activations'], ['Live painting', 'Live painting'], ['Cenografia', 'Scenography'], ['Dinâmicas de team building', 'Team building']] },
    { id: 'collab', tag: ['Rede de artistas', 'Artist network'], h: ['Artistas no ^centro', 'Artists at the ^center'], img: 'feira-ccug', pos: '50% 50%',
      p: ['Uma rede curada de artistas, muralistas e creators conectada às marcas certas. Capacitamos artistas para viver de criação no digital.', 'A curated network of artists, muralists and creators matched with the right brands. We train artists to make a living as digital creators.'],
      li: [['Curadoria de artistas', 'Artist curation'], ['Formação de creators', 'Creator training'], ['Collabs de marca', 'Brand collabs']] },
  ];
  const CS = [
    { id: 'colorgin', fr: 'content', n: '^Colorgin no~BTC', imgs: ['reel1', 'reel2', 'reel3'], cover: 'colorgin-latas',
      p: ['Assumimos a estratégia de conteúdo da Colorgin no Festival Bahia de Todas as Cores: cobertura em tempo real, estética cinematográfica e narrativa de posicionamento. Linguagem nativa, conteúdo que entretém, educa e converte.', 'We ran Colorgin\'s content strategy at the Bahia de Todas as Cores festival: real-time coverage, cinematic look and a positioning narrative. Native language, content that entertains, teaches and converts.'],
      res: [['+6.000%', 'engajamento', 'engagement'], ['+899%', 'alcance', 'reach'], ['+331%', 'views', 'views'], ['+3 mil', 'seguidores', 'followers']],
      f: [[['Cliente', 'Client'], ['Colorgin Arte Urbana', 'Colorgin Arte Urbana']], [['Ano', 'Year'], ['2025', '2025']], [['Entrega', 'Output'], ['11 reels, +20 stories', '11 reels, +20 stories']], [['Período', 'Period'], ['1 mês de cobertura', '1 month of coverage']]] },
    { id: 'live', fr: 'experience', n: '^Live painting', imgs: ['livepaint'], cover: 'livepaint',
      p: ['A performance da artista criando ao vivo, gerando entretenimento visual. Formatos dinâmicos que hipnotizam o público.', 'The artist creating live, as visual entertainment. Dynamic formats that mesmerize the audience.'],
      f: [[['Formato', 'Format'], ['Ativação de marca', 'Brand activation']], [['Técnica', 'Technique'], ['Pintura ao vivo', 'Live painting']]] },
    { id: 'adidas', fr: 'experience', n: '^adidas customização', imgs: ['adidas'], cover: 'adidas',
      p: ['Personalização imediata de produtos (tênis, brindes), tornando cada brinde ou produto comprado uma peça exclusiva.', 'On-the-spot product customization (sneakers, gifts), turning every gift or purchase into a one-of-a-kind piece.'],
      f: [[['Cliente', 'Client'], ['adidas', 'adidas']], [['Formato', 'Format'], ['Customização ao vivo', 'Live customization']]] },
    { id: 'hershey', fr: 'experience', n: '^Hershey\'s cenografia~viva', imgs: ['hershey-entrada', 'hershey-booth'], cover: 'hershey-entrada',
      p: ['Espaços instagramáveis que contam histórias e convidam à interação. O público não apenas vê a arte, ele entra nela.', "Shareable spaces that tell stories and invite interaction. People don't just see the art, they step into it."],
      f: [[['Cliente', 'Client'], ["Hershey's", "Hershey's"]], [['Formato', 'Format'], ['Cenografia viva', 'Live scenography']]] },
    { id: 'atos', fr: 'experience', n: '^Atos team~building', imgs: ['atos-mosaico', 'atos-mesa'], cover: 'atos-mosaico',
      p: ['O desafio: fortalecer a cultura interna de uma empresa de tecnologia usando criatividade. Os colaboradores participaram do processo criativo guiado, e o resultado virou uma peça física que materializa os valores da empresa no escritório.', "The challenge: strengthen a tech company's internal culture through creativity. Employees took part in a guided creative process, and the result became a physical piece that embodies the company's values in the office."],
      f: [[['Cliente', 'Client'], ['Atos', 'Atos']], [['Formato', 'Format'], ['Dinâmica de team building', 'Team building experience']], [['Técnica', 'Technique'], ['Mosaico coletivo', 'Collective mosaic']]] },
  ];

  const L = () => (root.lang === 'en' ? 1 : 0);
  const tx = (v) => (Array.isArray(v) ? v[L()] : v);
  const t = (k) => (T[k] ? T[k][L()] : k);
  const nameHTML = (id) => ({
    content: 'CR1E<span class="co">.c<span class="o"></span>ntent</span>',
    collab: 'CR1E<span class="co">.c<span class="o"></span>llab</span>',
    media: 'CR1E<span class="co">.media</span>',
    experience: 'CR1E<span class="co">.experience</span>',
    co: 'CR1E<span class="co">.c<span class="o"></span></span>',
  }[id]);
  const namePlain = (id) => ({ content: 'CR1E.Content', collab: 'CR1E.Collab', media: 'CR1E.media', experience: 'CR1E.experience' }[id]);

  const hooks = [];
  function apply() {
    document.querySelectorAll('[data-t]').forEach((el) => { const k = el.dataset.t; el.innerHTML = el.hasAttribute('data-fmt') ? fmt(t(k)) : t(k); });
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === root.lang)));
    hooks.forEach((h) => h());
    gestures();
  }
  function setLang(l) { root.lang = l; try { localStorage.setItem('cr1e-lang', l); } catch (e) {} apply(); }
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let io = null;
  function gestures() {
    if (reduce || !('IntersectionObserver' in window)) return;
    io = io || new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); } }), { threshold: 0.6 });
    document.querySelectorAll('.g:not([data-g])').forEach((g) => { g.dataset.g = '1'; g.classList.add('pre'); io.observe(g); });
  }

  function init() {
    let saved = null; try { saved = localStorage.getItem('cr1e-lang'); } catch (e) {}
    root.lang = saved || (navigator.language && !navigator.language.toLowerCase().startsWith('pt') ? 'en' : 'pt-BR');
    document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
    apply();

    /* portal */
    const dlg = document.getElementById('portal');
    document.querySelectorAll('[data-portal]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }));
    dlg?.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => dlg.close()));
    dlg?.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    document.querySelectorAll('[data-interest]').forEach((b) => b.addEventListener('click', () => { const s = document.getElementById('f-frente'); if (s) s.value = b.dataset.interest; dlg?.open && dlg.close(); }));

    /* barra de app + navegação ativa */
    const links = [...document.querySelectorAll('.tab a[href^="#"], .nav a[href^="#"]')];
    if ('IntersectionObserver' in window) {
      const so = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
      new Set(links.map((a) => a.getAttribute('href').slice(1))).forEach((id) => { const el = document.getElementById(id); if (el) so.observe(el); });
    }

    /* contato */
    const cp = document.getElementById('copyMail');
    cp?.addEventListener('click', async () => {
      const a = document.getElementById('addr'); const pt = !L();
      try { await navigator.clipboard.writeText(a.textContent); cp.textContent = pt ? 'Copiado' : 'Copied'; }
      catch (err) { const r = document.createRange(); r.selectNodeContents(a); const s = getSelection(); s.removeAllRanges(); s.addRange(r); cp.textContent = pt ? 'Selecione e copie' : 'Select and copy'; }
      setTimeout(() => { cp.textContent = t('copiar'); }, 1800);
    });
    const f = document.getElementById('form');
    f?.addEventListener('submit', async (e) => {
      e.preventDefault(); const msg = document.getElementById('formMsg'); const pt = !L();
      if (!f.checkValidity()) { msg.textContent = pt ? 'Preencha nome, e-mail válido e a mensagem.' : 'Please add your name, a valid email and a message.'; f.querySelector(':invalid')?.focus(); return; }
      const ep = f.dataset.endpoint;
      if (!ep) { msg.textContent = pt ? 'O envio por formulário ainda não está ativo. Escreva para tami@CR1E.co.' : 'The form is not connected yet. Please email tami@CR1E.co.'; return; }
      try { const r = await fetch(ep, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) }); if (!r.ok) throw new Error(r.status); f.reset(); msg.textContent = pt ? 'Mensagem enviada. Respondemos em até 2 dias úteis.' : 'Message sent. We reply within 2 business days.'; }
      catch (err) { msg.textContent = pt ? 'Não foi possível enviar agora. Escreva para tami@CR1E.co.' : "Couldn't send right now. Please email tami@CR1E.co."; }
    });
  }

  /* blocos HTML compartilhados */
  const portalHTML = () => `
<dialog class="ptl-d" id="portal" aria-labelledby="ptl-h">
  <button class="ptl-x" type="button" data-close aria-label="Fechar">×</button>
  <div class="ptl-g">
    <div class="ptl-l"><span class="pill k" data-t="pt_k"></span><h2 class="t" id="ptl-h" data-t="pt_t" data-fmt></h2><p style="margin:0" data-t="pt_p"></p></div>
    <div class="ptl-r">
      <label><span data-t="pt_mail"></span><input type="email" disabled placeholder="voce@empresa.com" id="pt-mail"></label>
      <label><span data-t="pt_pass"></span><input type="password" disabled placeholder="••••••••" id="pt-pass"></label>
      <p data-t="pt_d"></p>
      <a class="btn" href="#contato" data-interest="portal"><span data-t="pt_cta"></span> <span class="arr" aria-hidden="true">→</span></a>
    </div>
  </div>
</dialog>`;
  const tabHTML = () => `
<nav class="tab" aria-label="App">
  <a href="#topo" class="on"><i></i><span data-t="nav_inicio"></span></a>
  <a href="#frentes"><i></i><span data-t="nav_frentes"></span></a>
  <a href="#cases"><i></i><span data-t="nav_cases"></span></a>
  <button type="button" class="ptl" data-portal><i></i><span data-t="nav_portal"></span></button>
  <a href="#contato"><i></i><span data-t="nav_contato"></span></a>
</nav>`;
  const formHTML = (btnCls) => `
<form class="form" id="form" novalidate data-endpoint="">
  <div class="two"><label for="f-nome"><span data-t="f_nome"></span><input id="f-nome" name="nome" autocomplete="name" required></label>
  <label for="f-empresa"><span data-t="f_emp"></span><input id="f-empresa" name="empresa" autocomplete="organization"></label></div>
  <div class="two"><label for="f-email">E-mail<input id="f-email" name="email" type="email" autocomplete="email" required></label>
  <label for="f-frente"><span data-t="f_int"></span><select id="f-frente" name="frente"><option value="content">CR1E.Content</option><option value="media">CR1E.media</option><option value="experience">CR1E.experience</option><option value="collab">CR1E.Collab</option><option value="portal">Portal</option></select></label></div>
  <label for="f-msg"><span data-t="f_msg"></span><textarea id="f-msg" name="mensagem" required></textarea></label>
  <button class="btn ${btnCls}" type="submit" style="justify-self:start"><span data-t="enviar"></span> <span class="arr" aria-hidden="true">→</span></button>
  <p class="form-msg" id="formMsg" role="status" aria-live="polite"></p>
</form>`;

  window.CR1E = { T, FR, CS, t, tx, fmt, nameHTML, namePlain, init, apply, hooks, reduce, portalHTML, tabHTML, formHTML, lang: L };
})();
