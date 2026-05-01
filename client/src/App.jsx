import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SkillForm from './pages/SkillForm';
import SkillList from './pages/SkillList';
import Projects from './pages/Projects';
import About from './pages/About';

const NAV_ITEMS = [
  { to: '/', label: 'Overview', code: '01' },
  { to: '/skills', label: 'Skills', code: '02' },
  { to: '/add-skill', label: 'Add Skill', code: '03' },
  { to: '/projects', label: 'Projects', code: '04' },
  { to: '/about', label: 'About', code: '05' },
];

function NavLink({ to, label, code }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 0',
        textDecoration: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.15s ease',
        opacity: isActive ? 1 : 0.45,
      }}
      className={`nav-item${isActive ? ' active' : ''}`}
    >
      <span style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: '10px',
        color: isActive ? '#c8f542' : 'rgba(255,255,255,0.4)',
        letterSpacing: '0.05em',
        minWidth: '20px',
        transition: 'color 0.15s ease',
      }}>
        {code}
      </span>
      <span style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        fontSize: '13px',
        fontWeight: isActive ? '500' : '400',
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
        letterSpacing: '0.02em',
        transition: 'all 0.15s ease',
      }}>
        {label}
      </span>
      {isActive && (
        <span style={{
          marginLeft: 'auto',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#c8f542',
        }} />
      )}
    </Link>
  );
}

function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      background: '#0f0f0f',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle vertical accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '1px',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(200,245,66,0.3) 40%, rgba(200,245,66,0.1) 70%, transparent)',
      }} />

      {/* Logo / Name */}
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'inline-block',
          background: '#c8f542',
          color: '#0f0f0f',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: '700',
          letterSpacing: '0.12em',
          padding: '4px 8px',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}>
          PORTFOLIO
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: '500',
          color: '#ffffff',
          lineHeight: '1.3',
          letterSpacing: '-0.01em',
        }}>
          Dev Profile
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.25)',
          marginTop: '4px',
          letterSpacing: '0.05em',
        }}>
          v1.0.0
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <NavLink key={item.to} {...item} />
        ))}
      </nav>

      {/* Bottom status */}
      <div style={{
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#c8f542',
            boxShadow: '0 0 6px rgba(200,245,66,0.6)',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
          }}>
            system online
          </span>
        </div>
      </div>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        height: '100vh',
        background: '#fafaf8',
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        overflow: 'hidden',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 2px; }
          .nav-item:hover { opacity: 0.85 !important; }
          .nav-item.active { opacity: 1 !important; }
          ::selection { background: #c8f542; color: #0f0f0f; }
        `}</style>
        <Sidebar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px 56px',
          background: '#fafaf8',
        }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-skill" element={<SkillForm />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;