import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Taranjit Kang — Senior Full Stack Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Golden-hour meadow, echoing the site's hero.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background:
            'linear-gradient(180deg, #5f3558 0%, #a85a64 42%, #f0a872 78%, #f6c08a 100%)',
          color: '#fff6ec',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Sun */}
        <div
          style={{
            position: 'absolute',
            left: 790,
            top: 300,
            width: 120,
            height: 120,
            borderRadius: 999,
            background: '#fff0cf',
            boxShadow: '0 0 120px 60px rgba(255, 157, 79, 0.65)',
          }}
        />
        {/* Hills + lone tree */}
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          <path
            d="M0 470 C 220 430, 420 455, 640 420 C 820 392, 980 330, 1200 360 L1200 630 L0 630 Z"
            fill="#55561f"
          />
          <path
            d="M0 520 C 260 480, 520 520, 760 490 C 960 466, 1080 470, 1200 455 L1200 630 L0 630 Z"
            fill="#2f3210"
          />
          <rect x="884" y="300" width="14" height="70" fill="#1d160f" />
          <circle cx="891" cy="270" r="58" fill="#1d1b10" />
          <circle cx="850" cy="292" r="40" fill="#1d1b10" />
          <circle cx="934" cy="290" r="42" fill="#1d1b10" />
        </svg>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '72px 80px',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              fontSize: '26px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 246, 236, 0.85)',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ffb35c, #f27a8e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '0',
                color: '#2a1520',
              }}
            >
              TK
            </div>
            tarnnn.com
          </div>
          <div
            style={{
              fontSize: '104px',
              fontWeight: 300,
              lineHeight: 1,
              marginTop: '64px',
              letterSpacing: '-0.03em',
            }}
          >
            Taranjit Kang
          </div>
          <div
            style={{
              fontSize: '34px',
              marginTop: '20px',
              color: 'rgba(255, 246, 236, 0.9)',
            }}
          >
            Senior Full Stack Software Developer
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
