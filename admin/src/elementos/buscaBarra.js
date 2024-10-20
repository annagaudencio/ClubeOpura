import { useState } from 'react';
import Link from 'next/link';

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      // Filtra os dados para correspondência de nome (ajuste conforme a estrutura de seus dados)
      const filteredData = data.filter((item) =>
        item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults([]);
    }
  };

  return (
    <div className="search-container">
      <div className="relative flex items-center mb-4">
        <img
          src="/icons/nav/busca.svg"
          alt="Ícone de Busca"
          className="absolute m-4 w-6 h-6 text-[var(--color-links)]"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar usuários..."
          className="search-input"
        />
      </div>

      <div className="relative">
      <div className="search-results absolute z-50 w-full">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <div key={index} className="result-item vidro">
              <Link href={`/parceiro/${result.id}`} className='text-[var(--color-background)] hover:text-[var(--color-secundaria)]'>
                <p>{result.name}</p>
                {result.points && <p className='text-sm'>{result.points} pontos</p>}
              </Link>
            </div>
          ))
        ) : (
          searchTerm && <p className="p-2 text-center result-item bg-white/5 backdrop-blur text-[var(--color-primaria)]">Nenhum resultado encontrado.</p>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default SearchBar;