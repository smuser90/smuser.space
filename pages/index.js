import Head from 'next/head'
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer
// Import additional languages if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter, faStackOverflow } from '@fortawesome/free-brands-svg-icons'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const bytesBotsBackyardBites = ["Bytes", "Bots", "Backyard Bites"]
  const descriptionStr = `{\n\t"topics": ${JSON.stringify(bytesBotsBackyardBites)}    \n}`
  return (
    <div className="container">
      <Head>
        <title>Bytes, Bots, and Backyard Bites</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          sm userspace
        </h1>

        <div className="description">
          <pre><code className="language-json">{descriptionStr}</code></pre>
        </div>

        <div className="social-icons">
          <a href="https://github.com/smuser90" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/sammusso" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://stackoverflow.com/users/4312368/sam-musso" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faStackOverflow} />
          </a>
        </div>

        <div className="grid">
          <a href="/projects" className="card">
            <h3>Projects &rarr;</h3>
          </a>

          <a href="/blog" className="card">
            <h3>Blog &rarr;</h3>
          </a>

          <a href="/about" className="card">
            <h3>About &rarr;</h3>
          </a>
        </div>
      </main>

      <footer>
        <footer>
          <p>© 2023 Sam "smuser" Musso.</p>
        </footer>
      </footer>

    </div>
  )
}
