/* ================================================
   SKILLS Gym · Admin Portal — Dashboard JS
   Mock data + UI interactions
   ================================================ */

// ── Date ────────────────────────────────────────
const dateEl = document.getElementById('current-date');
if (dateEl) {
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = new Date().toLocaleDateString('en-PH', opts);
}

// ── Sidebar Toggle (mobile) ──────────────────────
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('overlay');
  const isOpen   = !sidebar.classList.contains('-translate-x-full');
  sidebar.classList.toggle('-translate-x-full', isOpen);
  overlay.classList.toggle('hidden', isOpen);
}

// ── Mock Data ────────────────────────────────────
const mockBookings = [
  { id: 'BK-001', customer: 'Maria Santos',   equipment: 'Treadmill Pro X',    date: 'Jun 3, 2026',  status: 'confirmed'  },
  { id: 'BK-002', customer: 'Juan Dela Cruz', equipment: 'Rowing Machine 2K',  date: 'Jun 3, 2026',  status: 'pending'    },
  { id: 'BK-003', customer: 'Ana Reyes',      equipment: 'Squat Rack A',       date: 'Jun 4, 2026',  status: 'confirmed'  },
  { id: 'BK-004', customer: 'Carlo Bautista', equipment: 'Bench Press Set',    date: 'Jun 4, 2026',  status: 'cancelled'  },
  { id: 'BK-005', customer: 'Liz Torres',     equipment: 'Spin Bike Elite',    date: 'Jun 5, 2026',  status: 'pending'    },
  { id: 'BK-006', customer: 'Mark Villanueva',equipment: 'Pull-up Station',    date: 'Jun 5, 2026',  status: 'confirmed'  },
];

const mockPending = [
  { customer: 'Juan Dela Cruz', equipment: 'Rowing Machine 2K', time: '2h ago'  },
  { customer: 'Liz Torres',     equipment: 'Spin Bike Elite',   time: '3h ago'  },
  { customer: 'Paolo Ocampo',   equipment: 'Leg Press HP',      time: '5h ago'  },
  { customer: 'Rina Castro',    equipment: 'Cable Machine Pro', time: '7h ago'  },
  { customer: 'Dante Lim',      equipment: 'Dumbbell Set 40kg', time: '9h ago'  },
];

const mockEquipment = [
  { name: 'Cardio Zone',  used: 9,  total: 10, color: '#00d2ff'  },
  { name: 'Free Weights', used: 14, total: 18, color: '#007bff'  },
  { name: 'Machines',     used: 11, total: 14, color: '#ff8c00'  },
  { name: 'Functional',   used: 4,  total: 6,  color: '#4ade80'  },
];

const mockActivity = [
  { icon: '✅', label: 'Booking confirmed', sub: 'Ana Reyes → Squat Rack A',    time: '10 min ago', color: '#4ade80' },
  { icon: '📦', label: 'Equipment returned', sub: 'Treadmill Pro X by Mark V.',  time: '34 min ago', color: '#00d2ff' },
  { icon: '🆕', label: 'New booking request', sub: 'Dante Lim → Dumbbell 40kg', time: '1h ago',    color: '#ff8c00' },
  { icon: '⚠️', label: 'Maintenance flagged', sub: 'Leg Press HP — scheduled',   time: '2h ago',    color: '#f87171' },
  { icon: '✅', label: 'Payment received',   sub: 'Maria Santos — ₱350',         time: '3h ago',    color: '#4ade80' },
];

