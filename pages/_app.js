import '../themes/dark-theme.css' // Import the dark theme styles
import '../styles/app.sass' // Import the new SASS styles
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
