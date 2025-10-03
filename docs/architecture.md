# Mimari Özeti

## Genel Yaklaşım
- Monorepo düzeni: `backend/` ve `frontend/` bağımsız npm paketleri; kök `package.json` ile scriptler ve Docker orkestrasyonu yönetiliyor.
- Tüm uygulama TypeScript tabanlı. Backend Node.js/Express ile API sağlıyor, frontend ise Vite + React ile etkileşimli arayüz sunuyor.
- Docker Compose geliştirme ortamı PostgreSQL, API ve frontend servislerini ayrı konteynerlerde ayağa kaldırıyor.

## Yığın Bileşenleri
- **Backend**: Express 5 + `pg` havuzu; `src/` altında konfig (`config.ts`), veritabanı erişimi (`db.ts`) ve route controller'ları (`routes/`). Çalıştırma `ts-node-dev` ile sıcak yeniden yüklemeli.
- **Frontend**: Vite React TS. `src/App.tsx` Abbasağa Olimpiyatları kahraman sayfasını ve `/api/health` isteğini yönetiyor. `vite.config.ts` geliştirmede backend'e `/api` proxy'liyor.
- **Veritabanı**: PostgreSQL 16. Başlangıç şemasında `users` tablosu ve tek e-posta alanı bulunur; `docker/postgres/init.sql` tabloyu ve örnek kaydı oluşturur.
- **Docker**: `docker-compose.dev.yml` backend, frontend ve veritabanını bağlar; kod klasörleri volume olarak paylaşılır, `docker/*.Dockerfile` imajları üretir.

## Geliştirme Akışı
1. `npm install` (workspace'ler otomatik kurulur) veya tekil paket dizinlerinde `npm install`.
2. Yerelde direkt çalışmak için: `npm run dev:backend` ve `npm run dev:frontend` (proxy ile API'ya bağlanır).
3. Konteynerli geliştirme: `npm run dev` => Docker Compose tüm servisleri ayağa kaldırır.
4. `backend` ayağa kalkarken `runMigrations` + `seedDefaultUser` çalıştırarak şemayı doğrular.

## Klasör Yapısı (Özet)
```
.
├── backend
│   ├── src
│   │   ├── app.ts
│   │   ├── config.ts
│   │   ├── db.ts
│   │   └── routes
│   │       ├── health.ts
│   │       └── users.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── public
│   ├── src
│   │   ├── App.tsx
│   │   └── index.css
│   └── vite.config.ts
├── docker
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── postgres
│       └── init.sql
├── docker-compose.dev.yml
└── docs
    └── architecture.md
```

## Gelecek Adımlar
- Backend testleri için Jest veya Vitest kurulumu ve veritabanı için test container entegrasyonu.
- Frontend için durum yönetimi (TanStack Query) ve form akışları.
- Üretim profili: çok aşamalı Docker build, reverse proxy (NGINX) ve izleme/loglama katmanları.
