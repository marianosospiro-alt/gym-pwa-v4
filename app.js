const workoutPlan = {
    1:,
    2:,
    3:,
    4:
};

let currentDay = 1;
let chart = null;

function loadDay(day) {
    currentDay = day;
    document.querySelectorAll('.day-btn').forEach((b, i) => b.classList.toggle('active', i + 1 === day));
    const container = document.getElementById('workoutArea');
    container.innerHTML = workoutPlan[day].map((ex, idx) => `
        <div class="ex-card">
            <div class="ex-header">
                <strong>${ex.n}</strong>
            </div>
            <div class="ex-info">${ex.i}</div>
            <div class="inputs">
                <div class="input-group">Peso (kg) <input type="number" id="w-${idx}" step="0.5"></div>
                <div class="input-group">Ripetizioni <input type="number" id="r-${idx}"></div>
            </div>
        </div>
    `).join('');
    updateChart();
}

function saveData() {
    const logs = JSON.parse(localStorage.getItem('gymLogs') |

| '');
    const session = {
        date: new Date().toLocaleDateString(),
        day: currentDay,
        data: workoutPlan.map((ex, idx) => ({
            name: ex.n,
            w: document.getElementById(`w-${idx}`).value,
            r: document.getElementById(`r-${idx}`).value
        }))
    };
    logs.push(session);
    localStorage.setItem('gymLogs', JSON.stringify(logs));
    alert("Allenamento salvato!");
    updateChart();
}

function updateChart() {
    const logs = JSON.parse(localStorage.getItem('gymLogs') |

| '');
    if (logs.length < 2) return;
    document.getElementById('chartBox').style.display = 'block';
    const mainEx = workoutPlan.n;
    const filtered = logs.filter(l => l.day === currentDay);
    const labels = filtered.map(l => l.date);
    const weights = filtered.map(l => parseFloat(l.data.w |

| 0));

    const ctx = document.getElementById('progressChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets: [{ label: mainEx + ' (kg)', data: weights, borderColor: '#2ecc71', tension: 0.3 }] }
    });
}
loadDay(1);
