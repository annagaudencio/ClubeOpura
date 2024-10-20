import '../styles/globals.css'
import '../styles/botoes.css'
import '../styles/input.css'
import '../styles/busca.css'
import '../styles/cards.css'
import '../styles/navbar.css'
import AuthLayout from '../components/auth-layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthLayout>
      <Component {...pageProps} />
    </AuthLayout>
  );
}

export default MyApp;


// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
  
// }

// export default MyApp;