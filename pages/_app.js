import "../themes/dark-theme.css"; // Import the dark theme styles
import "../styles/app.sass"; // Import the new SASS styles
import { ThemeProvider } from "next-themes";
import Footer from '../components/Footer'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
              <Header />

        <Component {...pageProps} />
  <Footer />        
    </ThemeProvider>
  );
}

export default MyApp;
