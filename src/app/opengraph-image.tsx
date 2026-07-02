import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0e17',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px',
        fontFamily: 'monospace',
        position: 'relative',
      }}
    >
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08,
        backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{ color: '#00ff41', fontSize: 22, marginBottom: 20, letterSpacing: 2 }}>
        $ whoami
      </div>
      <div style={{ color: '#ffffff', fontSize: 76, fontWeight: 700, marginBottom: 16, lineHeight: 1.1 }}>
        Sri Ram Mannam
      </div>
      <div style={{ color: '#00ffff', fontSize: 28, marginBottom: 40, letterSpacing: 1 }}>
        Software Engineer · Distributed Systems · Cloud · SDN
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {['8-service microservices', 'RAG pipelines', 'Autonomous trading', 'SDN'].map((tag) => (
          <div key={tag} style={{
            background: 'rgba(0,255,255,0.08)',
            border: '1px solid rgba(0,255,255,0.3)',
            borderRadius: 8,
            padding: '8px 16px',
            color: '#00ffff',
            fontSize: 16,
          }}>
            {tag}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 60, right: 80, color: '#4a5568', fontSize: 20 }}>
        srirammannam.dev
      </div>
    </div>
  );
}
