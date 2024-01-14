import "../themes/dark-theme.css"; // Import the dark theme styles
import "../styles/app.sass"; // Import the new SASS styles
import { ThemeProvider } from "next-themes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const path = (/#!(\/.*)$/.exec(router.asPath) || [])[1];
  if (path) {
    router.replace(path);

    return (
      <ThemeProvider attribute="class">
        <Header />
        <div className="container" />
        <Footer />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
