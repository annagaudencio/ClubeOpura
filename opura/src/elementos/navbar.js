import React, { useState, useEffect } from 'react';
import Icon from './Icons';
import Popup from '../components/historico.js';
import PopupAjuda from '../components/ajuda.js';

import { logout } from '/services/auth';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Usar useEffect para definir o título inicial da página
  useEffect(() => {
    setPageTitle(document.title);
  }, []);

  const updatePageTitle = (title) => {
    setPageTitle(title);
    document.title = title;
  };

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const [isAjudaOpen, setIsAjudaOpen] = useState(false);

  //função de sair
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="flex">
      {/* Sidebar para Desktop */}
      <aside className="hidden md:flex flex-col items-start justify-between text-white w-64 h-screen p-[40px] fixed left-0 top-0">
        {/* Logotipo */}
        <a href='/dashboard'>
          <div className="logo-titulo flex flex-col items-start gap-[12px] mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="74" height="80" viewBox="0 0 74 80" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M23.424 5.52689L25.5864 3.33337H49.8068L47.6034 5.52689H23.424ZM58.9829 20.4455C28.3382 -10.1383 -18.8685 31.1651 14.6021 64.569C49.274 99.1693 90.2911 51.6914 58.9829 20.4455ZM15.7816 63.3946C-5.11329 42.5413 37.0669 0.92462 57.8062 21.6226C82.1576 45.9229 35.7946 83.3678 15.7816 63.3946Z" fill="#EEE5D3"/>
            </svg>
            <h4 className="titulo-nav">Clube Ópura</h4>
          </div>
        </a>

        {/* Links principais */}
        <nav className="flex flex-col p-4 bg-white/10 rounded-[32px] backdrop-blur-xl flex-col justify-center items-start inline-flex">
          <a href="/dashboard" className="link-nav flex items-center py-2 px-4 w-full text-left" onClick={() => updatePageTitle('Home')}>
            <Icon name="home" />
            Home
          </a>
          <a href="/beneficios" className="link-nav flex items-center py-2 px-4 w-full text-left" onClick={() => updatePageTitle('Benefícios')}>
            <Icon name="beneficios" />
            Benefícios
          </a>
          <a href="/perfil" className="link-nav flex items-center py-2 px-4 w-full text-left" onClick={() => updatePageTitle('Perfil')}>
            <Icon name="user" />
            Perfil
          </a>
        </nav>

        <div className="flex flex-col items-start w-full gap-2">
          <a href="sobre" className="link-nav-2 w-full text-left">Sobre</a>
          <a className="link-nav-2 w-full text-left" onClick={openPopup}>Histórico</a>
          <a onClick={() => setIsAjudaOpen(true)} className="link-nav-2 w-full text-left">Ajuda</a> 
          <a href="https://wa.me/5581992237827" target="_blank" className="link-nav-2 w-full text-left">Fale Conosco</a>
          
          <div className='pt-2'><a onClick={handleLogout} className="link-nav-2 w-full text-left cursor-pointer">Sair</a></div>
        </div>
      </aside>

      {/* Barra Superior para Mobile */}
      <header className="block md:hidden bg-[var(--color-bg-preto)] link-nav px-4 py-2 fixed w-full top-0 z-50 flex items-center justify-between">
        <a href='/dashboard'><Icon name="opura" className="w-6 h-6 mr-2" style={{ fill: 'var(--color-primaria)' }} /></a>
        <p className="titulo-nav">{pageTitle || 'Clube Ópura'}</p>
        <button size="normal" variant="iconOnly" onClick={toggleMenu} className="bt-menu">
          <Icon name="nav" />
        </button>
      </header>

      {/* Menu deslizante para links adicionais no Mobile */}
      <div className={`fixed bg-[var(--color-links)] text-white shadow-2xl inset-x-0 bottom-0 z-10 p-8 pt-[40px] pb-[120px] rounded-[32px] transform ${menuOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex flex-col justify-center h-full divide-y divide-[var(--color-primaria)] space-y-4">
          <p className='px-4 font-semibold uppercase leading-[18px] tracking-widest'>Clube Ópura</p>
          <div className='p-4 flex-col justify-center items-start gap-4 inline-flex'>
            <a href='sobre' className='links-menu-mob'>Sobre</a>
            <a className='links-menu-mob' onClick={openPopup}>Histórico de pontos</a>
            <a href='perfil' className='links-menu-mob'>Editar Perfil</a>
          </div>
          <div className='p-4 flex-col justify-center items-start gap-4 inline-flex'>
            <a onClick={() => setIsAjudaOpen(true)} className='links-menu-mob'>Ajuda</a>
            <a href='https://wa.me/5581992237827' target="_blank" className='links-menu-mob'>Fale Conosco</a>
          </div>
          <div className='p-4 flex-col justify-center items-start gap-4 inline-flex'>
            <a href='/' className='links-menu-mob'>Sair</a> 
          </div>
        </div>
      </div>

      {/* Links principais fixos na parte inferior para Mobile */}
      <nav className="nav-mob fixed bottom-0 left-0 right-0 z-10 md:hidden">
        <div className='flex nav-itens justify-around items-center'>
          <a href="/dashboard" className="flex flex-col items-center">
            <Icon name="home" />
            <span className="text-xs">Home</span>
          </a>
          <a href="/beneficios" className="flex flex-col items-center">
            <Icon name="beneficios" />
            <span className="text-xs">Benefícios</span>
          </a>
          <a href="/perfil" className="flex flex-col items-center">
            <Icon name="user" />
            <span className="text-xs">Perfil</span>
          </a>
        </div>
      </nav>

      <Popup isOpen={isOpen} onClose={closePopup}>
        <h2 className="text-2xl mb-4">Este é um popup!</h2>
        <p>Coloque o conteúdo que desejar aqui.</p>
        <button className="text-white bg-red-500 p-2 rounded-md mt-4" onClick={closePopup}>Fechar</button>
      </Popup>

      <PopupAjuda isOpen={isAjudaOpen} onClose={() => setIsAjudaOpen(false)} />
    </div>
  );
};

export default Navbar;
