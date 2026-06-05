import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Taranjit Kang — Senior Full Stack Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, #0f2a4a, #070d18 60%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #2b9bf4, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 700,
            }}
          >
            TK
          </div>
          <div style={{ fontSize: '28px', color: '#9fb3c8' }}>tarnnn.com</div>
        </div>

        <div
          style={{
            fontSize: '84px',
            fontWeight: 800,
            lineHeight: 1.05,
            background: 'linear-gradient(120deg, #4db2ff, #a78bfa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Taranjit Kang
        </div>
        <div
          style={{
            fontSize: '40px',
            fontWeight: 600,
            marginTop: '16px',
            color: '#e6eef7',
          }}
        >
          Senior Full Stack Software Developer
        </div>
        <div
          style={{
            fontSize: '28px',
            marginTop: '28px',
            color: '#9fb3c8',
          }}
        >
          Java · Spring Boot · React · AWS · Microservices
        </div>
      </div>
    ),
    { ...size },
  );
}
