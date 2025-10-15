import generateYearCalendar, {
  clearAllCaches,
  type IRemedyCalendarMonth,
  type LocaleCode,
  type CalendarStyle,
} from '../src/index';

let cacheHit = false;

function renderCalendar(calendar: IRemedyCalendarMonth[]) {
  const calendarContainer = document.getElementById('calendar');
  if (!calendarContainer) return;

  calendarContainer.innerHTML = '';

  calendar.forEach((month) => {
    const monthCard = document.createElement('div');
    monthCard.className = 'month-card';

    // Month header
    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.textContent = month.monthYear;
    monthCard.appendChild(monthHeader);

    // Week day headers
    const weekDaysHeader = document.createElement('div');
    weekDaysHeader.className = 'week-days';

    const firstWeek = month.month[0];
    firstWeek.weekDay.forEach((day) => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'week-day-header';
      dayHeader.textContent = day.dayShort;
      weekDaysHeader.appendChild(dayHeader);
    });
    monthCard.appendChild(weekDaysHeader);

    // Weeks and days
    month.month.forEach((week) => {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'week';

      week.weekDay.forEach((day) => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';

        if (day.isCurrentMonth) {
          dayDiv.classList.add('current-month');
        } else {
          dayDiv.classList.add('other-month');
        }

        if (day.isToday) {
          dayDiv.classList.add('today');
        }

        if (day.isWeekend && day.isCurrentMonth) {
          dayDiv.classList.add('weekend');
        }

        dayDiv.textContent = day.date.toString();
        dayDiv.title = `${day.dayName}, ${day.isoString}\nWeek ${day.weekNumber}`;

        weekDiv.appendChild(dayDiv);
      });

      monthCard.appendChild(weekDiv);
    });

    calendarContainer.appendChild(monthCard);
  });
}

function updateStats(genTime: number, monthCount: number) {
  const genTimeEl = document.getElementById('genTime');
  const monthCountEl = document.getElementById('monthCount');
  const cacheStatusEl = document.getElementById('cacheStatus');

  if (genTimeEl) genTimeEl.textContent = genTime.toFixed(2);
  if (monthCountEl) monthCountEl.textContent = monthCount.toString();
  if (cacheStatusEl) {
    cacheStatusEl.textContent = cacheHit ? '🔥 Hot' : '❄️ Cold';
  }
}

function generateCalendar() {
  const yearInput = document.getElementById('year') as HTMLInputElement;
  const localeSelect = document.getElementById('locale') as HTMLSelectElement;
  const styleSelect = document.getElementById('style') as HTMLSelectElement;

  const year = parseInt(yearInput.value);
  const locale = localeSelect.value as LocaleCode;
  const style = styleSelect.value as CalendarStyle;

  try {
    const start = Date.now();
    const calendar = generateYearCalendar(year, locale, style, false);
    const genTime = Date.now() - start;

    // Check if it was a cache hit (very fast)
    cacheHit = genTime < 1;

    renderCalendar(calendar);
    updateStats(genTime, calendar.length);
  } catch (error) {
    alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Event listeners
document.getElementById('generateBtn')?.addEventListener('click', () => {
  generateCalendar();
});

// Generate on Enter key
document.getElementById('year')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') generateCalendar();
});

// Initial generation
window.addEventListener('DOMContentLoaded', () => {
  generateCalendar();
});

// Clear cache button (optional - for demo purposes)
const clearCacheBtn = document.createElement('button');
clearCacheBtn.textContent = 'Clear Cache';
clearCacheBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
clearCacheBtn.addEventListener('click', () => {
  clearAllCaches();
  cacheHit = false;
  alert('Cache cleared! Next generation will be slower.');
});

const controls = document.querySelector('.controls');
controls?.appendChild(clearCacheBtn);
