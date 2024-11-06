import "../styles/globals.css";
import "../styles/opura.css";
import "../styles/botoes.css";
import "../styles/busca.css";
import "../styles/cards.css"
import "../styles/input.css"
import "../styles/navbar.css"
import "../styles/usuario.css";
import { UserProvider } from '/services/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
  
}

export default MyApp;
