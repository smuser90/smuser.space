import Head from 'next/head'
import { useRouter } from 'next/router'
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer
// Import additional languages if needed
import Header from '../components/Header'

import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const bytesBotsBackyardBites = ["Bytes", "Bots", "Backyard Bites"]
  const descriptionStr = `{\n\t"topics": ${JSON.stringify(bytesBotsBackyardBites)}    \n}`
  return (
    <div className="container">
      <Head>
        <title>Sam Musso's Userspace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <div className="description">

          <pre><code className="language-json">{descriptionStr}</code></pre>
        </div>
        <div className="grid">
          <div className="card" onClick={() => router.push('/projects')}>
            <h3>Projects &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/blog')}>
            <h3>Blog &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/about')}>
            <h3>About &rarr;</h3>
          </div>
        </div>

      </main>

      <footer>
          <p>© 2023 Sam "smuser" Musso.</p>
      </footer>

    </div>
  )
}
