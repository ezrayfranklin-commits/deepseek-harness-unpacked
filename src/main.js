const details = {
  profile: ['ROOT COMPOSITION', 'Web Profile', '按声明顺序装入组合包，再叠加 profile、home 与命令行 patch，最终生成可运行的 Cordis 插件树。', 'dsh --profile web --dump-config'],
  base: ['FOUNDATION BUNDLE', 'dsh-base', '每个 profile 的第一层：模型适配器、工具、持久化、沙箱、审批、设置、凭据与遥测。', '@deepseek-ai/dsh-base'],
  web: ['APPLICATION BUNDLE', 'dsh-web-app', '在基础能力之上增加 Web Server、JSON-RPC 边界、浏览器客户端与会话 UI。', '@deepseek-ai/dsh-web-app'],
  patch: ['USER LAYER', 'cordis.patch.yml', '通过稳定 id 替换条目的完整 config，或插入新的插件条目；无需修改上游源码。', 'profile/cordis.patch.yml'],
  overlay: ['EPHEMERAL LAYER', 'CLI Overlay', '最后应用的命令行覆盖层，适合实验、调试与临时切换 Provider。', 'dsh web --patch ./local.yml']
};

document.querySelectorAll('.node').forEach(node => node.addEventListener('click', () => {
  document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
  node.classList.add('active');
  const [tag, title, body, code] = details[node.dataset.detail];
  document.querySelector('#detailTag').textContent = tag;
  document.querySelector('#detailTitle').textContent = title;
  document.querySelector('#detailText').textContent = body;
  document.querySelector('#detailCode').textContent = code;
}));

document.querySelectorAll('.pipe').forEach(pipe => pipe.addEventListener('click', () => {
  document.querySelectorAll('.pipe').forEach(p => p.classList.remove('active'));
  pipe.classList.add('active');
  document.querySelector('#pipeText').textContent = pipe.dataset.pipe;
}));

const copy = async (button) => {
  await navigator.clipboard.writeText('npx @deepseek-ai/dsh web');
  const old = button.innerHTML; button.textContent = '已复制 ✓';
  setTimeout(() => button.innerHTML = old, 1600);
};
['copyCmd', 'copyCmd2'].forEach(id => document.querySelector(`#${id}`).addEventListener('click', e => copy(e.currentTarget)));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('visible');
  if (entry.target.classList.contains('metrics')) entry.target.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count, start = performance.now(), duration = 1300;
    const tick = now => { const p = Math.min((now - start) / duration, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  });
  observer.unobserve(entry.target);
}), { threshold: .15 });
document.querySelectorAll('.chapter, .reveal, .metrics').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll', () => {
  const current = sections.filter(s => s.offsetTop < scrollY + innerHeight * .45).pop();
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', current && a.hash === `#${current.id}`));
}, { passive: true });
