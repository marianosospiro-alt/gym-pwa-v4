<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.5">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">const workoutPlan = {</p>
<p class="p1"><span class="Apple-converted-space">    </span>1:,</p>
<p class="p1"><span class="Apple-converted-space">    </span>2:,</p>
<p class="p1"><span class="Apple-converted-space">    </span>3:,</p>
<p class="p1"><span class="Apple-converted-space">    </span>4:</p>
<p class="p1">};</p>
<p class="p2"><br></p>
<p class="p1">let currentDay = 1;</p>
<p class="p1">let chartInstance = null;</p>
<p class="p2"><br></p>
<p class="p1">function showDay(day) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>currentDay = day;</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.querySelectorAll('.day-btn').forEach((b, i) =&gt; b.classList.toggle('active', i + 1 === day));</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>const container = document.getElementById('workoutArea');</p>
<p class="p1"><span class="Apple-converted-space">    </span>container.innerHTML = workoutPlan[day].map((ex, idx) =&gt; `</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="exercise-card"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="exercise-header"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;img src="${ex.img}" class="thumb" onerror="this.src='https://via.placeholder.com/60?text=Gym'"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;strong&gt;${ex.name}&lt;/strong&gt;&lt;br&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;small&gt;${ex.info}&lt;/small&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="sets-grid"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div&gt;Peso (kg): &lt;input type="number" id="weight-${idx}" placeholder="es. 35"&gt;&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;div&gt;Rep: &lt;input type="number" id="reps-${idx}" placeholder="es. 8"&gt;&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>`).join('');</p>
<p class="p1"><span class="Apple-converted-space">    </span>updateChart();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function saveWorkout() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const data = JSON.parse(localStorage.getItem('gymLogs') |</p>
<p class="p2"><br></p>
<p class="p1">| '');</p>
<p class="p1"><span class="Apple-converted-space">    </span>const session = {</p>
<p class="p1"><span class="Apple-converted-space">        </span>date: new Date().toLocaleDateString(),</p>
<p class="p1"><span class="Apple-converted-space">        </span>day: currentDay,</p>
<p class="p1"><span class="Apple-converted-space">        </span>exercises: workoutPlan.map((ex, idx) =&gt; ({</p>
<p class="p1"><span class="Apple-converted-space">            </span>name: ex.name,</p>
<p class="p1"><span class="Apple-converted-space">            </span>weight: document.getElementById(`weight-${idx}`).value,</p>
<p class="p1"><span class="Apple-converted-space">            </span>reps: document.getElementById(`reps-${idx}`).value</p>
<p class="p1"><span class="Apple-converted-space">        </span>}))</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>data.push(session);</p>
<p class="p1"><span class="Apple-converted-space">    </span>localStorage.setItem('gymLogs', JSON.stringify(data));</p>
<p class="p1"><span class="Apple-converted-space">    </span>alert("Dati salvati localmente!");</p>
<p class="p1"><span class="Apple-converted-space">    </span>updateChart();</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">function updateChart() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const logs = JSON.parse(localStorage.getItem('gymLogs') |</p>
<p class="p2"><br></p>
<p class="p1">| '');</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (logs.length === 0) return;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const container = document.getElementById('chart-container');</p>
<p class="p1"><span class="Apple-converted-space">    </span>container.style.display = 'block';</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>// Prendiamo l'esercizio principale del giorno per mostrare il progresso</p>
<p class="p1"><span class="Apple-converted-space">    </span>const mainExName = workoutPlan.name;</p>
<p class="p1"><span class="Apple-converted-space">    </span>const labels = logs.filter(l =&gt; l.day === currentDay).map(l =&gt; l.date);</p>
<p class="p1"><span class="Apple-converted-space">    </span>const weights = logs.filter(l =&gt; l.day === currentDay).map(l =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">        </span>const ex = l.exercises.find(e =&gt; e.name === mainExName);</p>
<p class="p1"><span class="Apple-converted-space">        </span>return ex? parseFloat(ex.weight) : 0;</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>const ctx = document.getElementById('progressChart').getContext('2d');</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (chartInstance) chartInstance.destroy();</p>
<p class="p2"><span class="Apple-converted-space">    </span></p>
<p class="p1"><span class="Apple-converted-space">    </span>chartInstance = new Chart(ctx, {</p>
<p class="p1"><span class="Apple-converted-space">        </span>type: 'line',</p>
<p class="p1"><span class="Apple-converted-space">        </span>data: {</p>
<p class="p1"><span class="Apple-converted-space">            </span>labels: labels,</p>
<p class="p1"><span class="Apple-converted-space">            </span>datasets: [{</p>
<p class="p1"><span class="Apple-converted-space">                </span>label: `Peso su ${mainExName}`,</p>
<p class="p1"><span class="Apple-converted-space">                </span>data: weights,</p>
<p class="p1"><span class="Apple-converted-space">                </span>borderColor: '#2ecc71',</p>
<p class="p1"><span class="Apple-converted-space">                </span>backgroundColor: 'rgba(46, 204, 113, 0.2)',</p>
<p class="p1"><span class="Apple-converted-space">                </span>fill: true,</p>
<p class="p1"><span class="Apple-converted-space">                </span>tension: 0.3</p>
<p class="p1"><span class="Apple-converted-space">            </span>}]</p>
<p class="p1"><span class="Apple-converted-space">        </span>},</p>
<p class="p1"><span class="Apple-converted-space">        </span>options: { responsive: true, scales: { y: { beginAtZero: false } } }</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">showDay(1);</p>
</body>
</html>
