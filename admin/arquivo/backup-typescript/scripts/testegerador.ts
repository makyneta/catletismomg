function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildParagraphs(text: string): string {
  if (!text.trim()) return '    <p>CONTEÚDO</p>';
  return text.trim()
    .split(/\n\s*\n/)
    .map(p => '    <p>' + p.trim().replace(/\n/g, ' ') + '</p>')
    .join('\n');
}

function update(): void {
  const tag     = (document.getElementById('f-tag') as HTMLInputElement).value.trim() || 'MILHA';
  const title   = (document.getElementById('f-title') as HTMLInputElement).value.trim() || 'TÍTULO DA NOTÍCIA';
  const lead    = (document.getElementById('f-lead') as HTMLInputElement).value.trim() || 'PRÉ-DESCRIÇÃO';
  const img     = (document.getElementById('f-img') as HTMLInputElement).value.trim();
  const alt     = (document.getElementById('f-alt') as HTMLInputElement).value.trim() || esc(title);
  const content = (document.getElementById('f-content') as HTMLTextAreaElement).value;
  const imgSrc  = '../../assets/images/news/' + (img || '');
  const paras   = buildParagraphs(content);
  const pageTitle: string = title !== 'TÍTULO DA NOTÍCIA' ? title + ' | CAMG' : ' | CAMG';

  const html: string =
`<!DOCTYPE html>
<html lang="pt">
<head>
<head>
    <!-- Metadados -->
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Makyneta Unipessoal, Lda.">
        <meta name="og:image" content="${esc(imgSrc)}">
        <meta name="twitter:image" content="${esc(imgSrc)}">
    <!-- Styles -->
        <link rel="stylesheet" href="../../assets/styles/loading.css">
        <link rel="stylesheet" href="../../assets/styles/layout.css">
        <link rel="stylesheet" href="../../assets/styles/noticia.css">
    <!-- Script -->
        <script src="../../assets/scripts/loading.js"><\/script>
        <script src="../../assets/scripts/layout.js" defer><\/script>
    <!-- Title & Favicon -->
        <title>${esc(pageTitle)}</title>
        <link rel="icon" type="image/png" href="../../assets/images/favicon.png">
</head>

<body>

<div class="article-nav">
  <div class="nav-container">
    <a href="../../noticias.html" class="back-btn">← Voltar às Notícias</a>
  </div>
</div>

<article class="article-container">
  <header class="article-header">
    <span class="article-tag">${esc(tag)}</span>
    <h1>${esc(title)}</h1>
    <p class="article-lead">${esc(lead)}</p>
  </header>

  <div class="article-main-image">
    <img src="${esc(imgSrc)}" alt="${esc(alt)}">
  </div>

  <div class="article-content">
${paras}
  </div>
</article>

</body>
</html>`;

  document.getElementById('output')!.textContent = html;
}

function setTag(el: HTMLElement, val: string): void {
  (document.getElementById('f-tag') as HTMLInputElement).value = val;
  document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  update();
}

function syncTag(): void {
  const val: string = (document.getElementById('f-tag') as HTMLInputElement).value.trim().toUpperCase();
  document.querySelectorAll('.pill').forEach(b => {
    b.classList.toggle('active', b.textContent === val);
  });
}

async function copyCode(): Promise<void> {
  const code: string = document.getElementById('output')!.textContent;
  try {
    await navigator.clipboard.writeText(code);
  } catch (_e: unknown) {
    const ta = document.createElement('textarea');
    ta.value = code;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  const msg = document.getElementById('ok-msg') as HTMLDivElement;
  msg.style.display = 'flex';
  setTimeout(() => msg.style.display = 'none', 2500);
}

function resetForm(): void {
  (['f-title','f-lead','f-img','f-alt','f-content'] as const).forEach(id => {
    (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement).value = '';
  });
  (document.getElementById('f-tag') as HTMLInputElement).value = 'MILHA';
  document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
  document.querySelector('.pill')!.classList.add('active');
  update();
}

update();
