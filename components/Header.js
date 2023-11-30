import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import Head from 'next/head'
import Image from 'next/image'

const Header = () => (
  <header className="header" style={{ position: 'absolute', top: 0, zIndex: 1000 }}>
    <Head>
      <title>Sam Musso</title>
      <link rel="icon" href="/favicon.ico" />
      <script
        defer
        data-domain="smuser.space"
        src="https://plausible.io/js/script.js"
      ></script>

    </Head>
    <div className="header-container">
      <div className="header-image">
        <Image
          src="/images/headshot.jfif"
          alt="Headshot"
          width={50}
          height={50}
        />
      </div>
      <h1 className="title">
        SM Userspace {"</>"}
      </h1>
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
  </header>
);

export default Header;
