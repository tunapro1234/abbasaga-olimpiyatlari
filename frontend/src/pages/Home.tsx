import { useEffect, useState } from 'react';

const HERO_IMAGE = '/hero.jpg';

type HealthResponse = {
  status: string;
  db?: string;
};

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const payload = (await response.json()) as HealthResponse;
        setHealth(payload);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      }
    }

    void fetchHealth();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <img className="hero__image" src={HERO_IMAGE} alt="Abbasağa Parkı amfitiyatrosu" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__badge" aria-labelledby="heroBadgeTitle">
            <p id="heroBadgeTitle" className="hero__badge-title">
              Abbasağa Parkı
            </p>
            <p className="hero__badge-date">15 Haziran 2025 • Beşiktaş</p>
            <div className="hero__badge-division" aria-hidden="true" />
            <div className="hero__badge-grid">
              <div>
                <span className="hero__badge-label">Takım</span>
                <span className="hero__badge-value">32 kontenjan</span>
              </div>
              <div>
                <span className="hero__badge-label">Kategori</span>
                <span className="hero__badge-value">Parkur · Pasta · Sürpriz</span>
              </div>
              <div>
                <span className="hero__badge-label">Seyirci</span>
                <span className="hero__badge-value">1.500 kapasite</span>
              </div>
            </div>
          </div>
          <div className="hero__copy">
            <p className="hero__eyebrow">Abbasağa Olimpiyatları 2025</p>
            <h1 className="hero__title">Türkiyenin En Büyük Doğum Günü Yarışması*</h1>
            <p className="hero__subtitle">
              Abbasağa Parkı&apos;nın kalbinde, takımların dayanışma ve eğlenceyle yarıştığı büyük mahalle buluşması.
              Mahallenin gururu, pastaların arenası.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="mailto:kayit@abbasagaolimpiyatlari.org">
                Yarışmaya Katıl
              </a>
              <a className="btn btn--ghost" href="#">
                Program Yakında
              </a>
            </div>
            <dl className="status" role="status" aria-live="polite">
              <div className="status__item">
                <dt>API</dt>
                <dd>{health?.status ?? (error ? 'Sorun' : 'Yükleniyor')}</dd>
              </div>
              <div className="status__item">
                <dt>Veritabanı</dt>
                <dd>{health?.db ?? (error ? 'Sorun' : 'Yükleniyor')}</dd>
              </div>
            </dl>
            {error && <p className="status status--error">Bağlantı hatası: {error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
