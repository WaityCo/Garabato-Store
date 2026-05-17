import Marquee from '../common/Marquee.jsx';

const MESSAGES = [
  'ENVÍO GRATIS DESDE $250.000',
  'DROP SS/26 DISPONIBLE AHORA',
  'CAMBIOS GRATIS EN 30 DÍAS',
  'PAGA EN CUOTAS SIN INTERESES',
];

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white border-b border-line">
      <div className="py-2.5">
        <Marquee items={MESSAGES} speed={45} />
      </div>
    </div>
  );
}
