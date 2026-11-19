/* CR1E.Collab · Estúdio → Canva
   Transforma o que a pessoa preencheu no estúdio (media kit, orçamento, editais e conteúdo)
   em um arquivo .pptx editável, no formato da peça. No Canva: Criar design › Importar arquivo.
   No celular, o arquivo pode ir direto para o app do Canva pelo menu de compartilhar.

   Conexão direta (abrir o design já dentro da conta Canva da pessoa) depende da Canva Connect API:
   uma integração registrada em canva.com/developers e um pequeno servidor para o login (OAuth) e
   para enviar o arquivo pela API de importação. Quando existir, basta trocar `entregar()`. */
(function () {
  let P, PAPEL, V, CZ, BR, TIT, TXT;
  /* estilos: "limpo" é neutro (para a pessoa aplicar o próprio estilo no Canva); "cr1e" usa a identidade da marca */
  const TEMAS = { limpo: ['1F1F1F', 'FFFFFF', 'E4E4E4', '4A4A4A', 'FFFFFF', 'Arial Black', 'Arial'], cr1e: ['0E0E0C', 'F4F3EE', 'C5FF3D', '3A3A36', 'FFFFFF', 'Archivo Black', 'Space Mono'] };
  const tema = (k) => { [P, PAPEL, V, CZ, BR, TIT, TXT] = TEMAS[k] || TEMAS.limpo; };
  tema('limpo');
  let lib = null;
  const carregar = () => lib || (lib = new Promise((ok, no) => {
    if (window.PptxGenJS) return ok(window.PptxGenJS);
    const s = document.createElement('script'); s.src = 'vendor/pptxgen.bundle.js?v=401'; s.onload = () => ok(window.PptxGenJS); s.onerror = () => { lib = null; no(new Error('lib')); }; document.head.appendChild(s);
  }));
  const L = (s) => String(s == null ? '' : s).trim();
  const lista = (s) => L(s).split(',').map((x) => x.trim()).filter(Boolean);
  const rodape = (sl, w, h, t) => sl.addText(t || 'Feito no CR1E.Collab · edite à vontade no Canva', { x: 0.5, y: h - 0.45, w: w - 1, h: 0.3, fontFace: TXT, fontSize: 7, color: CZ });
  const pill = (sl, x, y, t, fill) => sl.addText(L(t).toUpperCase(), { x, y, w: Math.max(1.1, 0.13 * L(t).length + 0.5), h: 0.34, fontFace: TIT, fontSize: 9, color: P, fill: { color: fill || V }, line: { color: P, width: 1.25 }, rectRadius: 0.17, shape: 'roundRect', align: 'center', valign: 'middle', margin: 0 });
  const titulo = (sl, x, y, w, a, b, size) => sl.addText([{ text: L(a).toUpperCase() + (b ? ' ' : ''), options: { color: P } }, ...(b ? [{ text: L(b).toUpperCase(), options: { color: P, highlight: V } }] : [])], { x, y, w, h: size / 40, fontFace: TIT, fontSize: size, margin: 0, valign: 'top', fit: 'shrink' });
  const brl = (n) => 'R$ ' + (Number(n) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nomeArq = (base) => base.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'cr1e';

  const SECS = [['Apresentação', 'O que é o projeto, em poucas linhas.'], ['Justificativa', 'Por que ele importa e para quem.'], ['Objetivos', 'O que vocês querem alcançar.'], ['Público', 'Quem vai ser alcançado e como.'], ['Cronograma', 'Mês a mês, do começo à prestação de contas.'], ['Orçamento', 'Item, quantidade e valor.'], ['Ficha técnica', 'Nome e função de cada pessoa.'], ['Contrapartida e acessibilidade', 'O que o projeto devolve e como inclui.']];
  function a4(pp) { pp.defineLayout({ name: 'A4V', width: 8.27, height: 11.69 }); pp.layout = 'A4V'; return [8.27, 11.69]; }

  /* MEDIA KIT · 2 páginas A4 */
  function mediaKit(pp, d, f) {
    if (f === 'a4x1') return kitA4x1(pp, d);
    if (f === 'slides') return kitSlides(pp, d);
    const [W, H] = a4(pp);
    let s = pp.addSlide(); s.background = { color: PAPEL };
    pill(s, 0.5, 0.5, 'Media kit');
    const nome = L(d.nome) || 'Seu nome', parts = nome.split(' ');
    titulo(s, 0.5, 1.05, W - 1, parts[0], parts.slice(1).join(' '), 40);
    if (d.avatar) s.addImage({ data: d.avatar, x: W - 3.0, y: 2.55, w: 2.5, h: 2.5, rounding: true });
    s.addText([L(d.esp), L(d.cid)].filter(Boolean).join('  ·  '), { x: 0.5, y: 2.55, w: W - 3.4, h: 0.5, fontFace: TXT, fontSize: 11, bold: true, color: P });
    s.addText(L(d.bio) || 'Escreva aqui a sua bio: quem você é, o que cria e para quem.', { x: 0.5, y: 3.1, w: W - 3.4, h: 2.2, fontFace: TXT, fontSize: 11, color: P, valign: 'top', fit: 'shrink' });
    const fotos = (d.fotos || []).filter(Boolean).slice(0, 3);
    if (fotos.length) { const fw = (W - 1 - 0.2 * (fotos.length - 1)) / fotos.length; fotos.forEach((f, i) => s.addImage({ data: f, x: 0.5 + i * (fw + 0.2), y: 5.7, w: fw, h: fw * 1.2, sizing: { type: 'cover', w: fw, h: fw * 1.2 } })); }
    else s.addText('Arraste aqui fotos do seu trabalho', { x: 0.5, y: 5.7, w: W - 1, h: 3.2, fontFace: TXT, fontSize: 11, color: CZ, align: 'center', line: { color: P, width: 1, dashType: 'dash' } });
    rodape(s, W, H);
    s = pp.addSlide(); s.background = { color: PAPEL };
    titulo(s, 0.5, 0.5, W - 1, 'Os meus', 'números', 30);
    const nums = [['Seguidores', d.seg], ['Alcance mensal', d.alc], ['Engajamento', d.eng ? L(d.eng).replace(/%?$/, '%') : '']];
    nums.forEach(([k, v], i) => { const x = 0.5 + i * 2.48; s.addShape('rect', { x, y: 1.45, w: 2.3, h: 1.5, fill: { color: i === 0 ? V : BR }, line: { color: P, width: 1.5 } }); s.addText(L(v) || '—', { x: x + 0.15, y: 1.55, w: 2.0, h: 0.8, fontFace: TIT, fontSize: 24, color: P, fit: 'shrink' }); s.addText(k.toUpperCase(), { x: x + 0.15, y: 2.4, w: 2.0, h: 0.4, fontFace: TXT, fontSize: 8, color: P }); });
    if (L(d.pub)) { s.addText('QUEM ME ACOMPANHA', { x: 0.5, y: 3.25, w: W - 1, h: 0.3, fontFace: TXT, fontSize: 8, bold: true, color: P }); s.addText(L(d.pub), { x: 0.5, y: 3.55, w: W - 1, h: 0.9, fontFace: TXT, fontSize: 11, color: P, valign: 'top', fit: 'shrink' }); }
    const bloco = (y, t, itens) => { s.addText(t.toUpperCase(), { x: 0.5, y, w: W - 1, h: 0.3, fontFace: TXT, fontSize: 8, bold: true, color: P }); s.addText(itens.length ? itens.map((x) => ({ text: x, options: { bullet: { code: '25CF' } } })) : [{ text: 'Preencha no Canva' }], { x: 0.5, y: y + 0.3, w: W - 1, h: 1.9, fontFace: TXT, fontSize: 11, color: P, valign: 'top', paraSpaceAfter: 4, fit: 'shrink' }); };
    bloco(4.7, 'Serviços e formatos', lista(d.srv)); bloco(6.95, 'Marcas, eventos e projetos', lista(d.cli));
    s.addShape('rect', { x: 0.5, y: 9.35, w: W - 1, h: 1.45, fill: { color: P } });
    s.addText([{ text: 'VAMOS CRIAR JUNTOS?\n', options: { fontFace: TIT, fontSize: 18, color: V } }, { text: [L(d.ct), L(d.lk)].filter(Boolean).join('  ·  ') || 'seu@email.com · seu link', options: { fontFace: TXT, fontSize: 11, color: PAPEL } }], { x: 0.75, y: 9.45, w: W - 1.5, h: 1.25, valign: 'middle' });
    rodape(s, W, H);
    return 'media-kit-' + nomeArq(nome);
  }

  /* PROPOSTA DE ORÇAMENTO · A4 */
  function orcamento(pp, d, f) {
    if (f === 'simples') return orcSimples(pp, d);
    if (f === 'slides') return orcSlides(pp, d);
    const [W, H] = a4(pp), s = pp.addSlide(); s.background = { color: BR };
    pill(s, 0.5, 0.5, 'Proposta de orçamento');
    titulo(s, 0.5, 1.05, W - 1, L(d.proj) || 'Projeto', '', 28);
    s.addText([['Para', L(d.cli) || 'Cliente'], ['De', L(d.de) || ''], ['Data', d.data || '']].filter((x) => x[1]).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + v + '\n', options: {} })), { x: 0.5, y: 2.0, w: W - 1, h: 0.9, fontFace: TXT, fontSize: 10, color: P, valign: 'top' });
    const head = ['Item', 'Qtd', 'Valor', 'Subtotal'].map((t) => ({ text: t.toUpperCase(), options: { bold: true, fill: { color: P }, color: PAPEL, fontSize: 8 } }));
    const rows = (d.rows || []).map((r) => [L(r.d), String(r.q || 0), brl(r.v), brl((r.q || 0) * (r.v || 0))].map((t, i) => ({ text: t, options: { align: i ? 'right' : 'left' } })));
    const tot = (d.rows || []).reduce((a, r) => a + (r.q || 0) * (r.v || 0), 0);
    rows.push([{ text: 'TOTAL', options: { bold: true, fill: { color: V } } }, { text: '', options: { fill: { color: V } } }, { text: '', options: { fill: { color: V } } }, { text: brl(tot), options: { bold: true, align: 'right', fill: { color: V } } }]);
    s.addTable([head, ...rows], { x: 0.5, y: 3.0, w: W - 1, colW: [3.77, 0.8, 1.35, 1.35], fontFace: TXT, fontSize: 10, color: P, border: { type: 'solid', pt: 0.75, color: P }, rowH: 0.42, valign: 'middle', autoPage: false });
    const y = Math.min(3.0 + 0.42 * (rows.length + 1) + 0.5, H - 3.3);
    s.addText('CONDIÇÕES', { x: 0.5, y, w: W - 1, h: 0.3, fontFace: TXT, fontSize: 8, bold: true, color: P });
    s.addText(L(d.cond) || 'Validade da proposta: 15 dias.\nPagamento: 50% na aprovação e 50% na entrega.\nInclui até 2 rodadas de ajustes.', { x: 0.5, y: y + 0.3, w: W - 1, h: 1.6, fontFace: TXT, fontSize: 10, color: P, valign: 'top' });
    rodape(s, W, H);
    return 'orcamento-' + nomeArq(L(d.proj) || 'proposta');
  }

  /* EDITAIS · apresentação 16:9: prazos + roteiro do projeto */
  function editais(pp, d, f) {
    if (f === 'doc') return editaisDoc(pp, d);
    pp.layout = 'LAYOUT_16x9'; const W = 10, H = 5.625; let s = pp.addSlide(); s.background = { color: PAPEL };
    pill(s, 0.5, 0.45, 'Editais');
    titulo(s, 0.5, 1.0, W - 1, 'Meus', 'editais', 40);
    s.addText(`${(d.lista || []).length} ${(d.lista || []).length === 1 ? 'edital salvo' : 'editais salvos'} · ${L(d.nome)}`, { x: 0.5, y: 2.4, w: W - 1, h: 0.4, fontFace: TXT, fontSize: 12, color: P });
    rodape(s, W, H);
    (d.lista || []).forEach((e) => { s = pp.addSlide(); s.background = { color: BR }; pill(s, 0.5, 0.45, e.org || 'Edital', BR);
      s.addText(L(e.t), { x: 0.5, y: 0.95, w: W - 1, h: 1.1, fontFace: TIT, fontSize: 22, color: P, valign: 'top', fit: 'shrink' });
      s.addText([['Prazo', e.prazo], ['Onde', e.onde], ['Áreas', e.areas], ['Link', e.url]].filter((x) => x[1]).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + v + '\n', options: k === 'Link' ? { hyperlink: { url: v } } : {} })), { x: 0.5, y: 2.15, w: W - 1, h: 1.2, fontFace: TXT, fontSize: 11, color: P, valign: 'top' });
      s.addText([{ text: 'CHECKLIST\n', options: { bold: true, fontSize: 8 } }, ...['Ler o regulamento inteiro', 'Separar documentos e portfólio', 'Escrever o projeto', 'Montar orçamento e cronograma', 'Enviar antes do prazo'].map((t) => ({ text: '☐  ' + t + '\n', options: {} }))], { x: 0.5, y: 3.35, w: W - 1, h: 1.7, fontFace: TXT, fontSize: 10, color: P, valign: 'top' });
      rodape(s, W, H); });
    const secs = SECS;
    s = pp.addSlide(); s.background = { color: P }; titulo(s, 0.5, 1.6, W - 1, 'Projeto', 'para edital', 36); s.addText('Roteiro para escrever a inscrição. Um slide por parte.', { x: 0.5, y: 3.1, w: W - 1, h: 0.5, fontFace: TXT, fontSize: 12, color: PAPEL });
    secs.forEach(([t, h]) => { s = pp.addSlide(); s.background = { color: PAPEL }; titulo(s, 0.5, 0.5, W - 1, t, '', 26); s.addText(h, { x: 0.5, y: 1.25, w: W - 1, h: 0.4, fontFace: TXT, fontSize: 10, color: CZ }); s.addText('Escreva aqui.', { x: 0.5, y: 1.8, w: W - 1, h: 3.0, fontFace: TXT, fontSize: 12, color: P, valign: 'top', line: { color: P, width: 1, dashType: 'dash' }, margin: 10 }); rodape(s, W, H); });
    return 'editais-' + nomeArq(L(d.nome) || 'meus');
  }

  /* CONTEÚDO · apresentação 16:9: estratégia + 4 semanas */
  function conteudo(pp, d, f) {
    if (f === 'a4') return conteudoA4(pp, d);
    pp.layout = 'LAYOUT_16x9'; const W = 10, H = 5.625; let s = pp.addSlide(); s.background = { color: PAPEL };
    pill(s, 0.5, 0.45, 'Planejamento de conteúdo');
    titulo(s, 0.5, 1.0, W - 1, 'Calendário de', 'postagens', 36);
    s.addText([['Objetivo', d.obj], ['Com quem falo', d.pub], ['O que só eu tenho', d.dif], ['Posts por semana', d.freq]].filter((x) => L(x[1])).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + L(v) + '\n', options: {} })), { x: 0.5, y: 2.5, w: W - 1, h: 2.4, fontFace: TXT, fontSize: 11, color: P, valign: 'top', fit: 'shrink' });
    rodape(s, W, H);
    if (L(d.strat)) { s = pp.addSlide(); s.background = { color: BR }; titulo(s, 0.5, 0.45, W - 1, 'Estratégia', '', 26); s.addText(L(d.strat), { x: 0.5, y: 1.2, w: W - 1, h: 3.8, fontFace: TXT, fontSize: 11, color: P, valign: 'top', fit: 'shrink' }); rodape(s, W, H); }
    const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], posts = d.posts || [];
    [0, 1, 2, 3].forEach((w) => { const l = posts.filter((p) => p.w === w).sort((a, b) => a.d - b.d); if (!l.length) return; s = pp.addSlide(); s.background = { color: PAPEL };
      titulo(s, 0.5, 0.4, W - 1, 'Semana', String(w + 1), 24);
      const cw = (W - 1 - 0.15 * (l.length - 1)) / l.length;
      l.forEach((p, i) => { const x = 0.5 + i * (cw + 0.15); s.addShape('rect', { x, y: 1.2, w: cw, h: 3.85, fill: { color: BR }, line: { color: P, width: 1.25 } });
        s.addText(DIAS[p.d] + ' · ' + L(p.f), { x: x + 0.1, y: 1.25, w: cw - 0.2, h: 0.5, fontFace: TIT, fontSize: 10, color: P, fill: { color: V }, fit: 'shrink' });
        const txt = p.g ? [{ text: 'GANCHO\n', options: { bold: true, fontSize: 7 } }, { text: L(p.g) + '\n\n' }, { text: 'CORPO\n', options: { bold: true, fontSize: 7 } }, { text: L(p.c) + '\n\n' }, { text: 'FECHAMENTO\n', options: { bold: true, fontSize: 7 } }, { text: L(p.e) }] : [{ text: L(p.t) }];
        s.addText(txt, { x: x + 0.1, y: 1.85, w: cw - 0.2, h: 3.1, fontFace: TXT, fontSize: 9, color: P, valign: 'top', fit: 'shrink' }); });
      rodape(s, W, H); });
    if (!posts.length) { s = pp.addSlide(); s.background = { color: PAPEL }; titulo(s, 0.5, 0.5, W - 1, 'Semana', '1', 24); s.addText('Gere o calendário no estúdio ou monte aqui no Canva.', { x: 0.5, y: 1.4, w: W - 1, h: 0.5, fontFace: TXT, fontSize: 12, color: P }); rodape(s, W, H); }
    return 'conteudo-' + nomeArq(L(d.nome) || 'calendario');
  }


  /* ---- novos formatos ---- */
  const claro = (sl, c) => { sl.background = { color: c }; };
  const bul = (sl, x, y, w, h, itens, ph, size) => sl.addText(itens.length ? itens.map((t) => ({ text: t, options: { bullet: { code: '25CF' } } })) : [{ text: ph, options: { color: CZ } }], { x, y, w, h, fontFace: TXT, fontSize: size || 11, color: P, valign: 'top', paraSpaceAfter: 4, fit: 'shrink' });
  const lbl = (sl, x, y, w, t, c) => sl.addText(L(t).toUpperCase(), { x, y, w, h: 0.3, fontFace: TXT, fontSize: 8, bold: true, color: c || P });
  const caixaNum = (sl, x, y, w, h, k, v, fill, size) => { sl.addShape('rect', { x, y, w, h, fill: { color: fill }, line: { color: P, width: 1.5 } }); sl.addText(L(v) || '—', { x: x + 0.12, y: y + 0.08, w: w - 0.24, h: h * 0.55, fontFace: TIT, fontSize: size || 20, color: P, fit: 'shrink' }); sl.addText(k.toUpperCase(), { x: x + 0.12, y: y + h * 0.62, w: w - 0.24, h: 0.3, fontFace: TXT, fontSize: 8, color: P }); };
  const fotosLinha = (sl, fotos, x, y, w, h) => { const n = Math.max(fotos.length, 1), fw = (w - 0.2 * (n - 1)) / n; if (!fotos.length) { sl.addText('Arraste aqui fotos do seu trabalho', { x, y, w, h, fontFace: TXT, fontSize: 10, color: CZ, align: 'center', line: { color: P, width: 1, dashType: 'dash' } }); return; } fotos.forEach((f, i) => sl.addImage({ data: f, x: x + i * (fw + 0.2), y, w: fw, h, sizing: { type: 'cover', w: fw, h } })); };
  const pctE = (e) => (e ? L(e).replace(/%?$/, '%') : '');

  function kitA4x1(pp, d) {
    const [W, H] = a4(pp); const s = pp.addSlide(); claro(s, PAPEL); const nome = L(d.nome) || 'Seu nome', parts = nome.split(' ');
    pill(s, 0.5, 0.45, 'Media kit'); titulo(s, 0.5, 0.95, W - 1, parts[0], parts.slice(1).join(' '), 32);
    const cw = d.avatar ? W - 3.3 : W - 1;
    s.addText([L(d.esp), L(d.cid)].filter(Boolean).join('  ·  '), { x: 0.5, y: 1.95, w: cw, h: 0.4, fontFace: TXT, fontSize: 10, bold: true, color: P });
    s.addText(L(d.bio) || 'Escreva aqui a sua bio: quem você é, o que cria e para quem.', { x: 0.5, y: 2.4, w: cw, h: 1.4, fontFace: TXT, fontSize: 10, color: P, valign: 'top', fit: 'shrink' });
    if (d.avatar) s.addImage({ data: d.avatar, x: W - 2.6, y: 1.95, w: 2.1, h: 2.1, rounding: true });
    fotosLinha(s, (d.fotos || []).filter(Boolean).slice(0, 3), 0.5, 4.2, W - 1, 1.9);
    const cx = (W - 1 - 0.4) / 3;
    [['Seguidores', d.seg], ['Alcance mensal', d.alc], ['Engajamento', pctE(d.eng)]].forEach(([k, v], i) => caixaNum(s, 0.5 + i * (cx + 0.2), 6.3, cx, 1.05, k, v, i === 0 ? V : BR, 18));
    const hw = (W - 1.4) / 2; lbl(s, 0.5, 7.6, hw, 'Serviços e formatos'); bul(s, 0.5, 7.9, hw, 1.7, lista(d.srv), 'Preencha no estúdio', 10);
    lbl(s, 0.5 + hw + 0.4, 7.6, hw, 'Marcas, eventos e projetos'); bul(s, 0.5 + hw + 0.4, 7.9, hw, 1.7, lista(d.cli), 'Preencha no estúdio', 10);
    if (L(d.pub)) { lbl(s, 0.5, 9.55, W - 1, 'Quem me acompanha'); s.addText(L(d.pub), { x: 0.5, y: 9.8, w: W - 1, h: 0.45, fontFace: TXT, fontSize: 9, color: P, fit: 'shrink' }); }
    s.addShape('rect', { x: 0.5, y: 10.35, w: W - 1, h: 0.8, fill: { color: P } });
    s.addText([{ text: 'VAMOS CRIAR JUNTOS?  ', options: { fontFace: TIT, fontSize: 13, color: V } }, { text: [L(d.ct), L(d.lk)].filter(Boolean).join('  ·  ') || 'seu@email.com · seu link', options: { fontFace: TXT, fontSize: 10, color: PAPEL } }], { x: 0.7, y: 10.4, w: W - 1.4, h: 0.7, valign: 'middle', fit: 'shrink' });
    rodape(s, W, H); return 'media-kit-' + nomeArq(nome);
  }

  function kitSlides(pp, d) {
    pp.layout = 'LAYOUT_16x9'; const W = 10, H = 5.625, nome = L(d.nome) || 'Seu nome', parts = nome.split(' ');
    let s = pp.addSlide(); claro(s, P); pill(s, 0.5, 0.45, 'Media kit');
    s.addText([{ text: parts[0].toUpperCase() + '\n', options: { color: PAPEL } }, { text: parts.slice(1).join(' ').toUpperCase(), options: { color: V } }], { x: 0.5, y: 1.2, w: d.avatar ? 5.8 : 9, h: 2.4, fontFace: TIT, fontSize: 44, valign: 'top', fit: 'shrink' });
    s.addText([L(d.esp), L(d.cid)].filter(Boolean).join('  ·  '), { x: 0.5, y: 3.9, w: 6, h: 0.5, fontFace: TXT, fontSize: 12, color: PAPEL });
    if (d.avatar) s.addImage({ data: d.avatar, x: 6.9, y: 1.2, w: 2.6, h: 2.6, rounding: true });
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'Quem', 'eu sou', 26);
    s.addText(L(d.bio) || 'Escreva aqui a sua bio.', { x: 0.5, y: 1.4, w: 4.4, h: 3.5, fontFace: TXT, fontSize: 13, color: P, valign: 'top', fit: 'shrink' });
    const fs = (d.fotos || []).filter(Boolean).slice(0, 3);
    if (fs.length) fs.forEach((f, i) => s.addImage({ data: f, x: 5.3 + (i % 2) * 2.3, y: 0.6 + Math.floor(i / 2) * 2.3, w: 2.1, h: 2.1, sizing: { type: 'cover', w: 2.1, h: 2.1 } }));
    else s.addText('Fotos do seu trabalho', { x: 5.3, y: 0.6, w: 4.2, h: 4.2, fontFace: TXT, fontSize: 10, color: CZ, align: 'center', line: { color: P, width: 1, dashType: 'dash' } });
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'Os meus', 'números', 26);
    [['Seguidores', d.seg], ['Alcance mensal', d.alc], ['Engajamento', pctE(d.eng)]].forEach(([k, v], i) => caixaNum(s, 0.5 + i * 3.05, 1.4, 2.85, 1.6, k, v, i === 0 ? V : BR, 28));
    if (L(d.pub)) { lbl(s, 0.5, 3.4, W - 1, 'Quem me acompanha'); s.addText(L(d.pub), { x: 0.5, y: 3.75, w: W - 1, h: 1, fontFace: TXT, fontSize: 13, color: P, valign: 'top', fit: 'shrink' }); }
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'O que', 'ofereço', 26);
    lbl(s, 0.5, 1.4, 4.3, 'Serviços e formatos'); bul(s, 0.5, 1.75, 4.3, 3.2, lista(d.srv), 'Preencha no estúdio', 13);
    lbl(s, 5.2, 1.4, 4.3, 'Marcas, eventos e projetos'); bul(s, 5.2, 1.75, 4.3, 3.2, lista(d.cli), 'Preencha no estúdio', 13);
    s = pp.addSlide(); claro(s, V); titulo(s, 0.5, 1.5, W - 1, 'Vamos criar', 'juntos?', 40);
    s.addText([L(d.ct), L(d.lk)].filter(Boolean).join('\n') || 'seu@email.com\nseu link', { x: 0.5, y: 3.5, w: W - 1, h: 1.2, fontFace: TXT, fontSize: 16, color: P, valign: 'top' });
    return 'media-kit-slides-' + nomeArq(nome);
  }

  const totalDe = (d) => (d.rows || []).reduce((a, r) => a + (r.q || 0) * (r.v || 0), 0);
  function orcSimples(pp, d) {
    const [W, H] = a4(pp), s = pp.addSlide(); claro(s, BR); pill(s, 0.5, 0.5, 'Orçamento');
    titulo(s, 0.5, 1.0, W - 1, L(d.proj) || 'Projeto', '', 26);
    s.addText([['Para', L(d.cli)], ['De', L(d.de)], ['Data', d.data]].filter((x) => x[1]).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + v + '\n', options: {} })), { x: 0.5, y: 1.95, w: W - 1, h: 0.9, fontFace: TXT, fontSize: 10, color: P, valign: 'top' });
    s.addShape('rect', { x: 0.5, y: 3.0, w: W - 1, h: 1.2, fill: { color: V }, line: { color: P, width: 1.5 } });
    s.addText('TOTAL', { x: 0.75, y: 3.1, w: 3, h: 0.3, fontFace: TXT, fontSize: 9, bold: true, color: P }); s.addText(brl(totalDe(d)), { x: 0.75, y: 3.4, w: W - 1.5, h: 0.7, fontFace: TIT, fontSize: 30, color: P });
    const head = ['Item', 'Qtd', 'Valor'].map((t) => ({ text: t.toUpperCase(), options: { bold: true, fontSize: 8, color: P, border: [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 1.5, color: P }, { type: 'none' }] } }));
    const rows = (d.rows || []).map((r) => [L(r.d), String(r.q || 0), brl((r.q || 0) * (r.v || 0))].map((t, i) => ({ text: t, options: { align: i ? 'right' : 'left', border: [{ type: 'none' }, { type: 'none' }, { type: 'solid', pt: 0.5, color: CZ }, { type: 'none' }] } })));
    s.addTable([head, ...rows], { x: 0.5, y: 4.6, w: W - 1, colW: [4.6, 0.9, 2.27], fontFace: TXT, fontSize: 10, color: P, rowH: 0.4, valign: 'middle', autoPage: false });
    const y = Math.min(4.6 + 0.4 * (rows.length + 1) + 0.5, H - 2.3); lbl(s, 0.5, y, W - 1, 'Condições');
    s.addText(L(d.cond) || 'Validade: 15 dias. Pagamento: 50% na aprovação e 50% na entrega.', { x: 0.5, y: y + 0.3, w: W - 1, h: 1.2, fontFace: TXT, fontSize: 10, color: P, valign: 'top' });
    rodape(s, W, H); return 'orcamento-rapido-' + nomeArq(L(d.proj) || 'proposta');
  }

  function orcSlides(pp, d) {
    pp.layout = 'LAYOUT_16x9'; const W = 10, H = 5.625, rows = d.rows || [];
    let s = pp.addSlide(); claro(s, P); pill(s, 0.5, 0.45, 'Proposta');
    s.addText(L(d.proj).toUpperCase() || 'PROJETO', { x: 0.5, y: 1.3, w: 9, h: 1.8, fontFace: TIT, fontSize: 36, color: PAPEL, valign: 'top', fit: 'shrink' });
    s.addText([['Para', L(d.cli)], ['De', L(d.de)], ['Data', d.data]].filter((x) => x[1]).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + v + '\n', options: {} })), { x: 0.5, y: 3.5, w: 9, h: 1.2, fontFace: TXT, fontSize: 12, color: V, valign: 'top' });
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'O que', 'entregamos', 26);
    bul(s, 0.5, 1.4, W - 1, 3.6, rows.map((r) => `${L(r.d)}${r.q > 1 ? ' (' + r.q + ')' : ''}`).filter((x) => L(x)), 'Liste aqui o escopo.', 14);
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'O', 'investimento', 26);
    const head = ['Item', 'Qtd', 'Valor', 'Subtotal'].map((t) => ({ text: t.toUpperCase(), options: { bold: true, fill: { color: P }, color: PAPEL, fontSize: 9 } }));
    const body = rows.map((r) => [L(r.d), String(r.q || 0), brl(r.v), brl((r.q || 0) * (r.v || 0))].map((t, i) => ({ text: t, options: { align: i ? 'right' : 'left' } })));
    body.push([{ text: 'TOTAL', options: { bold: true, fill: { color: V } } }, { text: '', options: { fill: { color: V } } }, { text: '', options: { fill: { color: V } } }, { text: brl(totalDe(d)), options: { bold: true, align: 'right', fill: { color: V } } }]);
    s.addTable([head, ...body], { x: 0.5, y: 1.3, w: W - 1, colW: [4.4, 1.0, 1.8, 1.8], fontFace: TXT, fontSize: 11, color: P, border: { type: 'solid', pt: 0.75, color: P }, rowH: 0.36, valign: 'middle', autoPage: false });
    s = pp.addSlide(); claro(s, PAPEL); titulo(s, 0.5, 0.45, W - 1, 'Condições e', 'próximos passos', 26);
    s.addText(L(d.cond) || 'Validade da proposta: 15 dias.\nPagamento: 50% na aprovação e 50% na entrega.\nInclui até 2 rodadas de ajustes.', { x: 0.5, y: 1.4, w: 4.4, h: 3.4, fontFace: TXT, fontSize: 12, color: P, valign: 'top' });
    bul(s, 5.2, 1.4, 4.3, 3.4, ['Aprovação da proposta', 'Assinatura e primeiro pagamento', 'Início do projeto'], '', 12);
    return 'proposta-slides-' + nomeArq(L(d.proj) || 'proposta');
  }

  function editaisDoc(pp, d) {
    const [W, H] = a4(pp); let s = pp.addSlide(); claro(s, PAPEL);
    pill(s, 0.5, 0.5, 'Projeto para edital'); titulo(s, 0.5, 1.05, W - 1, 'Nome do', 'projeto', 34);
    s.addText(L(d.nome), { x: 0.5, y: 2.5, w: W - 1, h: 0.4, fontFace: TXT, fontSize: 11, color: P });
    lbl(s, 0.5, 3.4, W - 1, 'Editais salvos');
    bul(s, 0.5, 3.75, W - 1, 4.5, (d.lista || []).map((e) => `${L(e.t)}  ·  ${L(e.prazo)}`), 'Salve editais no estúdio para listar aqui.', 11);
    lbl(s, 0.5, 8.4, W - 1, 'Checklist');
    s.addText(['Ler o regulamento inteiro', 'Separar documentos e portfólio', 'Escrever o projeto', 'Montar orçamento e cronograma', 'Enviar antes do prazo'].map((t) => ({ text: '☐  ' + t + '\n', options: {} })), { x: 0.5, y: 8.7, w: W - 1, h: 1.9, fontFace: TXT, fontSize: 11, color: P, valign: 'top' });
    rodape(s, W, H);
    SECS.forEach(([t, h], i) => { s = pp.addSlide(); claro(s, PAPEL); lbl(s, 0.5, 0.5, 2, String(i + 1).padStart(2, '0')); titulo(s, 0.5, 0.85, W - 1, t, '', 24);
      s.addText(h, { x: 0.5, y: 1.75, w: W - 1, h: 0.4, fontFace: TXT, fontSize: 10, color: CZ });
      s.addText('Escreva aqui.', { x: 0.5, y: 2.3, w: W - 1, h: 8.4, fontFace: TXT, fontSize: 12, color: P, valign: 'top', line: { color: P, width: 1, dashType: 'dash' }, margin: 12 }); rodape(s, W, H); });
    return 'projeto-edital-' + nomeArq(L(d.nome) || 'meu');
  }

  function conteudoA4(pp, d) {
    const [W, H] = a4(pp); const s = pp.addSlide(); claro(s, PAPEL); pill(s, 0.5, 0.45, 'Planejamento de conteúdo'); titulo(s, 0.5, 0.95, W - 1, 'Calendário de', 'postagens', 26);
    s.addText([['Objetivo', d.obj], ['Com quem falo', d.pub], ['Posts por semana', d.freq]].filter((x) => L(x[1])).map(([k, v]) => ({ text: k.toUpperCase() + '  ' + L(v) + '\n', options: {} })), { x: 0.5, y: 1.9, w: W - 1, h: 0.9, fontFace: TXT, fontSize: 9, color: P, valign: 'top', fit: 'shrink' });
    const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], posts = d.posts || [], cw = (W - 1) / 7, top = 3.0, rh = 1.75;
    DIAS.forEach((t, i) => s.addText(t.toUpperCase(), { x: 0.5 + i * cw, y: top - 0.35, w: cw, h: 0.3, fontFace: TXT, fontSize: 8, bold: true, color: P, align: 'center' }));
    [0, 1, 2, 3].forEach((w) => { lbl(s, 0.5, top + w * rh - 0.02, 2, 'Semana ' + (w + 1), CZ); DIAS.forEach((t, i) => { const p = posts.find((x) => x.w === w && x.d === i), x = 0.5 + i * cw, y = top + 0.25 + w * rh;
      s.addShape('rect', { x, y, w: cw, h: rh - 0.35, fill: { color: p ? V : BR }, line: { color: P, width: 0.75 } });
      if (p) s.addText(L(p.f) + (p.g ? '\n' + L(p.g) : ''), { x: x + 0.04, y: y + 0.04, w: cw - 0.08, h: rh - 0.43, fontFace: TXT, fontSize: 6.5, color: P, valign: 'top', fit: 'shrink' }); }); });
    rodape(s, W, H); return 'calendario-' + nomeArq(L(d.nome) || 'conteudo');
  }

  const PECAS = { kit: mediaKit, orc: orcamento, ed: editais, plan: conteudo };
  async function gerar(tipo, dados, o) { o = o || {}; tema(o.estilo);
    const PG = await carregar(); const pp = new PG(); pp.author = L(dados.nome) || 'CR1E.Collab'; pp.company = 'CR1E.Collab'; pp.title = tipo;
    const base = PECAS[tipo](pp, dados, o.fmt); const blob = await pp.write({ outputType: 'blob' });
    return { blob, name: base + '.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };
  }
  window.CR1E_CANVA = { gerar };
})();
