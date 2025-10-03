import { useEffect, useState } from 'react';
import heroImage from './assets/abbasaga-park.jpg';
import logoBadge from './assets/logo-badge.jpg';
import './App.css';

type HealthResponse = {
  status: string;
  db?: string;
};

function App() {
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
    <div className="page">
      <header className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero__overlay">
          <img className="hero__logo" src={logoBadge} alt="Abbasağa Olimpiyatları logosu" />
          <p className="hero__eyebrow">Abbasağa Olimpiyatları 2025</p>
          <h1 className="hero__title">Türkiyenin En Büyük Doğum Günü Yarışması*</h1>
          <p className="hero__subtitle">
            Abbasağa Parkı&apos;nı baştan sona kaplayan takım oyunları, pasta ritüelleri ve sürpriz final gösterileri.
            Mahallenin gururu, pastaların arenası.
          </p>
        </div>
        <div className="hero__bottom-fade" aria-hidden="true" />
      </header>

      <section className="cta-panel" id="kayit">
        <div className="cta-panel__text">
          <h2>Dahil Olmak İçin Kayıt Ol</h2>
          <p>
            Pilot aşamada ekip başvurularını sırayla açıyoruz. E-postanı bırak, kayıt formu açıldığında ilk sen haberdar
            ol.
          </p>
          <div className="cta-panel__actions">
            <a className="btn btn--primary" href="mailto:kayit@abbasagaolimpiyatlari.org">
              Başvurumu Gönder
            </a>
            <a className="btn btn--ghost" href="#program">
              Programı Gör
            </a>
          </div>
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
      </section>

      <main className="content">
        <section id="program">
          <h2>Program</h2>
          <p>
            Sabah park koşusuyla açılış, öğlen dev pasta seremonisi ve akşam amfitiyatro finali. Detaylı saat programı
            yakında paylaşılacak.
          </p>
        </section>
        <section>
          <h2>Ne Beklemelisin?</h2>
          <ul className="feature-grid">
            <li>Mahalle takımlarıyla 3 aşamalı parkur</li>
            <li>Topluluk jürisi ve sürpriz sanatçı konuklar</li>
            <li>Yerel üreticilerle dayanışma pazarı</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
