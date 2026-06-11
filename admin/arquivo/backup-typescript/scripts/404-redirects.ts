const normalizePath = (p: string): string => p.replace(/\/+$/, '').toLowerCase();

const redirectsMap: Record<string, string> = {
  '/instagram': 'https://www.instagram.com/camg_atletismo',
  '/facebook': 'https://www.facebook.com/catletismomg',
  '/youtube': 'https://www.youtube.com/@catletismomg',
  '/inscricoes': 'https://app.clube.pt/CAMG/Processes/CreatePreRegistration',
  '/inscrever': 'https://app.clube.pt/CAMG/Processes/CreatePreRegistration',
  '/regulamento': 'https://makyneta.github.io/catletismomg/assets/pdf/regulamento.pdf',
  '/calendario': 'https://www.adal.pt/ficheirosmenu/69c6c57294009.pdf',
  '/volta-aos-7-vidrala': 'https://www.facebook.com/profile.php?id=61579718960280',
  '/editar-regulamento': 'https://canva.link/l380nzavpmj5ew4',
  '/editar-panfleto': 'https://canva.link/lu3q6v5vwvpcvc7',
  '/newsletter': 'https://catletismomg.beehiiv.com/',
  '/mfa-2026': 'https://makyneta.github.io/catletismomg/arquivo/mfa26.html',
  '/mfa-2026-resultados': 'https://www.fpacompeticoes.pt/5948/competicao',
  '/mfa-2025': 'https://alfaloc.pt/11-meeting-fernando-alves/',
  '/mfa-2025-resultados': 'https://www.fpacompeticoes.pt/1334/competicao',
  '/mfa-2024': 'https://meetingfernandoalves.alfaloc.pt/',
  '/mfa-2024-resultados': 'https://alfaloc.pt/11-meeting-fernando-alves/',
};

const rawPath: string = normalizePath(window.location.pathname);
const path: string = rawPath === '' ? '/' : rawPath;

let redirectUrl: string | null = null;
for (const key of Object.keys(redirectsMap)) {
  const k: string = key.replace(/^\/+|\/+$/g, '').toLowerCase();
  const testKey: string = k === '' ? '/' : '/' + k;
  if (path === testKey || (k !== '' && path.endsWith('/' + k))) {
    redirectUrl = redirectsMap[key];
    break;
  }
}

if (redirectUrl) {
  window.location.replace(redirectUrl);
}
