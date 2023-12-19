export default function About() {
  // Add styles to center the content on the page
  return (
    <div className="container" style={{ marginTop: "5vh" }}>
      <main
        style={{
          maxWidth: "60vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1 className="title">About Sam Musso</h1>
        <div className="bio-section">
          <p>
            I'm your host, Sam Musso. I'm a software engineer, a polyglot, and a
            tinkerer.
          </p>
          <img src="/static/sam-musso.jpg" alt="Sam Musso" id="img-bio" className="bio-image" />

          <p>
          I studied Computer Engineering at the University of Pittsburgh. Upon
          graduation, I joined the team at Netronome Systems, Inc., where I
          worked on testing ASICs for network appliances. These were used for
          advanced network intrusion detection as well as hardware-accelerated
          load balancing and routing. This role deepened my appreciation for the
          internet and the systems powering it, enhancing my knowledge in
          networking, Linux, and C programming.
        </p>
        <p>
          I then moved to Boulder, Colorado, to work for a small startup, Alpine
          Labs. Alpine, a crowdfunded startup, specialized in Bluetooth camera
          remotes for DSLR cameras. As the first full-time engineering hire, I
          contributed to a range of areas from firmware to mobile app
          development and website management, embodying the 'Full-Stack' role.
          My experience expanded into embedded systems development, board
          bringup, debugging in resource-constrained environments,
          Bluetooth/Bluetooth Low Energy, mobile development, and AngularJS web
          development, thanks to our app's reliance on Cordova and Ionic.
        </p>
        <p>
          After budget constraints at Alpine, I joined Tait Towers, Inc., a
          leader in live event production. There, I was part of a team
          developing a command and control application for the distributed
          system managing stage setups. This role taught me about
          safety-critical systems, distributed and quorum computing, and command
          & control paradigms.
        </p>
        <p>
          Post-TAIT, I transitioned to Amazon as a Software Development Engineer
          in the consumer electronics technologies group. My projects included
          early experimentation with Chatbots for pre-purchase customer support,
          federated search technologies, and various other initiatives. Working
          here enhanced my skills in AWS, serverless computing, and scaling
          solutions.
        </p>
        <p>
          I'm currently working with a space robotics startup, Lunar Outpost.
          We're developing a small rover for lunar exploration and beyond. My
          focus is on the ground station software to control it, where I'm
          expanding my knowledge in Kubernetes, space exploration, and in-situ
          resource extraction.
        </p>

        <p>
          <em>Why smuser?</em> I'm glad you asked. Its inspired by the hacker
          culture of the early unix days of computing. Tron is one of my
          favorites (not least because Sam Flynn) and in a similar style, smuser
          is just my initials & 'user'.
        </p>
        </div>
        
      </main>
    </div>
  );
}
