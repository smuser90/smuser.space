import { useRouter } from "next/router";
import Script from "next/script";
import Prism from "prismjs";
import "prismjs/components/prism-json"; // Import the JSON language component
import "prismjs/themes/prism-tomorrow.css"; // Choose the theme you prefer
// Import additional languages if needed
import ParticlesComponent from "../components/Particles";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const bytesBotsBackyardBites = ["Bytes", "Bots", "Backyard Bites"];
  const descriptionStr = `{\n\t"topics": ${JSON.stringify(
    bytesBotsBackyardBites
  )}    \n}`;
  return (
    <div className="container">
      <main>
        <div className="main-content">
          <div className="description">
            <pre>
              <code className="language-json">{descriptionStr}</code>
            </pre>
          </div>

          <div className="grid">
            <div className="card-small" onClick={() => router.push("/blog")}>
              <h3>Thoughts</h3>
              <p id="cta">&rarr;</p>
            </div>

            <div className="card-small" onClick={() => router.push("/about")}>
              <h3>About</h3>
              <p id="cta">&rarr;</p>
            </div>

            <div
              className="card-small"
              onClick={() => router.push("/open-source")}
            >
              <h3>Open Source</h3>
              <p id="cta">&rarr;</p>
            </div>
          </div>
          <div className="resume-download">
            <a href="/static/Sam_Musso_Resume.pdf" download>
            ⇓ Resume / CV
            </a>
          </div>
        </div>
      </main>

      <ParticlesComponent />

      <Script src="https://plausible.io/js/script.js" strategy="lazyOnload" />
    </div>
  );
}
