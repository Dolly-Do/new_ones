// SPA navigation and simple calendar/time slot logic

// SPA navigation
document.querySelectorAll('nav a, .dashboard-grid a, .admin-cards .card').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash) {
      e.preventDefault();
      document.querySelectorAll('main section').forEach(sec => sec.classList.remove('animate-in'));
      const target = document.querySelector(this.hash);
      if (target) target.classList.add('animate-in');
      window.location.hash = this.hash;
    }
  });
});

// Calendar rendering
function renderCalendar() {
  const grid = document.querySelector('.calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const daysInMonth = 30;
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.addEventListener('click', () => {
      grid.querySelectorAll('div').forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
      renderSlots(i);
    });
    grid.appendChild(day);
  }
}
function renderSlots(day) {
  const slots = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM'];
  const list = document.querySelector('.slots-list');
  if (!list) return;
  list.innerHTML = '';
  slots.forEach(time => {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.textContent = time;
    slot.addEventListener('click', () => {
      list.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      alert(`Booked for ${day} at ${time}`);
    });
    list.appendChild(slot);
  });
}
window.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  // Show dashboard by default
  if (!window.location.hash) {
    document.querySelector('#dashboard').classList.add('animate-in');
  }
});
// Add to main.js

// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
// On load, set theme from localStorage
window.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  if (!window.location.hash) {
    document.querySelector('#dashboard').classList.add('animate-in');
  }
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeBtn.textContent = '☀️';
  }
});