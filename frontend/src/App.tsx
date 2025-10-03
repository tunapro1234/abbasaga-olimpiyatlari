import { useEffect, useState } from 'react';
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      }
    }

    void fetchHealth();
  }, []);

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Abbasağa Olimpiyatları</p>
        <h1 className="title">Türkiyenin En Büyük Doğum Günü Yarışması*</h1>
        <p className="subtitle">
          Bütün mahalleyi bir araya getiren, coşkunun ve rekabetin doruğa çıktığı doğum günü festivali.
        </p>
        <div className="cta-group">
          <a className="btn btn--primary" href="#kayit">Kayıt Bilgilendirmesi</a>
          <a className="btn btn--ghost" href="#takvim">2025 Takvimi</a>
        </div>
        <dl className="status">
          <div className="status__item">
            <dt>API</dt>
            <dd>{health?.status ?? (error ? 'Sorun' : 'Yükleniyor...')}</dd>
          </div>
          <div className="status__item">
            <dt>Veritabanı</dt>
            <dd>{health?.db ?? (error ? 'Sorun' : 'Yükleniyor...')}</dd>
          </div>
        </dl>
        {error && <p className="status status--error">Bağlantı hatası: {error}</p>}
        <p className="footnote">*Mahallenin gururu, pastaların arenası.</p>
      </header>
      <main className="content">
        <section id="kayit">
          <h2>Ön Kayıt</h2>
          <p>
            İlk başvuruyu sen yap! Pilot aşamada sadece e-posta topluyoruz. Yakında takım ve kategori
            seçimleri açılacak.
          </p>
        </section>
        <section id="takvim">
          <h2>Takvim Yakında</h2>
          <p>
            Bölge elemeleri ve büyük final tarihleri kesinleştiğinde buradan paylaşacağız. Şimdilik API
            üzerinde deneme kullanıcılarıyla bağlantıyı doğruluyoruz.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
