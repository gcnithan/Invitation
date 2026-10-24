import { config } from "../config";
import { GoldFlourish } from "./Ornaments";

const PETALS = [
  { l: "8%", s: 14, d: "-4s", dur: "18s", sway: "22px" },
  { l: "18%", s: 20, d: "-11s", dur: "21s", sway: "-28px" },
  { l: "72%", s: 16, d: "-2s", dur: "19s", sway: "18px" },
  { l: "86%", s: 24, d: "-15s", dur: "23s", sway: "-16px" },
  { l: "34%", s: 13, d: "-7s", dur: "20s", sway: "30px" },
  { l: "58%", s: 18, d: "-13s", dur: "22s", sway: "-24px" },
  { l: "46%", s: 15, d: "-1s", dur: "17s", sway: "14px" },
  { l: "4%", s: 22, d: "-9s", dur: "24s", sway: "-20px" },
  { l: "92%", s: 12, d: "-6s", dur: "19s", sway: "26px" },
  { l: "64%", s: 19, d: "-17s", dur: "21s", sway: "-12px" },
];

export default function Cover({ opening, onOpen }) {
  return (
    <main className={`cover ${opening ? "is-opening" : ""}`}>
      {PETALS.map((petal, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: petal.l,
            width: petal.s,
            height: petal.s,
            animationDelay: petal.d,
            animationDuration: petal.dur,
            "--sway": petal.sway,
          }}
        />
      ))}

      <section className="invite-card" aria-label="Invitation cover">
        <span className="card-shine" aria-hidden="true" />
        <img className="cover-flower cover-flower-tl" src="/images/themes/mahal-gold/flower1.webp" alt="" />
        <img className="cover-flower cover-flower-br" src="/images/themes/mahal-gold/flower1.webp" alt="" />

        <div className="seal" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M12 20s-7-4.35-9.3-8.2C1 8.7 1.6 5.4 4.2 4.1 6.3 3 8.5 3.6 12 6.6c3.5-3 5.7-3.6 7.8-2.5 2.6 1.3 3.2 4.6 1.5 7.7C19 15.65 12 20 12 20z"
              fill="#fff"
            />
          </svg>
        </div>

        <h1 className="cover-names">
          <span>{config.bride}</span>
          <span className="cover-amp">&</span>
          <span>{config.groom}</span>
        </h1>

        <GoldFlourish className="cover-flourish" />

        <p className="cover-date">{config.coverDate}</p>
        <p className="cover-line">{config.coverLine}</p>

        <button type="button" className="open-btn" onClick={onOpen}>
          Open
        </button>
      </section>
    </main>
  );
}