// ── Render Bookings Table ────────────────────────
const tbody = document.getElementById('bookings-table');
if (tbody) {
  tbody.innerHTML = mockBookings.map((b, i) => `
    <tr class="hover:bg-white/5 transition-colors duration-150 fade-up"
        style="animation-delay:${i * 0.05}s">
      <td class="px-5 py-3.5">
        <div class="font-medium text-white text-sm">${b.customer}</div>
        <div class="text-[11px] text-brand-muted">${b.id}</div>
      </td>
      <td class="px-5 py-3.5 hidden sm:table-cell text-sm text-brand-text">${b.equipment}</td>
      <td class="px-5 py-3.5 hidden md:table-cell text-sm text-brand-muted">${b.date}</td>
      <td class="px-5 py-3.5">
        <span class="pill-${b.status} text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
          ${b.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// ── Render Pending Approvals ──────────────────────
const pendingList = document.getElementById('pending-list');
if (pendingList) {
  pendingList.innerHTML = mockPending.map((p, i) => `
    <li class="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors fade-up"
        style="animation-delay:${i * 0.07}s">
      <div class="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
        <svg class="w-3.5 h-3.5 text-brand-orange1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white truncate">${p.customer}</p>
        <p class="text-[11px] text-brand-muted truncate">${p.equipment}</p>
      </div>
      <div class="flex flex-col items-end gap-1 shrink-0">
        <p class="text-[10px] text-brand-muted">${p.time}</p>
        <div class="flex gap-1">
          <button onclick="approveBooking(this)"
            class="text-[10px] font-semibold text-green-400 bg-green-500/10 hover:bg-green-500/20
                   border border-green-500/20 px-2 py-0.5 rounded transition-colors">
            ✓
          </button>
          <button onclick="rejectBooking(this)"
            class="text-[10px] font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20
                   border border-red-500/20 px-2 py-0.5 rounded transition-colors">
            ✕
          </button>
        </div>
      </div>
    </li>
  `).join('');
}

// ── Render Equipment Status ──────────────────────
const equipDiv = document.getElementById('equip-status');
if (equipDiv) {
  equipDiv.innerHTML = mockEquipment.map(e => {
    const pct = Math.round((e.used / e.total) * 100);
    return `
      <div>
        <div class="flex justify-between text-xs mb-1.5">
          <span class="text-brand-text font-medium">${e.name}</span>
          <span class="text-brand-muted">${e.used}/${e.total}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:0%; background:${e.color};"
               data-width="${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Animate bars on load
  setTimeout(() => {
    document.querySelectorAll('.progress-fill').forEach(bar => {
      bar.style.width = bar.dataset.width;
    });
  }, 200);
}

// ── Render Activity Feed ─────────────────────────
const activityList = document.getElementById('activity-feed');
if (activityList) {
  activityList.innerHTML = mockActivity.map((a, i) => `
    <li class="flex items-center gap-4 py-3.5 fade-up" style="animation-delay:${i * 0.06}s">
      <div class="activity-icon shrink-0" style="background:${a.color}22; border:1px solid ${a.color}44;">
        <span class="text-sm leading-none">${a.icon}</span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-white">${a.label}</p>
        <p class="text-xs text-brand-muted truncate">${a.sub}</p>
      </div>
      <p class="text-xs text-brand-muted shrink-0">${a.time}</p>
    </li>
  `).join('');
}

// ── Booking Actions ──────────────────────────────
function approveBooking(btn) {
  const li = btn.closest('li');
  const name = li.querySelector('p.text-white').textContent;
  li.style.transition = 'opacity 0.3s, transform 0.3s';
  li.style.opacity = '0';
  li.style.transform = 'translateX(-10px)';
  setTimeout(() => {
    li.remove();
    updatePendingCount(-1);
    showToast(`✅ Booking approved for ${name}`);
  }, 300);
}

function rejectBooking(btn) {
  const li = btn.closest('li');
  const name = li.querySelector('p.text-white').textContent;
  li.style.transition = 'opacity 0.3s, transform 0.3s';
  li.style.opacity = '0';
  li.style.transform = 'translateX(-10px)';
  setTimeout(() => {
    li.remove();
    updatePendingCount(-1);
    showToast(`❌ Booking rejected for ${name}`, true);
  }, 300);
}

function updatePendingCount(delta) {
  const badge  = document.querySelector('.badge-orange');
  const bubble = document.querySelector('span.text-xs.font-bold.text-brand-orange1');
  if (badge)  badge.textContent  = Math.max(0, parseInt(badge.textContent)  + delta);
  if (bubble) bubble.textContent = Math.max(0, parseInt(bubble.textContent) + delta);
}

// ── Toast Notification ───────────────────────────
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white
    shadow-lg border transition-all duration-300 opacity-0 translate-y-2
    ${isError ? 'bg-red-900/90 border-red-500/30' : 'bg-green-900/90 border-green-500/30'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  });
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
