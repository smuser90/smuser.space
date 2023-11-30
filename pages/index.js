import { useRouter } from 'next/router'
import Script from 'next/script'
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer
// Import additional languages if needed
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../particles'

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
      <Header />

      <main>
        <div className="description">

          <pre><code className="language-json">{descriptionStr}</code></pre>
        </div>

        <div className="grid">
          <div className="card" onClick={() => router.push('/open-source/open-source')}>
            <h3>Open Source &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/blog/blog')}>
            <h3>Thoughts &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/blog')}>
            <h3>Work &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/blog')}>
            <h3>Projects &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/about')}>
            <h3>About &rarr;</h3>
          </div>

          <div className="card" onClick={() => router.push('/about')}>
            <h3>Contact &rarr;</h3>
          </div>
        </div>

      </main>


<Footer />
<Script src="https://plausible.io/js/script.js" strategy="lazyOnload" />

    </div>
  )
}
