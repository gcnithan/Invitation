import { useEffect, useState } from "react";
import { config } from "../config";

function remaining(target) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const min = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  return { days, hours, min, sec };
}

function unit(value, singular, plural) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export default function Countdown() {
  const [parts, setParts] = useState(() => remaining(config.countdownTo));

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(remaining(config.countdownTo));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const label = parts
    ? `${unit(parts.days, "day", "days")} ${unit(parts.hours, "hour", "hours")} ${parts.min} min ${parts.sec} sec`
    : "The celebration has begun";

  return <p className="countdown-value">{label}</p>;
}
