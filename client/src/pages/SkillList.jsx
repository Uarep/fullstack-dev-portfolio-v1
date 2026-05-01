import { useEffect, useState } from 'react';
import axios from 'axios';

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";
const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'];

const CATEGORY_ACCENTS = {
  Frontend: '#4a90d9',
  Backend: '#c8f542',
  Database: '#e8a838',
  Tools: '#9b59b6',
};

function SkillBar({ level }) {
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{
          width: '14px', height: '4px', borderRadius: '1px',
          background: i < level ? '#0f0f0f' : 'rgba(0,0,0,0.08)',
          transition: 'background 0.2s',
        }} />
      ))}
    </div>
  );
}

function EditModal({ skill, onClose, onSave }) {
  const [name, setName] = useState(skill.skill_name);
  const [level, setLevel] = useState(Number(skill.level));
  const [category, setCategory] = useState(skill.category);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await axios.put(`http://localhost:3000/api/skills/${skill.id}`, {
        skill_name: name, level, category,
      });
      onSave(res.data);
    } catch {
      setError('Connection error — check backend');
    } finally {
      setSaving(false);
    }
  };

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  const inputStyle = {
    fontFamily: SANS, fontSize: '14px', color: '#0f0f0f',
    background: '#fafaf8', border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '2px', padding: '10px 14px', width: '100%', outline: 'none',
  };
  const labelStyle = {
    fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.4)',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    display: 'block', marginBottom: '8px',
  };

  return (
    <div onClick={handleBackdrop} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '2px',
        border: '1px solid rgba(0,0,0,0.1)',
        padding: '32px', width: '100%', maxWidth: '480px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}>
          <div>
            <div style={{
              fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.35)',
              letterSpacing: '0.12em', marginBottom: '6px',
            }}>
              EDIT ENTRY — #{skill.id}
            </div>
            <div style={{
              fontFamily: SANS, fontSize: '18px', fontWeight: '600',
              color: '#0f0f0f', letterSpacing: '-0.02em',
            }}>
              {skill.skill_name}
            </div>
          </div>
          <button onClick={onClose} style={{
            fontFamily: MONO, fontSize: '16px', color: 'rgba(0,0,0,0.3)',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
          }}>
            ✕
          </button>
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={labelStyle}>Skill Name</label>
            <input
              type="text" value={name} onChange={e => setName(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#0f0f0f'}
              onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} type="button" onClick={() => setCategory(cat)} style={{
                  fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
                  padding: '6px 14px', borderRadius: '2px', cursor: 'pointer',
                  textTransform: 'uppercase', transition: 'all 0.15s', border: '1px solid',
                  borderColor: category === cat ? '#0f0f0f' : 'rgba(0,0,0,0.12)',
                  background: category === cat ? '#0f0f0f' : 'transparent',
                  color: category === cat ? '#ffffff' : 'rgba(0,0,0,0.5)',
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Level</label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{
                  fontFamily: SANS, fontSize: '22px', fontWeight: '600',
                  color: '#0f0f0f', letterSpacing: '-0.03em', lineHeight: 1,
                }}>{level}</span>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.3)' }}>/10</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} onClick={() => setLevel(i + 1)} style={{
                  flex: 1, height: '6px', borderRadius: '1px', cursor: 'pointer',
                  background: i < level ? '#0f0f0f' : 'rgba(0,0,0,0.08)',
                  transition: 'background 0.1s',
                }} />
              ))}
            </div>
            <input
              type="range" min="1" max="10" value={level}
              onChange={e => setLevel(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0f0f0f', cursor: 'pointer' }}
            />
          </div>

          {error && (
            <div style={{
              fontFamily: MONO, fontSize: '11px', color: '#8b1a1a',
              padding: '10px 14px', background: 'rgba(200,50,50,0.08)',
              borderLeft: '3px solid #cc3333', borderRadius: '2px',
            }}>
              ✗ {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
            <button onClick={onClose} style={{
              fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
              padding: '10px 20px', background: 'transparent', borderRadius: '2px',
              border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.5)',
              cursor: 'pointer', textTransform: 'uppercase',
            }}>
              CANCEL
            </button>
            <button onClick={handleSave} disabled={saving} style={{
              fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
              padding: '10px 24px',
              background: saving ? 'rgba(0,0,0,0.4)' : '#0f0f0f',
              color: '#c8f542', border: 'none', borderRadius: '2px',
              cursor: saving ? 'not-allowed' : 'pointer', textTransform: 'uppercase',
            }}>
              {saving ? 'SAVING…' : 'SAVE →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ skill, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/skills/${skill.id}`);
      onConfirm(skill.id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#ffffff', borderRadius: '2px', padding: '32px',
        width: '100%', maxWidth: '400px',
        border: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.35)',
          letterSpacing: '0.12em', marginBottom: '12px',
        }}>
          CONFIRM DELETE
        </div>
        <div style={{
          fontFamily: SANS, fontSize: '16px', fontWeight: '500',
          color: '#0f0f0f', marginBottom: '8px',
        }}>
          Delete "{skill.skill_name}"?
        </div>
        <div style={{
          fontFamily: SANS, fontSize: '13px', color: 'rgba(0,0,0,0.45)',
          marginBottom: '28px', lineHeight: '1.6',
        }}>
          This action cannot be undone. The entry will be permanently removed from the database.
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
            padding: '10px 20px', background: 'transparent', borderRadius: '2px',
            border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.5)',
            cursor: 'pointer', textTransform: 'uppercase',
          }}>
            CANCEL
          </button>
          <button onClick={handleDelete} disabled={deleting} style={{
            fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
            padding: '10px 24px',
            background: deleting ? '#999' : '#cc3333',
            color: '#ffffff', border: 'none', borderRadius: '2px',
            cursor: deleting ? 'not-allowed' : 'pointer', textTransform: 'uppercase',
          }}>
            {deleting ? 'DELETING…' : 'DELETE'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SkillList() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/skills')
      .then(r => { setSkills(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSaved = (updated) => {
    setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
    setEditTarget(null);
  };

  const handleDeleted = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    setDeleteTarget(null);
  };

  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const filtered = filter === 'All' ? skills : skills.filter(s => s.category === filter);

  return (
    <div style={{ maxWidth: '860px' }}>
      {editTarget && <EditModal skill={editTarget} onClose={() => setEditTarget(null)} onSave={handleSaved} />}
      {deleteTarget && <DeleteModal skill={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDeleted} />}

      {/* Header */}
      <div style={{
        marginBottom: '40px', paddingBottom: '24px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        <div style={{
          fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.35)',
          letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          INDEX — {skills.length} ENTRIES
        </div>
        <h1 style={{
          fontFamily: SANS, fontSize: '32px', fontWeight: '600',
          color: '#0f0f0f', letterSpacing: '-0.03em', lineHeight: 1.1,
        }}>
          Skills
        </h1>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            fontFamily: MONO, fontSize: '10px', letterSpacing: '0.08em',
            padding: '6px 14px', borderRadius: '2px', cursor: 'pointer',
            textTransform: 'uppercase', transition: 'all 0.15s', border: '1px solid',
            borderColor: filter === cat ? '#0f0f0f' : 'rgba(0,0,0,0.12)',
            background: filter === cat ? '#0f0f0f' : 'transparent',
            color: filter === cat ? '#ffffff' : 'rgba(0,0,0,0.5)',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 100px 160px 60px 80px',
        gap: '16px', padding: '8px 0', borderBottom: '2px solid #0f0f0f',
      }}>
        {['SKILL', 'CATEGORY', 'PROFICIENCY', 'LVL', 'ACTIONS'].map(h => (
          <div key={h} style={{
            fontFamily: MONO, fontSize: '9px', color: 'rgba(0,0,0,0.35)',
            letterSpacing: '0.12em', textAlign: h === 'ACTIONS' ? 'right' : 'left',
          }}>
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {loading ? (
        <div style={{ padding: '32px 0', fontFamily: SANS, fontSize: '13px', color: 'rgba(0,0,0,0.3)' }}>
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '32px 0', fontFamily: SANS, fontSize: '13px', color: 'rgba(0,0,0,0.3)' }}>
          No skills in this category.
        </div>
      ) : (
        filtered.map((skill, idx) => (
          <div key={skill.id} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 160px 60px 80px',
            gap: '16px', alignItems: 'center',
            padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.06)',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.2)', minWidth: '24px' }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: SANS, fontSize: '14px', fontWeight: '500', color: '#0f0f0f' }}>
                {skill.skill_name}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '1px', flexShrink: 0,
                background: CATEGORY_ACCENTS[skill.category] || '#888',
              }} />
              <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.04em' }}>
                {skill.category}
              </span>
            </div>

            <SkillBar level={Number(skill.level)} />

            <span style={{
              fontFamily: MONO, fontSize: '13px', fontWeight: '500',
              color: Number(skill.level) >= 8 ? '#1a6b1a' : Number(skill.level) >= 5 ? '#0f0f0f' : 'rgba(0,0,0,0.35)',
            }}>
              {skill.level}
            </span>

            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditTarget(skill)}
                style={{
                  fontFamily: MONO, fontSize: '9px', letterSpacing: '0.06em',
                  padding: '5px 10px', background: 'transparent', borderRadius: '2px',
                  border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.45)',
                  cursor: 'pointer', transition: 'all 0.15s', textTransform: 'uppercase',
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#0f0f0f'; e.target.style.color = '#0f0f0f'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.color = 'rgba(0,0,0,0.45)'; }}
              >
                EDIT
              </button>
              <button
                onClick={() => setDeleteTarget(skill)}
                style={{
                  fontFamily: MONO, fontSize: '11px',
                  padding: '5px 8px', background: 'transparent', borderRadius: '2px',
                  border: '1px solid rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.3)',
                  cursor: 'pointer', transition: 'all 0.15s', lineHeight: 1,
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#cc3333'; e.target.style.color = '#cc3333'; e.target.style.background = 'rgba(200,50,50,0.05)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,0,0,0.12)'; e.target.style.color = 'rgba(0,0,0,0.3)'; e.target.style.background = 'transparent'; }}
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}