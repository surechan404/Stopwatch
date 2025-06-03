document.getElementById('addStopwatch').addEventListener('click', createStopwatch);

function createStopwatch() {
  const container = document.getElementById('stopwatchContainer');

  const stopwatch = document.createElement('div');
  stopwatch.className = 'stopwatch';

  const nameInput = document.createElement('input');
  nameInput.className = 'nameInput';
  nameInput.placeholder = 'Stopwatch name';

  const timeDisplay = document.createElement('div');
  timeDisplay.className = 'time';
  timeDisplay.textContent = '00:00:00.000';

  const controls = document.createElement('div');
  controls.className = 'controls';

  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start';
  startBtn.className = 'start';

  const pauseBtn = document.createElement('button');
  pauseBtn.textContent = 'Pause';

  const stopBtn = document.createElement('button');
  stopBtn.textContent = 'Stop';
  stopBtn.className = 'stop';

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.className = 'reset';

  controls.append(startBtn, pauseBtn, stopBtn, resetBtn);
  stopwatch.append(nameInput, timeDisplay, controls);
  container.appendChild(stopwatch);

  let startTime = 0;
  let elapsed = 0;
  let intervalId = null;

  function updateDisplay() {
    const total = elapsed + (Date.now() - startTime);
    const milliseconds = total % 1000;
    const seconds = Math.floor(total / 1000) % 60;
    const minutes = Math.floor(total / 60000) % 60;
    const hours = Math.floor(total / 3600000);
    timeDisplay.textContent =
      `${String(hours).padStart(2, '0')}:` +
      `${String(minutes).padStart(2, '0')}:` +
      `${String(seconds).padStart(2, '0')}.` +
      `${String(milliseconds).padStart(3, '0')}`;
  }

  startBtn.onclick = () => {
    if (intervalId) return;
    startTime = Date.now();
    intervalId = setInterval(updateDisplay, 50);
  };

  pauseBtn.onclick = () => {
    if (!intervalId) return;
    elapsed += Date.now() - startTime;
    clearInterval(intervalId);
    intervalId = null;
  };

  stopBtn.onclick = () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsed = 0;
    startTime = 0;
    timeDisplay.textContent = '00:00:00.000';
  };

  resetBtn.onclick = () => {
    elapsed = 0;
    startTime = Date.now();
    updateDisplay();
  };
}
