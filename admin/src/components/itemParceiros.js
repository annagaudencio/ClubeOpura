import React from 'react';
import Link from 'next/link';
import Icon from '../elementos/Icons';

const InscritoItem = ({ name, id, points }) => {
  return (
    <Link href={`/parceiro/${id}`} legacyBehavior>
      <a className="block px-4 py-3 vidro rounded-2xl border border-white/10 justify-between items-center gap-3 inline-flex hover:bg-[var(--color-links)] transition-all w-full">
        <div>
          <p className="text-white text-lg font-normal font-['Work Sans'] leading-snug">{name}</p>
          <p className="text-[#eee5d3] text-sm font-normal font-['Work Sans'] leading-[16.80px] tracking-tight">Pontos: {points}</p>
        </div>
        <span className="text-2xl text-[var(--color-secundaria)]"><Icon name="caretRight" /></span>
      </a>
    </Link>
  );
};

export default InscritoItem;