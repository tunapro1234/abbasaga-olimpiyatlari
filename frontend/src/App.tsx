import { useEffect, useState } from 'react';
import logoBadge from './assets/logo-badge.jpg';
import './App.css';

type HealthResponse = {
  status: string;
  db?: string;
};

const HERO_IMAGE = '/hero.jpg';

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
      <header className="hero">
        <img className="hero__image" src={HERO_IMAGE} alt="Abbasağa Parkı amfitiyatrosu" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <img className="hero__logo" src={logoBadge} alt="Abbasağa Olimpiyatları logosu" />
          <p className="hero__eyebrow">Abbasağa Olimpiyatları 2025</p>
          <h1 className="hero__title">Türkiyenin En Büyük Doğum Günü Yarışması*</h1>
          <p className="hero__subtitle">
            Abbasağa Parkı&apos;nın kalbinde, takımların dayanışma ve eğlenceyle yarıştığı büyük mahalle buluşması.
            Mahallenin gururu, pastaların arenası.
          </p>
        </div>
        <div className="hero__bottom" aria-hidden="true" />
      </header>

      <section className="cta-panel" id="kayit">
        <div className="cta-panel__header">
          <h2>Dahil Olmak İçin Kayıt Ol</h2>
          <p>
            İlk katılımcı listelerini hazırlıyoruz. Ekip kaptanıysan form açıldığında ilk sen haberdar ol ki sahnede
            yerini al.
          </p>
        </div>
        <div className="cta-panel__actions">
          <a className="btn btn--primary" href="mailto:kayit@abbasagaolimpiyatlari.org">
            Başvurumu Gönder
          </a>
          <a className="btn btn--ghost" href="#program">
            2025 Programı
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
      </section>

      <main className="content">
        <section id="program">
          <h2>Program</h2>
          <p>
            Sabah açılış korteji, öğlen dev pasta seremonisi, akşam amfitiyatro finali. Takvim ayrıntıları netleştiğinde
            buradan duyuracağız.
          </p>
        </section>
        <section>
          <h2>Ne Beklemelisin?</h2>
          <ul className="feature-grid">
            <li>Üç etaplı parkur oyunları ve takım puanlaması</li>
            <li>Pasta ritüeli ve topluluk jürisiyle tadım seansı</li>
            <li>Mahalle kooperatifleriyle dayanışma pazarı</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
