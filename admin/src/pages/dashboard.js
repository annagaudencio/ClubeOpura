import { useState, useEffect } from 'react';
import Head from "next/head";
import Navbar from "../components/navbar";
import SearchBar from "../elementos/buscaBarra";
import axios from 'axios';

import ParceirosCard from '../components/cardParceiros';
import BeneficiosCard from '../components/cardBeneficios';

export default function Dashboard() {
  const [numParceiros, setNumParceiros] = useState(0);
  const [users, setUsers] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('access_token');
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const loadData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          
          const [usersResponse, benefitsResponse] = await Promise.all([
            axios.get('/api/users', config),
            axios.get('/api/benefits', config)
          ]);
  
          setUsers(usersResponse.data);
          setBenefits(benefitsResponse.data);
  
          const nonAdminUsers = usersResponse.data.filter(user => !user.is_adm);
          setNumParceiros(nonAdminUsers.length);
        } catch (error) {
          console.error('Erro ao carregar os dados:', error);
          setError("Falha ao carregar os dados. Por favor, tente novamente.");
        }
      };
  
      loadData();
    }
  }, [token]);
  

  const searchData = [...users, ...benefits];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Navbar />

      <div className="main-content md:p-2 overflow-clip">
        <div className="conteudo p-4">
          <div className="w-full h-1/6 md:justify-between md:items-center md:inline-flex">
            <div className="w-full md:w-1/2 justify-center md:justify-start items-center inline-flex">
              <h1 className="text-4xl text-[var(--color-secundaria)]">Olá Ópura</h1>
            </div>
            <div className="w-full md:w-1/2 text-[var(--color-texto)]">
              <SearchBar data={searchData} />
            </div>
          </div>

          {/* Cards */}
          <div className="h-5/6 flex flex-col justify-start items-start gap-3.5 pb-32 md:pb-4">
            <ParceirosCard numParceiros={numParceiros} />
            <BeneficiosCard />
          </div>
        </div>
      </div>
    </>
  );
}