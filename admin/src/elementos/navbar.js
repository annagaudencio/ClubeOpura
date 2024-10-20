import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icon from '../elementos/Icons'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setPageTitle(document.title);
  }, []);

  const updatePageTitle = (title) => {
    setPageTitle(title);
    document.title = title;
  };

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <div className="flex">
      {/* Sidebar para Desktop */}
      <aside className="hidden md:flex flex-col items-start justify-between text-white w-64 h-screen p-[40px] fixed left-0 top-0">
        {/* Logotipo */}
        <Link href='/dashboard'>
          <div className="logo-titulo flex flex-col items-start gap-[12px] mb-8">
            <img src="/icons/nav/opura.svg" alt="Logo Ópura" className="w-12 h-12" />
            <h4 className="titulo-nav">Clube Ópura</h4>
            <h4 className="titulo-nav">ADM</h4>
          </div>
        </Link>

        {/* Links principais */}
        <nav className="flex flex-col p-4 bg-[var(--color-branco-40)] rounded-[32px] backdrop-blur-xl flex-col justify-center items-start inline-flex">
          <Link href="/dashboard" className={`link-nav flex items-center py-2 px-4 w-full text-left ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => updatePageTitle('Home')}>
            <img src="/icons/nav/home.svg" alt="Home" className="w-6 h-6 mr-2" />
            Home
          </Link>
          <Link href="/parceiros" className={`link-nav flex items-center py-2 px-4 w-full text-left ${isActive('/parceiros') ? 'active' : ''}`} onClick={() => updatePageTitle('parceiros')}>
            <img src="/icons/nav/user.svg" alt="Parceiros" className="w-6 h-6 mr-2" />
            Parceiros
          </Link>
          <Link href="/beneficios" className={`link-nav flex items-center py-2 px-4 w-full text-left ${isActive('/beneficios') ? 'active' : ''}`} onClick={() => updatePageTitle('Benefícios')}>
            <img src="/icons/nav/beneficios.svg" alt="Benefícios" className="w-6 h-6 mr-2" />
            Benefícios
          </Link>
        </nav>
      </aside>

      {/* Barra Superior para Mobile */}
      <header className="bg-[var(--color-background)] link-nav px-4 py-2 fixed w-full h-20 top-0 z-50 flex items-center justify-between md:hidden">
        <Link href='/dashboard'><img src="/icons/nav/opura.svg" alt="Logo" className="w-6 h-6 mr-2" /></Link>
        <p className="titulo-nav">{pageTitle || 'Clube Ópura'}</p>
        <a href="mailto:clubeopura@gmail.com">
          <Icon name="email" className="w-6 h-6 text-[var(--color-texto)]" />
        </a>
      </header>

      {/* Links principais fixos na parte inferior para Mobile */}
      <nav className="nav-mob fixed bottom-0 left-0 right-0 z-10">
        <div className='flex nav-itens justify-around items-center md:hidden'>
          <Link href="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard') ? 'active' : ''}`} onClick={() => updatePageTitle('dashboard')}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7215 4.13612C13.7391 3.1215 12.1119 3.1215 11.1295 4.13611L6.33099 9.09185C6.05541 9.37646 5.87022 9.73627 5.79877 10.1259C5.21601 13.3039 5.17299 16.5574 5.67153 19.7496L5.84803 20.8798C5.90378 21.2368 6.21124 21.5 6.57255 21.5H9.92551C10.2017 21.5 10.4255 21.2761 10.4255 21V14H15.4255V21C15.4255 21.2761 15.6494 21.5 15.9255 21.5H19.2784C19.6397 21.5 19.9472 21.2368 20.0029 20.8798L20.1794 19.7496C20.678 16.5574 20.635 13.3039 20.0522 10.1259C19.9807 9.73627 19.7956 9.37646 19.52 9.09185L14.7215 4.13612Z" fill="currentColor"/>
          </svg>

            <span className="text-xs">Home</span>
          </Link>

          <Link href="/parceiros" className={`flex flex-col items-center ${isActive('/parceiros') ? 'active' : ''}`} onClick={() => updatePageTitle('parceiros')}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9255 3.75C10.8545 3.75 9.17554 5.42893 9.17554 7.5C9.17554 9.57107 10.8545 11.25 12.9255 11.25C14.9966 11.25 16.6755 9.57107 16.6755 7.5C16.6755 5.42893 14.9966 3.75 12.9255 3.75Z" fill="currentColor"/>
          <path d="M8.92554 13.25C6.85447 13.25 5.17554 14.9289 5.17554 17V18.1883C5.17554 18.9415 5.72142 19.5837 6.46481 19.7051C10.7436 20.4037 15.1074 20.4037 19.3863 19.7051C20.1297 19.5837 20.6755 18.9415 20.6755 18.1883V17C20.6755 14.9289 18.9966 13.25 16.9255 13.25H16.5847C16.4002 13.25 16.2168 13.2792 16.0415 13.3364L15.176 13.6191C13.7137 14.0965 12.1374 14.0965 10.6751 13.6191L9.80961 13.3364C9.63423 13.2792 9.4509 13.25 9.26641 13.25H8.92554Z" fill="currentColor"/>
          </svg>

            <span className="text-xs">Parceiros</span>
          </Link>

          <Link href="/beneficios" className={`flex flex-col items-center ${isActive('/beneficios') ? 'active' : ''}`} onClick={() => updatePageTitle('Benefícios')}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.17554 5.5C7.17554 3.70507 8.63061 2.25 10.4255 2.25C11.4308 2.25 12.3294 2.70637 12.9255 3.42322C13.5217 2.70637 14.4203 2.25 15.4255 2.25C17.2205 2.25 18.6755 3.70507 18.6755 5.5C18.6755 6.25426 18.4186 6.94852 17.9875 7.5H18.9255C20.3062 7.5 21.4255 8.61929 21.4255 10V11.25C21.4255 11.6642 21.0898 12 20.6755 12H13.9755C13.8099 12 13.6755 11.8657 13.6755 11.7V8.23909C13.3926 8.05794 13.1396 7.83415 12.9255 7.57678C12.7115 7.83415 12.4585 8.05794 12.1755 8.23909V11.7C12.1755 11.8657 12.0412 12 11.8755 12H5.17554C4.76132 12 4.42554 11.6642 4.42554 11.25V10C4.42554 8.61929 5.54483 7.5 6.92554 7.5H7.86362C7.43248 6.94852 7.17554 6.25426 7.17554 5.5ZM12.1755 5.5C12.1755 4.5335 11.392 3.75 10.4255 3.75C9.45904 3.75 8.67554 4.5335 8.67554 5.5C8.67554 6.4665 9.45904 7.25 10.4255 7.25C11.392 7.25 12.1755 6.4665 12.1755 5.5ZM13.6755 5.5C13.6755 6.4665 14.459 7.25 15.4255 7.25C16.392 7.25 17.1755 6.4665 17.1755 5.5C17.1755 4.5335 16.392 3.75 15.4255 3.75C14.459 3.75 13.6755 4.5335 13.6755 5.5Z" fill="currentColor"/>
          <path d="M12.1755 13.65C12.1755 13.4843 12.0412 13.35 11.8755 13.35H6.57455C6.1689 13.35 5.82226 13.6423 5.75375 14.0421C5.5317 15.3379 5.5317 16.6621 5.75375 17.9579L5.97806 19.2669C6.1291 20.1483 6.84494 20.8235 7.73366 20.9229L8.79878 21.0419C9.81969 21.156 10.8441 21.2276 11.8695 21.2568C12.0375 21.2616 12.1755 21.1262 12.1755 20.9581L12.1755 13.65Z" fill="currentColor"/>
          <path d="M13.9816 21.2568C13.8136 21.2616 13.6755 21.1262 13.6755 20.9581L13.6755 13.65C13.6755 13.4843 13.8099 13.35 13.9755 13.35H19.2765C19.6822 13.35 20.0288 13.6423 20.0973 14.0421C20.3194 15.3379 20.3194 16.6621 20.0973 17.9579L19.873 19.2669C19.722 20.1483 19.0061 20.8235 18.1174 20.9229L17.0523 21.0419C16.0314 21.156 15.0069 21.2276 13.9816 21.2568Z" fill="currentColor"/>
          </svg>

            <span className="text-xs">Benefícios</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;