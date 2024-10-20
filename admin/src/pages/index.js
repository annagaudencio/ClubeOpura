import LoginForm from '../components/loginForm';

export default function Login() {
  return (

    <div className="h-screen flex flex-col space-y-4 items-center justify-center bg-textura">
      <div className='flex space-4 divide-x divide-white text-[var(--color-primaria)] justify-center w-full items-center'>
          <h5 className='pr-2 text-[16px] font-normal'>Clube ópura</h5>
          <h3 className='pl-2 text-[16px]'>adm</h3>
        </div>
      <LoginForm />
    </div>

    
  );
}