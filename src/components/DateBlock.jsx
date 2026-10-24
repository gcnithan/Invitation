import { splitDate } from "../config";

export default function DateBlock({ title, iso, time, tone = "ceremony" }) {
  const parts = splitDate(iso);
  const timeLabel = tone === "reception" ? time : `At ${time}`;

  return (
    <div className={`date-block date-block--${tone}`}>
      {title ? <p className="date-title">{title}</p> : null}
      <p className="date-time">{timeLabel}</p>
      <div className="date-row">
        <span className="date-weekday">{parts.weekday}</span>
        <span className="date-bar">|</span>
        <span className="date-day">{parts.day}</span>
        <span className="date-bar">|</span>
        <span className="date-month">{parts.month}</span>
      </div>
      <div className="date-year">{parts.year}</div>
    </div>
  );
}
