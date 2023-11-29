import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faTwitter, faStackOverflow } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const bytesBotsBackyardBites = ["Bytes", "Bots", "Backyard Bites"]
  const descriptionStr = `{\n\t"topics": ${JSON.stringify(bytesBotsBackyardBites)}\n}`
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

        <p className="description">
          <pre><code className="json">{descriptionStr}</code></pre>
        </p>

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

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #fff; /* Reverting to a light background */
          color: #333; /* Reverting to a standard text color */
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; /* Reverting to a standard font for titles */
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; /* Reverting to a standard font for descriptions */
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .social-icons {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .icon {
          padding: 0.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          text-decoration: none;
          color: inherit;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .icon:hover,
        .icon:focus,
        .icon:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
          gap: 1rem;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 30%; /* Increased from 45% to 30% to make cards wider */
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          box-shadow: 0 0 0 1px #eaeaea;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 800px) {
          .grid {
            grid-template-columns: 1fr; /* Change to single column layout */
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
