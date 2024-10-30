import Link from 'next/link';

export default function ParceirosCard({ numParceiros }) {
  return (
    <Link href="/parceiros" legacyBehavior>
      <div className="cards bg-[url('/midia/textura.svg')] bg-white/[12%] bg-cover backdrop-blur-xl w-full h-2/4 rounded-[32px] border border-white/[8%] p-8 flex-col justify-between items-between gap-3 inline-flex">
        <div className="min-h-20 flex justify-between items-center inline-flex">
          <img src="/midia/avatar.webp" className="w-16 rounded-full" alt="avatar de parceiros" />
          <h3 className="text-xl text-[var(--color-primaria)] w-1/2 uppercase text-right">Arquitetos Parceiros</h3>
        </div>
        <div className="min-h-20 flex justify-between items-center inline-flex">
          <h1 className="text-5xl text-[var(--color-cinza)]">{numParceiros}</h1>
          <div>
            {/* Botão para Adicionar Arquiteto */}
            <Link href="/addParceiro" legacyBehavior> 
              <a>
                <button className="bt-icon bt-marrom">
                  <svg fillRule="evenodd" className="w-6 h-6 text-[var(--color-primaria)] hover:text-[var(--color-link)]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13.0435 5.04348C13.0435 4.46718 12.5763 4 12 4C11.4237 4 10.9565 4.46718 10.9565 5.04348V10.9565H5.04348C4.46718 10.9565 4 11.4237 4 12C4 12.5763 4.46718 13.0435 5.04348 13.0435H10.9565V18.9565C10.9565 19.5328 11.4237 20 12 20C12.5763 20 13.0435 19.5328 13.0435 18.9565V13.0435H18.9565C19.5328 13.0435 20 12.5763 20 12C20 11.4237 19.5328 10.9565 18.9565 10.9565H13.0435V5.04348Z" fill="currentColor"/>
                  </svg>
                </button>
              </a>
            </Link>

            {/* Ir para a lista de Parceiros */}
            <a href="/parceiros">
              <button className="bt-icon bt-linha-clara">
                <svg fillRule="evenodd" className="w-6 h-6 text-[var(--color-primaria)]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M14.6066 3.5C14.7392 3.5 14.8664 3.55268 14.9602 3.64645L17.7886 6.47487C17.9838 6.67014 17.9838 6.98672 17.7886 7.18198L8.59619 16.3744C8.53337 16.4372 8.45495 16.4821 8.369 16.5046L4.54057 17.5046C4.36883 17.5494 4.18617 17.4999 4.06066 17.3744C3.93514 17.2489 3.88558 17.0662 3.93044 16.8945L4.93044 13.066C4.95289 12.9801 4.99784 12.9017 5.06066 12.8388L14.253 3.64645C14.3468 3.55268 14.474 3.5 14.6066 3.5Z" fill="currentColor"/>
                  <path d="M4 19.25C3.58579 19.25 3.25 19.5858 3.25 20C3.25 20.4142 3.58579 20.75 4 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20C19.75 19.5858 19.4142 19.25 19 19.25H4Z" fill="currentColor"/>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}