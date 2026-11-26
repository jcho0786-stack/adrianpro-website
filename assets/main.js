/* Adrianpro — shared header/footer + interactions
   회사 정보는 아래 COMPANY 한 곳만 고치면 한글·영문 전 페이지에 반영됩니다.
   영문 페이지는 /en/ 폴더에 있고, <html lang="en">으로 구분합니다. */
const COMPANY = {
  nameKo: '에이드리안프로 주식회사',
  nameEn: 'Adrianpro Co., Ltd.',
  addrKo: '충청북도 음성군 금왕읍 금일로 284번길 23-5',
  addrEn: '23-5, Geumil-ro 284beon-gil, Geumwang-eup, Eumseong-gun, Chungcheongbuk-do, Korea 27642',
  tel: '043-750-7073',
  telIntl: '+82-43-750-7073',
  fax: '043-750-7074',
  faxIntl: '+82-43-750-7074',
  email: 'john@adrianpro.co.kr', // 문의 접수 메일 주소
};

const LANG = document.documentElement.lang === 'en' ? 'en' : 'ko';
const BASE = LANG === 'en' ? '../' : '';   // 영문 페이지에서 assets 폴더 경로

const T = {
  ko: {
    nav: [['index.html', '홈'], ['about.html', '회사소개'], ['products.html', '제품'], ['quality.html', '설비·품질'], ['process.html', 'OEM 프로세스'], ['contact.html', '문의']],
    homeAria: '에이드리안프로 홈', rfq: '견적 문의', menu: '메뉴 열기', switchLabel: 'EN', switchTitle: 'English',
    footIntro: '라미네이트 튜브 전문 기업.<br>전 자동화 설비와 엄격한 품질 관리로 품질과 납기를 지킵니다.',
    links: '바로가기', contact: '연락처', address: '주소', addr: COMPANY.addrKo, addrSub: COMPANY.addrEn,
    tel: COMPANY.tel, fax: COMPANY.fax, bottomRight: COMPANY.nameKo,
    labels: { company: '회사명', name: '담당자', phone: '연락처', email: '이메일', agree: '개인정보 수집·이용 동의' },
    errAgree: '동의가 필요합니다.', errType: '형식이 올바르지 않습니다.', errReq: '필수 항목입니다.',
    errList: '다음 항목을 확인해 주세요: ', sendingBtn: '보내는 중…', sending: '문의를 접수하고 있습니다…',
    subject: (c, n) => `[홈페이지 견적문의] ${c} / ${n}`,
    keys: { company: '회사명', name: '담당자', phone: '연락처', email: '이메일', type: '문의 유형', diameter: '튜브 직경', message: '문의 내용' },
    done: '<b>문의가 접수되었습니다.</b> 담당자가 확인 후 빠르게 연락드리겠습니다. 감사합니다.',
    fail: (m) => `접수 중 문제가 발생했습니다. 잠시 후 다시 시도하시거나, ${m} 또는 전화 <b>${COMPANY.tel}</b>로 연락 주세요.`,
  },
  en: {
    nav: [['index.html', 'Home'], ['about.html', 'About'], ['products.html', 'Products'], ['quality.html', 'Facility & Quality'], ['process.html', 'OEM Process'], ['contact.html', 'Contact']],
    homeAria: 'Adrianpro home', rfq: 'Request a Quote', menu: 'Open menu', switchLabel: 'KO', switchTitle: '한국어',
    footIntro: 'Laminate tube manufacturer.<br>Fully automated lines and strict quality control for consistent quality and on-time delivery.',
    links: 'Menu', contact: 'Contact', address: 'Address', addr: COMPANY.addrEn, addrSub: COMPANY.addrKo,
    tel: COMPANY.telIntl, fax: COMPANY.faxIntl, bottomRight: 'Made in Korea',
    labels: { company: 'Company', name: 'Name', phone: 'Phone', email: 'Email', agree: 'Privacy consent' },
    errAgree: 'Consent is required.', errType: 'Please check the format.', errReq: 'This field is required.',
    errList: 'Please check the following: ', sendingBtn: 'Sending…', sending: 'Sending your inquiry…',
    subject: (c, n) => `[Website Inquiry - EN] ${c} / ${n}`,
    keys: { company: 'Company', name: 'Name', phone: 'Phone', email: 'Email', type: 'Inquiry type', diameter: 'Tube diameter', message: 'Message' },
    done: '<b>Thank you. Your inquiry has been received.</b> Our team will get back to you shortly.',
    fail: (m) => `Something went wrong. Please try again later, or contact us at ${m} or <b>${COMPANY.telIntl}</b>.`,
  },
}[LANG];

