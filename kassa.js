/* Kassapaneeli: lippuvalinta, hinta (valinnainen alv), Holvi-linkki ja laskupyyntö (Netlify Forms). Tiedot: window.SEMINAARI */
(function(){
  const S = window.SEMINAARI;
  const dlg = document.getElementById('kassa');
  const form = document.getElementById('k-form');
  const opts = document.getElementById('k-opts');
  const eur = n => n.toLocaleString('fi-FI', {minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2}) + ' €';
  const brutto = n => Math.round(n * (1 + S.alv) * 100) / 100;

  S.liput.forEach(l => {
    const lab = document.createElement('label');
    lab.className = 'opt';
    lab.innerHTML = `<input type="radio" name="lippuvalinta" value="${l.id}">
      <div><div class="nm">${l.nimi}${l.tag ? `<span class="tag">${l.tag}</span>` : ''}</div><div class="al">${l.ali}</div></div>
      <div class="pr"><b>${eur(l.netto)}</b>${S.alv ? `<span>+ alv ${String(S.alv*100).replace('.',',')} %</span>` : ''}</div>`;
    opts.appendChild(lab);
  });

  function update(){
    const id = form.querySelector('[name=lippuvalinta]:checked').value;
    const l = S.liput.find(x => x.id === id);
    const lasku = form.querySelector('[name=maksutapa]:checked').value === 'lasku';
    const b = brutto(l.netto);
    dlg.classList.toggle('lasku', lasku);
    document.getElementById('k-s2').textContent = lasku ? '2 Laskutustiedot' : '2 Maksu Holvissa';
    document.getElementById('k-sum').textContent = eur(b);
    document.getElementById('k-vat').textContent = S.alv ? `${eur(l.netto)} + alv ${String(S.alv*100).replace('.',',')} % (${eur(Math.round((b - l.netto)*100)/100)})` : 'Lopullinen hinta';
    document.getElementById('k-save').textContent = l.saasto;
    const go = document.getElementById('k-go');
    go.textContent = `Maksa ${eur(b)} Holvissa`;
    go.href = l.holvi;
    document.getElementById('k-warn').style.display = (!lasku && l.holvi.startsWith('HOLVI_')) ? 'block' : 'none';
    document.getElementById('k-lippu').value = l.nimi;
    document.getElementById('k-summa').value = S.alv ? `${eur(l.netto)} + alv = ${eur(b)}` : eur(b);
    form.querySelectorAll('.inv input').forEach(i => i.required = lasku);
  }

  function open(id){
    dlg.classList.remove('ok');
    document.getElementById('k-err').style.display = 'none';
    const r = form.querySelector(`[name=lippuvalinta][value="${id}"]`) || form.querySelector('[name=lippuvalinta]');
    r.checked = true;
    update();
    dlg.showModal();
    r.focus();
  }

  form.addEventListener('change', update);
  document.getElementById('k-go').addEventListener('click', e => {
    if (e.currentTarget.getAttribute('href').startsWith('HOLVI_')) e.preventDefault();
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const res = await fetch('/', { method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(new FormData(form)).toString() });
      if (!res.ok) throw new Error(res.status);
      dlg.classList.add('ok');
    } catch(err) {
      document.getElementById('k-err').style.display = 'block';
    }
  });
  dlg.addEventListener('click', e => {
    if (e.target.closest('[data-sulje]') || e.target === dlg) dlg.close();
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-osta]');
    if (b) open(b.dataset.osta);
  });
})();
