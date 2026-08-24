// app.js - Lógica de Interfaz y Control de Rutas
document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderMiembros();
  renderFinanzas();
});

// Navegación Tab SPA
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(el => {
    el.classList.remove('text-brand-500', 'font-bold');
    el.classList.add('text-slate-400');
  });

  const selectedSec = document.getElementById(`sec-${tabId}`);
  if(selectedSec) selectedSec.classList.remove('hidden');

  const pageTitle = document.getElementById('page-title');
  pageTitle.innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
}

// Render Dashboard
function renderDashboard() {
  const db = getDB();
  document.getElementById('dash-total-miembros').innerText = db.miembros.filter(m => m.tipo === 'Miembro').length;
  document.getElementById('dash-total-visitantes').innerText = db.miembros.filter(m => m.tipo === 'Visitante').length;
  
  const totalIngresos = db.finanzas
    .filter(f => f.tipo === 'ingreso')
    .reduce((acc, curr) => acc + Number(curr.monto), 0);
  
  document.getElementById('dash-total-ingresos').innerText = `${db.config.moneda} ${totalIngresos.toFixed(2)}`;

  const lista = document.getElementById('lista-actividad');
  lista.innerHTML = db.actividades.map(act => `<li class="py-2 flex items-center gap-2"><i class="fa-solid fa-circle-info text-xs text-brand-500"></i> ${act}</li>`).join('');
}

// Render Miembros
function renderMiembros() {
  const db = getDB();
  const tabla = document.getElementById('tabla-miembros');
  
  tabla.innerHTML = db.miembros.map(m => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-4 font-medium">${m.nombre}</td>
      <td class="p-4 text-slate-400">${m.telefono}</td>
      <td class="p-4"><span class="px-2 py-1 rounded text-xs ${m.tipo === 'Miembro' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}">${m.tipo}</span></td>
      <td class="p-4 text-slate-300">${m.estado}</td>
      <td class="p-4 text-right">
        <button onclick="eliminarMiembro(${m.id})" class="text-rose-400 hover:text-rose-300"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Render Finanzas
function renderFinanzas() {
  const db = getDB();
  const tabla = document.getElementById('tabla-finanzas');
  
  tabla.innerHTML = db.finanzas.map(f => `
    <tr class="hover:bg-slate-800/40 transition">
      <td class="p-4 text-slate-400">${f.fecha}</td>
      <td class="p-4"><span class="uppercase font-bold text-xs ${f.tipo === 'ingreso' ? 'text-brand-500' : 'text-rose-500'}">${f.tipo}</span></td>
      <td class="p-4 font-medium">${f.categoria}</td>
      <td class="p-4 text-slate-400">${f.descripcion}</td>
      <td class="p-4 text-right font-bold ${f.tipo === 'ingreso' ? 'text-brand-500' : 'text-rose-400'}">
        ${f.tipo === 'ingreso' ? '+' : '-'}${db.config.moneda} ${Number(f.monto).toFixed(2)}
      </td>
    </tr>
  `).join('');
}

// Exportar Backup JSON
function exportarBackup() {
  const db = getDB();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `iglesia_erp_backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
