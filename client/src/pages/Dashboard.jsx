import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";

function StatCard({ label, value, unit, note, accent }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: '2px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {accent && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: accent,
        }} />
      )}
      <div style={{
        fontFamily: MONO,
        fontSize: '10px',
        color: 'rgba(0,0,0,0.35)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        {label}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '6px',
        marginBottom: '8px',
      }}>
        <span style={{
          fontFamily: SANS,
          fontSize: '36px',
          fontWeight: '600',
          color: '#0f0f0f',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>
          {value}
        </span>
        {unit && (
          <span style={{
            fontFamily: MONO,
            fontSize: '12px',
            color: 'rgba(0,0,0,0.4)',
          }}>
            {unit}
          </span>
        )}
      </div>
      {note && (
        <div style={{
          fontFamily: SANS,
          fontSize: '12px',
          color: 'rgba(0,0,0,0.4)',
        }}>
          {note}
        </div>
      )}
    </div>
  );
}

function ActivityRow({ label, meta, time, type }) {
  const dotColors = { success: '#c8f542', info: '#4a90d9', neutral: 'rgba(0,0,0,0.2)' };
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '14px 0',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: dotColors[type] || dotColors.neutral,
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: SANS, fontSize: '13px', color: '#0f0f0f' }}>{label} </span>
        <span style={{ fontFamily: SANS, fontSize: '13px', fontWeight: '500', color: '#0f0f0f' }}>{meta}</span>
      </div>
      <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.05em' }}>
        {time}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/skills')
      .then(r => { setSkills(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const avgLevel = skills.length
    ? (skills.reduce((s, sk) => s + Number(sk.level), 0) / skills.length).toFixed(1)
    : '—';

  const categories = [...new Set(skills.map(s => s.category))].length;

  return (
    <div style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '48px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div>
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            SKILL TRACKER — 2025
          </div>
          <h1 style={{
            fontFamily: SANS,
            fontSize: '32px',
            fontWeight: '600',
            color: '#0f0f0f',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Overview
          </h1>
        </div>
        <Link
          to="/add-skill"
          style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: '#0f0f0f',
            background: '#c8f542',
            textDecoration: 'none',
            padding: '10px 20px',
            letterSpacing: '0.06em',
            fontWeight: '500',
            borderRadius: '2px',
            transition: 'opacity 0.15s',
          }}
        >
          + ADD SKILL
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '48px',
      }}>
        <StatCard
          label="Total Skills"
          value={loading ? '…' : skills.length}
          note="tracked entries"
          accent="#c8f542"
        />
        <StatCard
          label="Avg. Proficiency"
          value={loading ? '…' : avgLevel}
          unit="/ 10"
          note="across all skills"
          accent="#4a90d9"
        />
        <StatCard
          label="Categories"
          value={loading ? '…' : categories}
          note="distinct domains"
          accent="#0f0f0f"
        />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Recent skills */}
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '2px',
          padding: '24px',
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Recent Skills
          </div>
          {loading ? (
            <div style={{ fontFamily: SANS, fontSize: '13px', color: 'rgba(0,0,0,0.3)' }}>Loading…</div>
          ) : skills.length === 0 ? (
            <div style={{ fontFamily: SANS, fontSize: '13px', color: 'rgba(0,0,0,0.3)' }}>No skills yet.</div>
          ) : (
            skills.slice(0, 5).map(skill => (
              <div key={skill.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
              }}>
                <div>
                  <div style={{ fontFamily: SANS, fontSize: '13px', fontWeight: '500', color: '#0f0f0f' }}>
                    {skill.skill_name}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.35)', marginTop: '2px' }}>
                    {skill.category}
                  </div>
                </div>
                <div style={{
                  fontFamily: MONO,
                  fontSize: '13px',
                  fontWeight: '500',
                  color: Number(skill.level) >= 7 ? '#2a7a2a' : Number(skill.level) >= 4 ? '#0f0f0f' : 'rgba(0,0,0,0.4)',
                }}>
                  {skill.level}/10
                </div>
              </div>
            ))
          )}
        </div>

        {/* Activity log */}
        <div style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '2px',
          padding: '24px',
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Activity Log
          </div>
          <ActivityRow label="Leveled up" meta="React Hooks → 8" time="2h ago" type="success" />
          <ActivityRow label="Added project" meta="E-Commerce App" time="1d ago" type="info" />
          <ActivityRow label="Started" meta="PostgreSQL track" time="3d ago" type="neutral" />
          <ActivityRow label="Completed" meta="Node.js module" time="1w ago" type="success" />
          <ActivityRow label="Initialized" meta="Portfolio v1.0" time="2w ago" type="info" />
        </div>
      </div>
    </div>
  );
}