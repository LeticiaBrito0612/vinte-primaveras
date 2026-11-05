// Carrossel de presentes: bolinhas, setas e teclado sincronizados com o card visível
document.addEventListener('DOMContentLoaded', () => {
  const carrossel = document.getElementById('carrossel');
  const dots = document.querySelectorAll('#dots .dot');
  const ant = document.getElementById('ant');
  const prox = document.getElementById('prox');
  if (!carrossel || !dots.length) return;

  const cards = carrossel.children;
  // distância entre o início de um card e o do seguinte (largura + espaço)
  const passo = () => cards[1].offsetLeft - cards[0].offsetLeft;
  const indiceAtual = () => Math.round(carrossel.scrollLeft / passo());
  const irPara = (i) => {
    const alvo = Math.max(0, Math.min(cards.length - 1, i));
    carrossel.scrollTo({ left: passo() * alvo, behavior: 'smooth' });
  };

  function atualizar() {
    const i = indiceAtual();
    dots.forEach((d, n) => d.classList.toggle('is-active', n === i));
    ant.disabled = i === 0;
    prox.disabled = i === cards.length - 1;
  }

  let esperando = false;
  carrossel.addEventListener('scroll', () => {
    if (esperando) return;
    esperando = true;
    requestAnimationFrame(() => { atualizar(); esperando = false; });
  });

  dots.forEach((d, i) => d.addEventListener('click', () => irPara(i)));
  ant.addEventListener('click', () => irPara(indiceAtual() - 1));
  prox.addEventListener('click', () => irPara(indiceAtual() + 1));
  carrossel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); irPara(indiceAtual() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irPara(indiceAtual() - 1); }
  });
  window.addEventListener('resize', atualizar);
  atualizar();
});
