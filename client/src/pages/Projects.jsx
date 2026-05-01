const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";

const PROJECTS = [
  {
    id: 1,
    index: '001',
    title: 'E-Commerce Web App',
    year: '2025',
    desc: 'Full-stack online store with cart, checkout, and order management. JWT auth, REST API, and Stripe integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'LIVE',
    link: 'https://github.com/Uarep/gadget-store-fullstack',
  },
  {
    id: 2,
    index: '002',
    title: 'Skill Tracker',
    year: '2025',
    desc: 'Developer portfolio tool for tracking and visualizing technical proficiency. PostgreSQL-backed REST API with React frontend.',
    tech: ['React', 'Express', 'PostgreSQL', 'Tailwind'],
    status: 'ACTIVE',
    link: 'https://github.com/Uarep',
    featured: true,
  },
  {
    id: 3,
    index: '003',
    title: 'IT-Support-Ticket-System',
    year: '2024',
    desc: '###The core of this project is understanding Relational Databases.###',
    tech: ['HTML', 'CSS', 'JavaScript'],
    status: 'COMPLETE',
    link: 'https://github.com/Uarep/IT-Support-Ticket-System',
    
  },
];

const STATUS_COLORS = {
  LIVE: { bg: 'rgba(200,245,66,0.15)', text: '#3a6b00', dot: '#c8f542' },
  ACTIVE: { bg: 'rgba(74,144,217,0.1)', text: '#1a4d80', dot: '#4a90d9' },
  COMPLETE: { bg: 'rgba(0,0,0,0.05)', text: '#508f02', dot: '#6dc725' },
};

export default function Projects() {
  return (
    <div style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div style={{
        marginBottom: '48px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{
          fontFamily: MONO,
          fontSize: '10px',
          color: 'rgba(0,0,0,0.35)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          SELECTED WORK — {PROJECTS.length} PROJECTS
        </div>
        <h1 style={{
          fontFamily: SANS,
          fontSize: '32px',
          fontWeight: '600',
          color: '#0f0f0f',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          Projects
        </h1>
      </div>

      {/* Project list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {PROJECTS.map((proj, idx) => {
          const statusStyle = STATUS_COLORS[proj.status] || STATUS_COLORS.COMPLETE;
          return (
            <div
              key={proj.id}
              style={{
                borderTop: idx === 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                padding: '32px 0',
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                gap: '32px',
                alignItems: 'start',
                background: proj.featured ? 'rgba(0,0,0,0.015)' : 'transparent',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.025)'}
              onMouseLeave={e => e.currentTarget.style.background = proj.featured ? 'rgba(0,0,0,0.015)' : 'transparent'}
            >
              {/* Index + year */}
              <div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '22px',
                  fontWeight: '500',
                  color: 'rgba(0,0,0,0.1)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  {proj.index}
                </div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: 'rgba(0,0,0,0.3)',
                  letterSpacing: '0.06em',
                }}>
                  {proj.year}
                </div>
              </div>

              {/* Main content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <h2 style={{
                    fontFamily: SANS,
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0f0f0f',
                    letterSpacing: '-0.02em',
                  }}>
                    {proj.title}
                  </h2>
                  {proj.featured && (
                    <span style={{
                      fontFamily: MONO,
                      fontSize: '8px',
                      letterSpacing: '0.1em',
                      padding: '3px 8px',
                      background: '#0f0f0f',
                      color: '#c8f542',
                      borderRadius: '2px',
                    }}>
                      THIS PROJECT
                    </span>
                  )}
                </div>

                <p style={{
                  fontFamily: SANS,
                  fontSize: '13px',
                  color: 'rgba(0,0,0,0.55)',
                  lineHeight: '1.7',
                  marginBottom: '16px',
                  maxWidth: '480px',
                }}>
                  {proj.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: MONO,
                      fontSize: '10px',
                      letterSpacing: '0.06em',
                      padding: '4px 10px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '2px',
                      color: 'rgba(0,0,0,0.5)',
                      background: 'rgba(0,0,0,0.025)',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status + link */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  background: statusStyle.bg,
                  borderRadius: '2px',
                }}>
                  <div style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: statusStyle.dot,
                  }} />
                  <span style={{
                    fontFamily: MONO,
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: statusStyle.text,
                  }}>
                    {proj.status}
                  </span>
                </div>

                <a href={proj.link} style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  color: 'rgba(0,0,0,0.4)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(0,0,0,0.15)',
                  paddingBottom: '1px',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={e => { e.target.style.color = '#0f0f0f'; e.target.style.borderColor = '#0f0f0f'; }}
                onMouseLeave={e => { e.target.style.color = 'rgba(0,0,0,0.4)'; e.target.style.borderColor = 'rgba(0,0,0,0.15)'; }}
                >
                  GITHUB →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}