import { calendarUrl, config, directionsUrl, mapEmbedUrl } from "../config";
import CalendarBlock from "./CalendarBlock";
import Countdown from "./Countdown";
import DateBlock from "./DateBlock";
import Gallery from "./Gallery";
import { SendIcon } from "./Ornaments";
import Reveal from "./Reveal";

const ART = "/images/themes/mahal-gold";

function Art({ name, className }) {
  return (
    <div
      aria-hidden="true"
      className={`art ${className}`}
      style={{ backgroundImage: `url(${ART}/${name}.webp)` }}
    />
  );
}

function GoldLine({ className = "" }) {
  return <img className={`gold-line ${className}`} src={`${ART}/gold-line.webp`} alt="" />;
}

function Family({ family }) {
  return (
    <div className="family">
      <p className="family-title">{family.title}</p>
      <p className="family-name">{family.father}</p>
      <p className="family-name">{family.mother}</p>
      {family.address ? <p className="family-address">{family.address}</p> : null}
    </div>
  );
}

export default function Invitation() {
  return (
    <main className="stage">
      <article className="sheet">
        <div className="paper-texture" aria-hidden="true" />

        <header className="mahal-hero">
          <div className="mahal-hero-inner">
            <Art name="bells" className="bells-art" />
            <Art name="flower1" className="flower1-art" />
            <div className="arch-stage">
              <Art name="arch-frame" className="arch-art" />
              <Art name="ganesha" className="ganesha-art" />
              <div className="hero-copy">
                <h1 className="hero-names">
                  <span className="hero-name">{config.bride}</span>
                  <span className="hero-amp">&</span>
                  <span className="hero-name">{config.groom}</span>
                </h1>
              </div>
            </div>
            <div className="palace-scene">
              <Art name="sandstone" className="sandstone-art" />
              <Art name="castle" className="castle-art" />
              <Art name="flower2" className="flower2-art flower2-art--right" />
              <Art name="flower2" className="flower2-art flower2-art--left" />
              <Art name="fence" className="fence-art" />
            </div>
          </div>
        </header>

        <section className="ornament-band">
          <Art name="castle2" className="castle-wash castle-wash--a" />
          <Art name="pattern" className="pattern-rule pattern-rule--a" />
          <Art name="sandstone-flower" className="side-flower side-flower--left" />
          <Art name="flower3-decoration" className="side-bloom side-bloom--right" />
          <div className="ornament-content">
        <Reveal>
          <section className="block">
            <h2 className="section-title">Ceremony Info</h2>
            <div className="families">
              <Family family={config.brideFamily} />
              <div className="family-rule" aria-hidden="true" />
              <Family family={config.groomFamily} />
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="couple-wrap">
            <p className="announce">
              {config.announcement.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <div className="couple">
              <h3>{config.bride}</h3>
              <span className="role">Bride</span>
              <div className="couple-amp">&</div>
              <h3>{config.groom}</h3>
              <span className="role">Groom</span>
            </div>
            <div className="ceremonies">
              {config.ceremonies.map((item) => (
                <DateBlock
                  key={item.title}
                  title={item.title}
                  iso={item.date}
                  time={item.time}
                  tone="ceremony"
                />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <GoldLine className="section-flourish" />
          <Gallery />
        </Reveal>
          </div>
        </section>

        <section className="ornament-band">
          <Art name="castle2" className="castle-wash castle-wash--b" />
          <Art name="pattern" className="pattern-rule pattern-rule--b" />
          <Art name="sandstone-flower" className="side-flower side-flower--right" />
          <Art name="flower3-decoration" className="side-bloom side-bloom--left" />
          <div className="ornament-content">
        <Reveal>
          <section className="block reception-block">
            <h2 className="section-title">Reception Info</h2>
            <p className="reception-heading">{config.reception.heading}</p>
            <DateBlock iso={config.reception.date} time={config.reception.time} tone="reception" />
          </section>
        </Reveal>

        <Reveal>
          <section className="block countdown-block">
            <h2 className="countdown-label">Countdown</h2>
            <Countdown />
            <CalendarBlock />
            <a className="text-link" href={calendarUrl()} target="_blank" rel="noreferrer">
              Add to Calendar
            </a>
          </section>
        </Reveal>
          </div>
        </section>

        <Reveal>
          <section className="block venue-block">
            <h2 className="section-title venue-title">{config.venue.title}</h2>
            <p className="venue-address">{config.venue.address}</p>
            <div className="map-frame">
              <iframe
                title="Wedding reception venue map"
                src={mapEmbedUrl()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a className="directions" href={directionsUrl()} target="_blank" rel="noreferrer">
              <SendIcon />
              Get directions
            </a>
          </section>
        </Reveal>

        <div className="closing">
          <footer className="thanks">
            <p>{config.thankYou}</p>
            <GoldLine />
            <p className="powered-by">
              <span>
                Powered by <strong>Navi Infotech</strong>
              </span>
              <img src="/navi-infotech.jpg" alt="Navi Infotech" />
            </p>
          </footer>
          <img className="closing-castle" src={`${ART}/castle.webp`} alt="" />
        </div>
      </article>
    </main>
  );
}
