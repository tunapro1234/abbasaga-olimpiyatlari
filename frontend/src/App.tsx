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
      <header className="site-header">
        <div className="site-header__logo">
          <img src={logoBadge} alt="Abbasağa Olimpiyatları logosu" />
          <span>Abbasağa Olimpiyatları</span>
        </div>
        <nav className="site-header__nav">
          <a href="#kayit">Kayıt</a>
          <a href="#program">Program</a>
          <a href="#destek">Destek</a>
        </nav>
        <a className="site-header__cta" href="mailto:kayit@abbasagaolimpiyatlari.org">
          Hemen Yaz
        </a>
      </header>

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
              <a className="btn btn--primary" href="#kayit">
                Yarışmaya Katıl
              </a>
              <a className="btn btn--ghost" href="#program">
                Programı İncele
              </a>
            </div>
          </div>
        </div>
        <div className="hero__bottom" aria-hidden="true" />
      </section>

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
          <a className="btn btn--ghost" href="#destek">
            Destek Ol
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
        <section id="destek">
          <h2>Destek Çağrısı</h2>
          <p>
            Mahalle kooperatiflerine bağış, gönüllü ekip ve mentorlar aranıyor. Lokasyon paylaşımları ve sponsorluk
            önerileri için <a href="mailto:destek@abbasagaolimpiyatlari.org">destek mailimize</a> yazabilirsin.
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
