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
    mani: ['A CR1E.Coisas/não é uma -agência:/é uma ^^zona~de~tradução.|Pegamos a ^verdade da ^cultura/e entregamos com a/^inteligência de dados/que as grandes marcas exigem.|Não escolhemos entre/^arte ou ^business./Escolhemos ^^os~dois~juntos.',
      "CR1E.Coisas/is not an -agency:/it is a ^^translation~zone.|We take the ^truth of ^culture/and deliver it with the/^data intelligence/big brands demand.|We don't choose between/^art and ^business./We choose ^^both,~together."],
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
    ft_fotos: ['Fotos: acervo CR1E.Coisas.', 'Photos: CR1E.Coisas archive.'],
    in_a: ['Arraste a pílula para abrir', 'Drag the pill to open'], in_b: ['Toque para abrir', 'Tap to open'], pular: ['Entrar direto', 'Skip'], abrir: ['Abrir', 'Open'],
    deck_hint: ['Toque para trocar', 'Tap to shuffle'], paint_hint: ['Passe o dedo ou o mouse: a tela pinta', 'Move your finger or mouse: the screen paints'],
  };
  const FR = [
    { id: 'content', tag: ['Hub de conteúdo', 'Content hub'], h: ['Estratégia ^nativa', 'Native ^strategy'], imgs: ['reel1', 'reel2', 'reel3'], pos: '50% 30%',
      p: ['Transformamos marcas em creators. Não adaptamos TV para o celular: unimos criatividade e ciência de dados para prender nos primeiros segundos e falar a língua de cada comunidade.', "We turn brands into creators. We don't squeeze TV into a phone: we pair creativity with data science to hold attention in the first seconds and speak each community's language."],
      li: [['Estratégia e criação de conteúdo', 'Content strategy and creation'], ['Produção de vídeo', 'Video production'], ['Cobertura de eventos', 'Event coverage'], ['Curadoria de UGC e TikTok', 'UGC and TikTok curation']] },
    { id: 'media', tag: ['Estratégia 360°', '360° strategy'], h: ['Visão de ^artista', "An ^artist's eye"], img: 'masp', pos: '50% 55%',
      p: ['Branding e campanhas que unem o racional do marketing com o emocional da arte.', "Branding and campaigns that join marketing's logic with art's emotion."],
      li: [['Diagnóstico', 'Diagnosis'], ['Posicionamento', 'Positioning'], ['Planejamento criativo', 'Creative planning']] },
    { id: 'experience', tag: ['Arte e ativação', 'Art and activation'], h: ['A arte ^saindo da tela', 'Art ^off the screen'], img: 'atos-mesa2', pos: '50% 40%',
      p: ['Do Lollapalooza ao corporativo: muralismo, eventos proprietários e endomarketing. Levamos a atmosfera do ateliê para o seu evento.', 'From Lollapalooza to corporate: murals, proprietary events and internal engagement. We bring the studio atmosphere to your event.'],
      li: [['Ativações de marca', 'Brand activations'], ['Live painting', 'Live painting'], ['Cenografia', 'Scenography'], ['Dinâmicas de team building', 'Team building']] },
    { id: 'collab', tag: ['Rede de artistas', 'Artist network'], h: ['Artistas no ^centro', 'Artists at the ^center'], img: 'feira-ccug', pos: '50% 50%',
      p: ['Uma rede curada de artistas, muralistas e creators conectada às marcas certas. Capacitamos artistas para viver de criação no digital.', 'A curated network of artists, muralists and creators matched with the right brands. We train artists to make a living as digital creators.'],
      li: [['Curadoria de artistas', 'Artist curation'], ['Formação de creators', 'Creator training'], ['Collabs de marca', 'Brand collabs']] },
  ];
  const CS = [
    { id: 'cacau', fr: 'content', n: '^Brasil~Cacau/no TikTok', cover: ['cacau-1', 'cacau-2', 'cacau-4'], imgs: ['cacau-1', 'cacau-2', 'cacau-3', 'cacau-4', 'cacau-prod', 'cacau-perfil', 'cacau-set'],
      p: ['Planejamento estratégico e criação de conteúdo para o perfil da Chocolates Brasil Cacau no TikTok, na campanha de Páscoa de 2022, com a proposta de trazer uma nova essência de lifestyle para a marca.', "Strategic planning and content creation for Chocolates Brasil Cacau on TikTok during the 2022 Easter campaign, bringing a new lifestyle essence to the brand."],
      b: [[['Desafio', 'Challenge'], ['Dar à marca uma nova essência de lifestyle dentro do TikTok, falando a língua de quem já está lá.', "Give the brand a new lifestyle essence on TikTok, speaking the language of the people already there."]],
        [['Estratégia', 'Strategy'], ['Cinco pilares editoriais em linguagem nativa, inspirados nos cinco perfis de consumidores da marca, para alcançar cada subcultura de forma orgânica. Entre eles: Chocolate Chakra, Unlimited Chocolate e Me, Myself and My Chocolate.', "Five editorial pillars in native language, inspired by the brand's five consumer profiles, to reach each subculture organically. Among them: Chocolate Chakra, Unlimited Chocolate and Me, Myself and My Chocolate."]],
        [['Destaque', 'Highlight'], ['O vídeo recordista alcançou 2,1 milhões de visualizações orgânicas.', 'The top video reached 2.1 million organic views.']]],
      res: [['15,2M', 'visualizações', 'views'], ['71,9 mil', 'curtidas', 'likes'], ['2,4 mil', 'novos seguidores', 'new followers'], ['13 mil', 'visitas ao perfil', 'profile visits'], ['1.228', 'comentários', 'comments'], ['883', 'compartilhamentos', 'shares']],
      f: [[['Cliente', 'Client'], ['Chocolates Brasil Cacau', 'Chocolates Brasil Cacau']], [['Agência', 'Agency'], ['Ginga', 'Ginga']], [['Período', 'Period'], ['Abril a maio de 2022', 'April to May 2022']], [['Campanha', 'Campaign'], ['Páscoa 2022', 'Easter 2022']], [['Alcance', 'Reach'], ['100% orgânico', '100% organic']]],
      lk: [[['Vídeo 1', 'Video 1'], 'https://drive.google.com/file/d/1TTSCNY-Olu338MDYn9GTM2rHelGGshAB/view'], [['Vídeo 2', 'Video 2'], 'https://drive.google.com/file/d/161axaY1PUTMFN9zE6vVNlMT6Ob_apg_o/view'], [['Vídeo 3', 'Video 3'], 'https://drive.google.com/file/d/1p6xou1HsmKLgGMSgAufAqo3t2a9z73Ck/view']] },
    { id: 'colorgin', fr: 'content', n: '^Colorgin no~BTC', cover: ['reel1', 'reel2', 'reel3'], pos: '50% 30%', imgs: ['reel1', 'reel2', 'reel3', 'btc-1', 'btc-2', 'colorgin-latas'],
      p: ['Em 2025 assumimos a estratégia de conteúdo da Colorgin Arte Urbana dentro do festival Bahia de Todas as Cores: cobertura em tempo real, estética cinematográfica e narrativa de posicionamento.', "In 2025 we ran Colorgin Arte Urbana's content strategy inside the Bahia de Todas as Cores festival: real-time coverage, a cinematic look and a positioning narrative."],
      b: [[['Ação', 'Scope'], ['Planejamento anual de comunicação e direção de conteúdo e mídia da marca durante a cobertura do festival.', "Annual communication planning plus content and media direction for the brand during the festival coverage."]],
        [['Estratégia', 'Strategy'], ['Traduzir o uso técnico do produto (spray) em lifestyle de alta retenção, com posicionamento e conexões de marca. Linguagem nativa, conteúdo que entretém, educa e converte.', 'Turn the technical use of the product (spray paint) into high-retention lifestyle content, with positioning and brand connections. Native language, content that entertains, teaches and converts.']],
        [['Entrega', 'Output'], ['Cobertura em tempo real pensada para vídeo vertical: 11 reels e mais de 20 stories.', 'Real-time coverage built for vertical video: 11 reels and 20+ stories.']],
        [['Resultado', 'Result'], ['Crescimento orgânico do perfil da marca em um mês de cobertura, comparado aos três meses anteriores.', "Organic growth of the brand's profile in one month of coverage, compared with the previous three months."]]],
      res: [['+6.000%', 'engajamento', 'engagement'], ['+899%', 'alcance', 'reach'], ['+331%', 'views', 'views'], ['+3 mil', 'seguidores', 'followers']],
      f: [[['Cliente', 'Client'], ['Colorgin Arte Urbana', 'Colorgin Arte Urbana']], [['Evento', 'Event'], ['Festival Bahia de Todas as Cores (BTC)', 'Bahia de Todas as Cores festival (BTC)']], [['Ano', 'Year'], ['2025', '2025']], [['Período', 'Period'], ['1 mês de cobertura', '1 month of coverage']]],
      lk: [[['BTC 2025, dia 3', 'BTC 2025, day 3'], 'https://www.instagram.com/p/DHwFe4ROMs-/'], [['Tia Ireny', 'Tia Ireny'], 'https://www.instagram.com/p/DIPEdRXOvb4/'], [['Primeiro graffiti da Wixy', "Wixy's first graffiti"], 'https://www.instagram.com/p/DIMAxfLuPyW/'], [['De onde você vem?', 'Where are you from?'], 'https://www.instagram.com/reel/DH8mlN_uB0y/']] },
    { id: 'ccug', fr: 'experience', n: 'Crie Como/Uma ^Garota', cover: ['masp'], imgs: ['masp', 'talk-ccug', 'plateia', 'trio-ccug', 'ccug-talk2', 'ccug-talk3', 'feira-ccug', 'mural-tami', 'ccug-mis', 'ccug-masp-poster', 'ccug-save'],
      p: ['Festival autoral criado por Tami Lemos em 2019. Nasceu do convite para pintar um mural na fachada do MIS, que virou o protótipo de um movimento de ocupação feminina, e no mesmo ano chegou ao auditório do MASP. Foi o embrião da CR1E.Coisas.', "An original festival created by Tami Lemos in 2019. It started with an invitation to paint a mural on the facade of MIS, which became the prototype for a movement of women occupying the museum, and reached the MASP auditorium that same year. It was the seed of CR1E.Coisas."],
      b: [[['MIS · 25.04.2019', 'MIS · Apr 25, 2019'], ['Primeira edição feita em 23 dias: produção executiva, curadoria de 30 artistas, identidade visual e estratégia de comunicação, sem patrocínio, só com a estrutura do museu.', 'First edition built in 23 days: executive production, curation of 30 artists, visual identity and communication strategy, with no sponsor, only the museum structure.']],
        [['MASP · 11.12.2019', 'MASP · Dec 11, 2019'], ['Segunda edição com equipe própria e patrocínio do Banco BMG: 13 horas de talks, palestras, teatro e performances, workshops gratuitos e afterparty com shows.', 'Second edition with its own team and Banco BMG as sponsor: 13 hours of talks, lectures, theater and performances, free workshops and an afterparty with live shows.']],
        [['Resultado', 'Result'], ['Recorde de visitação no MIS em dia de semana em 2019 e a validação de um modelo de gestão criativa.', 'A weekday attendance record at MIS in 2019 and proof of a creative management model.']]],
      res: [['+600', 'pessoas no MIS', 'people at MIS'], ['30', 'artistas nos talks', 'artists on stage'], ['48', 'artistas na feira', 'artists at the fair'], ['6 h', 'de conteúdo gratuito', 'of free content'], ['+250', 'pessoas no MASP', 'people at MASP'], ['13 h', 'de programação', 'of programming']],
      f: [[['Formato', 'Format'], ['Festival proprietário', 'Proprietary festival']], [['Onde', 'Where'], ['MIS e MASP, São Paulo', 'MIS and MASP, São Paulo']], [['Ano', 'Year'], ['2019', '2019']], [['Patrocínio', 'Sponsor'], ['Banco BMG (2ª edição)', 'Banco BMG (2nd edition)']]] },
    { id: 'atos', fr: 'experience', n: '^Atos team~building', cover: ['atos-mesa2'], pos: '50% 38%', imgs: ['atos-mesa2', 'atos-microfone', 'atos-mosaico', 'atos-pecas', 'atos-montagem', 'atos-forcas'],
      p: ['Team building através da arte: uma dinâmica corporativa em que os colaboradores participam de um processo criativo guiado para materializar os valores da empresa numa obra física.', "Team building through art: a corporate experience where employees join a guided creative process to turn the company's values into a physical piece."],
      b: [[['Desafio', 'Challenge'], ['Fortalecer a cultura interna de uma empresa de tecnologia usando criatividade.', "Strengthen a tech company's internal culture through creativity."]],
        [['Estratégia', 'Strategy'], ['Metodologia autoral de integração, com o mosaico como ferramenta de coesão do grupo.', 'An original team-integration method, with mosaic as the tool for group cohesion.']],
        [['Detalhe', 'Detail'], ['Os colaboradores não apenas assistiram: participaram do processo criativo guiado por nós.', "Employees didn't just watch: they took part in the creative process we guided."]],
        [['Resultado', 'Result'], ['Uma peça física que materializa os valores da empresa no escritório e aumento nos índices de engajamento interno.', "A physical piece that embodies the company's values in the office, and higher internal engagement."]]],
      f: [[['Cliente', 'Client'], ['Atos', 'Atos']], [['Formato', 'Format'], ['Dinâmica de team building', 'Team building experience']], [['Técnica', 'Technique'], ['Mosaico coletivo', 'Collective mosaic']]] },
    { id: 'live', fr: 'experience', n: '^Olla live~painting', cover: ['livepaint-c'], pos: '50% 22%', imgs: ['livepaint-c', 'olla-reel'],
      p: ['Ativação de marca com pintura ao vivo: a artista cria na frente do público e a obra vira entretenimento visual. Levamos a atmosfera do ateliê para o evento.', 'A brand activation with live painting: the artist creates in front of the audience and the work becomes visual entertainment. We bring the studio atmosphere to the event.'],
      b: [[['Formato', 'Format'], ['Duas telas pintadas ao vivo durante o evento, assinadas pela artista com a marca.', 'Two canvases painted live during the event, signed by the artist with the brand.']]],
      f: [[['Cliente', 'Client'], ['Olla', 'Olla']], [['Formato', 'Format'], ['Ativação de marca', 'Brand activation']], [['Técnica', 'Technique'], ['Pintura ao vivo', 'Live painting']]] },
    { id: 'adidas', fr: 'experience', n: '^adidas customização', cover: ['adidas'], imgs: ['adidas'],
      p: ['Personalização imediata de produtos (tênis, brindes), tornando cada brinde ou produto comprado uma peça exclusiva.', 'On-the-spot product customization (sneakers, gifts), turning every gift or purchase into a one-of-a-kind piece.'],
      f: [[['Cliente', 'Client'], ['adidas', 'adidas']], [['Formato', 'Format'], ['Customização ao vivo', 'Live customization']]] },
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
    /* sem escolha salva: português no Brasil (pelo fuso horário do aparelho), inglês fora dele */
    const noBrasil = () => { try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; if (tz) return /^America\/(Sao_Paulo|Rio_Branco|Manaus|Cuiaba|Campo_Grande|Porto_Velho|Boa_Vista|Belem|Fortaleza|Recife|Maceio|Bahia|Araguaina|Santarem|Noronha|Eirunepe)$|^Brazil\//.test(tz); } catch (e) {} return (navigator.language || 'pt').toLowerCase() === 'pt-br'; };
    root.lang = saved || (noBrasil() ? 'pt-BR' : 'en');
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
  <a href="#portal-sec" class="ptl"><i></i><span data-t="nav_portal"></span></a>
  <a href="#contato"><i></i><span data-t="nav_contato"></span></a>
  <a class="adm" href="admin/" aria-label="Acesso restrito">adm</a>
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
