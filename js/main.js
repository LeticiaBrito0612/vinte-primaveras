// Contagem regressiva até a festa (horário de São Paulo, UTC-3)
(function () {
  const alvo = new Date('2026-12-12T16:00:00-03:00');
  const el = document.getElementById('contagem');
  if (!el) return;

  function atualizar() {
    const ms = alvo - new Date();
    if (ms <= 0) {
      // Mostra "Hoje é o dia!" só durante o próprio dia; depois some
      el.textContent = ms > -12 * 36e5 ? 'Hoje é o dia! ♡' : '';
      return;
    }
    const dias = Math.floor(ms / 864e5);
    const horas = Math.floor((ms % 864e5) / 36e5);
    const min = Math.floor((ms % 36e5) / 6e4);
    el.textContent = `Faltam ${dias} ${dias === 1 ? 'dia' : 'dias'}, ${horas}h e ${min}min`;
  }

  atualizar();
  setInterval(atualizar, 30000);
})();
