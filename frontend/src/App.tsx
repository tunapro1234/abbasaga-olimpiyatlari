import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/Home';
import ProgramPage from './pages/Program';
import DestekPage from './pages/Destek';
import KayitPage from './pages/Kayit';
import logoBadge from './assets/logo-badge.jpg';
import './App.css';

type LinkDescriptor = {
  to: string;
  label: string;
};

const links: LinkDescriptor[] = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/program', label: 'Program' },
  { to: '/kayit', label: 'Kayıt' },
  { to: '/destek', label: 'Destek' }
];

function Shell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={isHome ? 'app-shell app-shell--home' : 'app-shell'}>
      <header className={isHome ? 'site-header site-header--overlay' : 'site-header site-header--solid'}>
        <div className="site-header__logo">
          <img src={logoBadge} alt="Abbasağa Olimpiyatları logosu" />
          <span>Abbasağa Olimpiyatları</span>
        </div>
        <nav className="site-header__nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'site-header__link site-header__link--active' : 'site-header__link'
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <a className="site-header__cta" href="mailto:kayit@abbasagaolimpiyatlari.org">
          Hemen Yaz
        </a>
      </header>

      <main className={isHome ? 'view-container view-container--home' : 'view-container'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/kayit" element={<KayitPage />} />
          <Route path="/destek" element={<DestekPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
