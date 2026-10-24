import { config, splitDate } from "../config";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function cellsFor(iso) {
  const { year, monthIndex } = splitDate(iso);
  const first = new Date(year, monthIndex, 1);
  const lead = (first.getDay() + 6) % 7;
  const count = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(day);
  return cells;
}

export default function CalendarBlock() {
  const focus = splitDate(config.reception.date);
  const cells = cellsFor(config.reception.date);
  const monthLabel = new Date(focus.year, focus.monthIndex, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar">
      <div className="calendar-frame" aria-hidden="true" />
      <p className="calendar-month">{monthLabel}</p>
      <div className="calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-dow">
            {day}
          </div>
        ))}
        {cells.map((day, index) =>
          day ? (
            <div key={`${day}-${index}`} className={`calendar-day ${day === focus.day ? "is-heart" : ""}`}>
              {day === focus.day ? (
                <svg viewBox="0 0 24 22" className="heart-bg" aria-hidden="true">
                  <path
                    fill="#64101c"
                    d="M12 20.2s-6.8-4.2-9.2-8C1.1 9.2 1.7 5.8 4.3 4.5 6.4 3.4 8.6 4 12 7.1c3.4-3.1 5.6-3.7 7.7-2.6 2.6 1.3 3.2 4.7 1.5 7.7-2.4 3.8-9.2 8-9.2 8z"
                  />
                </svg>
              ) : null}
              <span>{day}</span>
            </div>
          ) : (
            <div key={`e-${index}`} />
          )
        )}
      </div>
    </div>
  );
}