const LOGO = `<img class="brand-logo" src="${BASE}assets/img/logo.png" alt="adrianpro — A Cosmetic Container Company" width="1134" height="444">`;

function renderChrome() {
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const otherLang = LANG === 'en' ? `../${here}` : `en/${here}`;
  const links = T.nav.map(([href, label]) =>
    `<li><a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');

  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="wrap nav">
        <a class="brand" href="index.html" aria-label="${T.homeAria}">${LOGO}</a>
        <ul class="nav-links" id="nav-links">${links}</ul>
        <div class="nav-cta">
          <a class="lang-switch" href="${otherLang}" hreflang="${LANG === 'en' ? 'ko' : 'en'}" title="${T.switchTitle}">${T.switchLabel}</a>
          <a class="btn btn-primary btn-sm" href="contact.html#rfq">${T.rfq} <span class="arrow">→</span></a>
          <button class="menu-btn" aria-label="${T.menu}" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
        </div>
      </div>`;
    const btn = header.querySelector('.menu-btn');
    btn.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <a class="brand brand-foot" href="index.html">${LOGO}</a>
            <p style="margin-top:18px;max-width:300px">${T.footIntro}</p>
          </div>
          <div><h5>${T.links}</h5><ul>${T.nav.slice(1).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
          <div><h5>${T.contact}</h5><ul>
            <li>Tel <a class="mono" href="tel:${COMPANY.telIntl.replace(/-/g, '')}">${T.tel}</a></li>
            <li>Fax <span class="mono">${T.fax}</span></li>
            ${COMPANY.email ? `<li><a href="mailto:${COMPANY.email}">${COMPANY.email}</a></li>` : ''}
          </ul></div>
          <div><h5>${T.address}</h5><p>${T.addr}</p><p style="margin-top:8px;font-size:12px;color:#7D8896">${T.addrSub}</p></div>
        </div>
        <div class="foot-bottom">
          <span>© ${new Date().getFullYear()} ${COMPANY.nameEn} All rights reserved.</span>
          <span>${T.bottomRight}</span>
        </div>
      </div>`;
  }
  document.querySelectorAll('[data-co]').forEach(el => { el.textContent = COMPANY[el.dataset.co] || ''; });
}

function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
}

function countUp() {
  const els = document.querySelectorAll('[data-count]');
  const run = el => {
    const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    const t0 = performance.now(), dur = 1400;
    const step = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toLocaleString('ko-KR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .6 });
  els.forEach(el => io.observe(el));
}

function rfqForm() {
  const form = document.getElementById('rfq-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const clearErr = el => { const f = el.closest('.field'); if (f) { f.classList.remove('invalid'); f.querySelector('.err')?.remove(); } };
  form.addEventListener('input', e => { if (e.target.checkValidity()) clearErr(e.target); });
  form.addEventListener('change', e => { if (e.target.checkValidity()) clearErr(e.target); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.dataset.sending) return;
    form.querySelectorAll('.field.invalid').forEach(f => { f.classList.remove('invalid'); f.querySelector('.err')?.remove(); });
    const bad = [...form.elements].filter(el => el.willValidate && !el.checkValidity());
    if (bad.length) {
      bad.forEach(el => {
        const f = el.closest('.field'); f.classList.add('invalid');
        const msg = document.createElement('small'); msg.className = 'err';
        msg.textContent = el.type === 'checkbox' ? T.errAgree : el.validity.typeMismatch ? T.errType : T.errReq;
        f.appendChild(msg);
      });
      status.className = 'form-status error show';
      status.textContent = T.errList + bad.map(el => T.labels[el.name || el.id] || el.name).join(', ');
      bad[0].focus({ preventScroll: true });
      bad[0].closest('.field').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const d = new FormData(form);
    if (d.get('_honey')) return; // 스팸 봇 차단
    const K = T.keys;
    const types = d.getAll('type').join(', ') || '-';
    const fields = [
      [K.company, d.get('company')], [K.name, d.get('name')], [K.phone, d.get('phone')], [K.email, d.get('email')],
      [K.type, types], [K.diameter, d.get('diameter') || '-'], [K.message, d.get('message') || '-'],
    ];
    const body = fields.map(([k, v]) => `${k}: ${v}`).join('\n');

    const btn = form.querySelector('button[type="submit"]');
    const btnHtml = btn.innerHTML;
    form.dataset.sending = '1'; btn.disabled = true; btn.textContent = T.sendingBtn;
    status.className = 'form-status show'; status.textContent = T.sending;

    // FormSubmit(무료 폼 메일 서비스)으로 COMPANY.email 주소에 바로 전달
    const payload = { _subject: T.subject(d.get('company'), d.get('name')), _template: 'table', _replyto: d.get('email') };
    fields.forEach(([k, v]) => { payload[k] = v; });
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${COMPANY.email}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (/activat/i.test(json.message || '')) {
        // FormSubmit 최초 1회: 받는 메일(COMPANY.email)로 활성화 메일이 발송됨
        status.className = 'form-status show';
        status.innerHTML = LANG === 'en'
          ? `<b>One-time activation needed.</b> An activation email was sent to ${COMPANY.email}. Click “Activate Form” in that email, then submit again.`
          : `<b>처음 한 번만 활성화가 필요합니다.</b> ${COMPANY.email} 메일함(스팸함 포함)에 온 FormSubmit 메일에서 <b>Activate Form</b>을 누른 뒤 다시 보내 주세요.`;
        return;
      }
      if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || res.status);
      status.className = 'form-status show';
      status.innerHTML = T.done;
      form.reset();
    } catch (err) {
      console.warn('[RFQ] submit failed:', err && err.message);
      const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(T.subject(d.get('company'), d.get('name')))}&body=${encodeURIComponent(body)}`;
      status.className = 'form-status error show';
      status.innerHTML = T.fail(`<a href="${mailto}" style="text-decoration:underline">${COMPANY.email}</a>`);
    } finally {
      delete form.dataset.sending; btn.disabled = false; btn.innerHTML = btnHtml;
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => { renderChrome(); reveal(); countUp(); rfqForm(); liveReload(); });

/* 내 컴퓨터(localhost)에서 볼 때만: 파일을 고치면 화면이 자동으로 새로고침됩니다. 실제 서버에서는 작동하지 않습니다. */
function liveReload() {
  if (!['localhost', '127.0.0.1'].includes(location.hostname)) return;
  const files = [location.pathname, `${BASE}assets/style.css`, `${BASE}assets/main.js`];
  let last = null;
  const check = async () => {
    try {
      const stamps = await Promise.all(files.map(f =>
        fetch(f, { method: 'HEAD', cache: 'no-store' }).then(r => r.headers.get('Last-Modified'))));
      const now = stamps.join('|');
      if (last && now !== last) {
        sessionStorage.setItem('lr-scroll', String(scrollY));
        location.reload();
        return;
      }
      last = now;
    } catch (e) { /* 서버가 꺼져 있으면 무시 */ }
    setTimeout(check, 1500);
  };
  try {
    const y = sessionStorage.getItem('lr-scroll');
    if (y !== null) {
      sessionStorage.removeItem('lr-scroll');
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
      requestAnimationFrame(() => scrollTo({ top: +y, behavior: 'instant' }));
    }
  } catch (e) {}
  check();
}
