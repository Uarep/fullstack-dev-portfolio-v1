import { useState } from 'react';
import axios from 'axios';

const MONO = "'JetBrains Mono', 'Fira Code', monospace";
const SANS = "'DM Sans', 'Helvetica Neue', sans-serif";

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Tools'];

export default function SkillForm() {
  const [skillName, setSkillName] = useState('');
  const [level, setLevel] = useState(5);
  const [category, setCategory] = useState('Frontend');
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await axios.post('http://localhost:3000/api/skills', {
        skill_name: skillName, level, category
      });
      setStatus('success');
      setSkillName('');
      setLevel(5);
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    fontFamily: SANS,
    fontSize: '14px',
    color: '#0f0f0f',
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.15)',
    borderRadius: '2px',
    padding: '12px 16px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  const labelStyle = {
    fontFamily: MONO,
    fontSize: '9px',
    color: 'rgba(0,0,0,0.4)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <div style={{ maxWidth: '560px' }}>
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
          NEW ENTRY
        </div>
        <h1 style={{
          fontFamily: SANS,
          fontSize: '32px',
          fontWeight: '600',
          color: '#0f0f0f',
          letterSpacing: '-0.03em',
        }}>
          Add Skill
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Skill Name */}
        <div>
          <label style={labelStyle}>Skill Name</label>
          <input
            type="text"
            required
            value={skillName}
            onChange={e => setSkillName(e.target.value)}
            placeholder="e.g. TypeScript"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#0f0f0f'}
            onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
          />
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  letterSpacing: '0.08em',
                  padding: '8px 16px',
                  border: '1px solid',
                  borderColor: category === cat ? '#0f0f0f' : 'rgba(0,0,0,0.12)',
                  background: category === cat ? '#0f0f0f' : 'transparent',
                  color: category === cat ? '#ffffff' : 'rgba(0,0,0,0.5)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  textTransform: 'uppercase',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Level Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label style={{ ...labelStyle, marginBottom: 0 }}>Proficiency Level</label>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{
                fontFamily: SANS,
                fontSize: '24px',
                fontWeight: '600',
                color: '#0f0f0f',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {level}
              </span>
              <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(0,0,0,0.3)' }}>/10</span>
            </div>
          </div>

          {/* Custom slider track visualization */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '1px',
                  background: i < level ? '#0f0f0f' : 'rgba(0,0,0,0.08)',
                  transition: 'background 0.1s',
                  cursor: 'pointer',
                }}
                onClick={() => setLevel(i + 1)}
              />
            ))}
          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={level}
            onChange={e => setLevel(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#0f0f0f', cursor: 'pointer' }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
          }}>
            {['Beginner', '', '', '', '', 'Intermediate', '', '', '', 'Expert'].map((l, i) => (
              <span key={i} style={{
                fontFamily: MONO,
                fontSize: '9px',
                color: 'rgba(0,0,0,0.25)',
                letterSpacing: '0.04em',
              }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            style={{
              fontFamily: MONO,
              fontSize: '11px',
              letterSpacing: '0.1em',
              padding: '14px 32px',
              background: submitting ? 'rgba(0,0,0,0.4)' : '#0f0f0f',
              color: '#c8f542',
              border: 'none',
              borderRadius: '2px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              textTransform: 'uppercase',
            }}
          >
            {submitting ? 'SAVING…' : 'SAVE ENTRY →'}
          </button>
        </div>

        {/* Status messages */}
        {status === 'success' && (
          <div style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: '#1a6b1a',
            letterSpacing: '0.06em',
            padding: '12px 16px',
            background: 'rgba(200,245,66,0.15)',
            borderLeft: '3px solid #c8f542',
            borderRadius: '2px',
          }}>
            ✓ ENTRY SAVED SUCCESSFULLY
          </div>
        )}
        {status === 'error' && (
          <div style={{
            fontFamily: MONO,
            fontSize: '11px',
            color: '#8b1a1a',
            letterSpacing: '0.06em',
            padding: '12px 16px',
            background: 'rgba(200,50,50,0.08)',
            borderLeft: '3px solid #cc3333',
            borderRadius: '2px',
          }}>
            ✗ CONNECTION ERROR — check backend
          </div>
        )}
      </form>
    </div>
  );
}