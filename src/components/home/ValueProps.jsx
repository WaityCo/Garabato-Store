import { Truck, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react';

const VALUES = [
  { Icon: Truck,       title: 'Envío gratis',         body: 'Sobre $250.000 en Colombia.' },
  { Icon: RefreshCw,   title: 'Cambios en 30 días',    body: 'Sin preguntas raras.' },
  { Icon: ShieldCheck, title: 'Calidad garantizada',   body: 'Costuras, gramajes, prints.' },
  { Icon: CreditCard,  title: 'Paga en cuotas',        body: 'Hasta 12 sin intereses.' },
];

export default function ValueProps() {
  return (
    <section className="border-y border-line">
      <ul className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
        {VALUES.map(({ Icon, title, body }) => (
          <li key={title} className="px-5 lg:px-8 py-8 lg:py-10 flex items-start gap-4">
            <Icon size={24} className="text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="text-sm font-medium tracking-wide">{title}</h4>
              <p className="text-xs text-soft mt-1">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
