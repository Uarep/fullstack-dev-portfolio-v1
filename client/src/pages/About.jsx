const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";

const STACK = [
  { cat: 'Frontend', items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'] },
  { cat: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
  { cat: 'Database', items: ['PostgreSQL', 'MongoDB'] },
  { cat: 'Tools', items: ['Git', 'Vite', 'Postman', 'pgAdmin'] },
];

const CONTACT = [
  { label: 'Email', value: 'kasemsan.k66@rsu.ac.th', href: 'mailto:kasemsan.k66@rsu.ac.th' },
  { label: 'GitHub', value: 'github.com/Uarep', href: 'https://github.com/Uarep' },
  { label: 'LinkedIn', value: 'linkedin.com/in/yourprofile', href: '#' },
];

export default function About() {
  return (
    <div style={{ maxWidth: '720px' }}>
      {/* Header */}
      <div style={{
        marginBottom: '56px',
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
          PROFILE
        </div>
        <h1 style={{
          fontFamily: SANS,
          fontSize: '32px',
          fontWeight: '600',
          color: '#0f0f0f',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          About
        </h1>
      </div>

      {/* Bio section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: '32px',
        marginBottom: '56px',
        alignItems: 'start',
      }}>
        {/* Avatar */}
        <div style={{
          width: '72px',
          height: '72px',
          background: '#0f0f0f',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: SANS,
            fontSize: '20px',
            fontWeight: '600',
            color: '#c8f542',
            letterSpacing: '-0.02em',
          }}>
            DEV
          </span>
        </div>

        {/* Info */}
        <div>
          <h2 style={{
            fontFamily: SANS,
            fontSize: '22px',
            fontWeight: '600',
            color: '#0f0f0f',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}>
            MR.KASEMSAN KAMNODSRI
          </h2>
          <div style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: '0.08em',
            marginBottom: '16px',
          }}>
            FULL STACK DEVELOPER — STUDENT
          </div>
          <p style={{
            fontFamily: SANS,
            fontSize: '14px',
            color: 'rgba(0,0,0,0.6)',
            lineHeight: '1.75',
            maxWidth: '480px',
          }}>
            สวัสดีครับ ผมเป็นนักศึกษาที่หลงใหลในการพัฒนา Web Application กำลังศึกษาและพัฒนาทักษะด้าน PERN Stack มีความสนใจพิเศษในการออกแบบ UI/UX ที่ใช้งานง่าย และระบบ Backend ที่มีประสิทธิภาพ
          </p>
        </div>
      </div>

      {/* Divider with label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <div style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.12em' }}>
          TECH STACK
        </div>
        <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }} />
      </div>

      {/* Stack grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '56px',
      }}>
        {STACK.map(group => (
          <div key={group.cat} style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '2px',
            padding: '20px',
          }}>
            <div style={{
              fontFamily: MONO,
              fontSize: '9px',
              color: 'rgba(0,0,0,0.3)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              {group.cat}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {group.items.map(item => (
                <span key={item} style={{
                  fontFamily: SANS,
                  fontSize: '13px',
                  color: '#0f0f0f',
                  background: 'rgba(0,0,0,0.04)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider with label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <div style={{ fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.12em' }}>
          CONTACT
        </div>
        <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }} />
      </div>

      {/* Contact rows */}
      <div>
        {CONTACT.map((c, idx) => (
          <div key={c.label} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0',
            borderTop: idx === 0 ? '1px solid rgba(0,0,0,0.07)' : 'none',
            borderBottom: '1px solid rgba(0,0,0,0.07)',
          }}>
            <span style={{
              fontFamily: MONO,
              fontSize: '10px',
              color: 'rgba(0,0,0,0.35)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {c.label}
            </span>
            <a href={c.href} style={{
              fontFamily: SANS,
              fontSize: '14px',
              color: '#0f0f0f',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.15)',
              paddingBottom: '1px',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.target.style.borderColor = '#0f0f0f'}
            onMouseLeave={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
            >
              {c.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}