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
            <span class="ex-title">${ex.n}</span>
            <div class="ex-info">${ex.i}</div>
            <div class="inputs">
                <div>Peso (kg) <input type="number" id="w-${idx}" step="0.5" placeholder="0"></div>
                <div>Reps <input type="number" id="r-${idx}" placeholder="0"></div>
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
            w: document.getElementById(`w-${idx}`).value |

| 0,
            r: document.getElementById(`r-${idx}`).value |

| 0
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
    if (logs.length < 1) return;

    document.getElementById('chartBox').style.display = 'block';
    const mainEx = workoutPlan.n; // Prende il primo esercizio del giorno come riferimento
    const filtered = logs.filter(l => l.day === currentDay);
    const labels = filtered.map(l => l.date);
    const weights = filtered.map(l => {
        const found = l.data.find(d => d.name === mainEx);
        return found? parseFloat(found.w) : 0;
    });

    const ctx = document.getElementById('progressChart').getContext('2d');
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: mainEx + ' (kg)',
                data: weights,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Inizializza al caricamento
window.onload = () => loadDay(1);
