import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faStackOverflow, faQuora, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import Image from 'next/image'

const Header = () => {

  return (
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
        <a
          id="github-link"
          href="https://github.com/smuser90"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          id="linkedin-link"
          href="https://linkedin.com/in/sammusso"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          id="x-link"
          href="https://x.com/SamMusso"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faXmark} />
        </a>
        <a
          id="instagram-link"
          href="https://www.instagram.com/sam__musso/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          id="quora-link"
          href="https://www.quora.com/profile/Sam-Musso-1"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faQuora} />
        </a>
        <a
          id="stackoverflow-link"
          href="https://stackoverflow.com/users/4312368/sam-musso"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FontAwesomeIcon icon={faStackOverflow} />
        </a>

      </div>
    </header>
  )
};

export default Header;
