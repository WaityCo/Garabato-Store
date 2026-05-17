import { clsx } from 'clsx';

export default function Marquee({
  items = [],
  speed = 30,
  className,
  separator = '✦',
}) {
  const content = items.length ? items : ['GARABATO'];
  const loop = [...content, ...content, ...content, ...content];

  return (
    <div className={clsx('overflow-hidden whitespace-nowrap select-none', className)}>
      <div
        className="inline-flex items-center gap-8 animate-marquee will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 text-sm tracking-[0.18em] uppercase font-display">
            {item}
            <span aria-hidden className="text-soft text-xs">{separator}</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
