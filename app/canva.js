/* CR1E.Collab · Estúdio → Canva
   Transforma o que a pessoa preencheu no estúdio (media kit, orçamento, editais e conteúdo)
   em um arquivo .pptx editável, no formato da peça. No Canva: Criar design › Importar arquivo.
   No celular, o arquivo pode ir direto para o app do Canva pelo menu de compartilhar.

   Conexão direta (abrir o design já dentro da conta Canva da pessoa) depende da Canva Connect API:
   uma integração registrada em canva.com/developers e um pequeno servidor para o login (OAuth) e
   para enviar o arquivo pela API de importação. Quando existir, basta trocar `entregar()`. */
(function () {
  const P = '0E0E0C', PAPEL = 'F4F3EE', V = 'C5FF3D', CZ = '3A3A36', BR = 'FFFFFF';
  const TIT = 'Archivo Black', TXT = 'Space Mono';
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

  function a4(pp) { pp.defineLayout({ name: 'A4V', width: 8.27, height: 11.69 }); pp.layout = 'A4V'; return [8.27, 11.69]; }

  /* MEDIA KIT · 2 páginas A4 */
  function mediaKit(pp, d) {
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
  function orcamento(pp, d) {
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
  function editais(pp, d) {
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
    const secs = [['Apresentação', 'O que é o projeto, em poucas linhas.'], ['Justificativa', 'Por que ele importa e para quem.'], ['Objetivos', 'O que vocês querem alcançar.'], ['Público', 'Quem vai ser alcançado e como.'], ['Cronograma', 'Mês a mês, do começo à prestação de contas.'], ['Orçamento', 'Item, quantidade e valor.'], ['Ficha técnica', 'Nome e função de cada pessoa.'], ['Contrapartida e acessibilidade', 'O que o projeto devolve e como inclui.']];
    s = pp.addSlide(); s.background = { color: P }; titulo(s, 0.5, 1.6, W - 1, 'Projeto', 'para edital', 36); s.addText('Roteiro para escrever a inscrição. Um slide por parte.', { x: 0.5, y: 3.1, w: W - 1, h: 0.5, fontFace: TXT, fontSize: 12, color: PAPEL });
    secs.forEach(([t, h]) => { s = pp.addSlide(); s.background = { color: PAPEL }; titulo(s, 0.5, 0.5, W - 1, t, '', 26); s.addText(h, { x: 0.5, y: 1.25, w: W - 1, h: 0.4, fontFace: TXT, fontSize: 10, color: CZ }); s.addText('Escreva aqui.', { x: 0.5, y: 1.8, w: W - 1, h: 3.0, fontFace: TXT, fontSize: 12, color: P, valign: 'top', line: { color: P, width: 1, dashType: 'dash' }, margin: 10 }); rodape(s, W, H); });
    return 'editais-' + nomeArq(L(d.nome) || 'meus');
  }

  /* CONTEÚDO · apresentação 16:9: estratégia + 4 semanas */
  function conteudo(pp, d) {
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

  const PECAS = { kit: mediaKit, orc: orcamento, ed: editais, plan: conteudo };
  async function gerar(tipo, dados) {
    const PG = await carregar(); const pp = new PG(); pp.author = L(dados.nome) || 'CR1E.Collab'; pp.company = 'CR1E.Collab'; pp.title = tipo;
    const base = PECAS[tipo](pp, dados); const blob = await pp.write({ outputType: 'blob' });
    return { blob, name: base + '.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' };
  }
  window.CR1E_CANVA = { gerar };
})();
