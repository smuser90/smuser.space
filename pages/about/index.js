import { useRef, useEffect } from "react";
import ParticlesComponent from "../../components/Particles";

export default function About() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    let activeImage = 1;
    let lastImage = 0;
    let opacity = 1;
    let transitionDuration = 1.2;
    let steadyStateDuration = 5;
    let transitionStartTime = Date.now() + steadyStateDuration * 1000;

    const loadImages = [
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = "/static/sam-musso.jpg";
      }),
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = "/static/sam-solar.png";
      }),

      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = "/static/sam-slack.jpg";
      }),
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = "/static/sam-solar-slack.png";
      }),
    ];

    Promise.all(loadImages).then((loadedImages) => {
      const canvas = canvasRef.current;
      canvas.width = loadedImages[0].naturalWidth;
      canvas.height = loadedImages[0].naturalHeight;
      contextRef.current = canvas.getContext("2d");
      imagesRef.current = loadedImages;
    });

    const draw = () => {
      if (contextRef.current) {
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);

        if (transitionStartTime === null) {
          transitionStartTime = Date.now();
        }

        let timeElapsed = (Date.now() - transitionStartTime) / 1000;

        if (timeElapsed < transitionDuration) {
          opacity = 1 - Math.pow(0.944, (timeElapsed * 1000) / 25);
        } else if (timeElapsed < transitionDuration + steadyStateDuration) {
          opacity = 1;
        } else {
          transitionStartTime = Date.now();
          lastImage = activeImage;
          activeImage = (activeImage + 1) % loadImages.length;
          opacity = 0;
        }

        contextRef.current.globalAlpha = opacity;
        contextRef.current.drawImage(
          imagesRef.current[activeImage],
          0,
          0,
          canvas.width,
          canvas.height
        );

        contextRef.current.globalAlpha = 1 - opacity;
        contextRef.current.drawImage(
          imagesRef.current[lastImage],
          0,
          0,
          canvas.width,
          canvas.height
        );
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <main>
        <h1 className="title">About Sam Musso</h1>
        <div className="resume-download">
            <a href="/static/Sam_Musso_Resume.pdf" download>
            ⇓ Resume / CV
            </a>
          </div>
        <div className="bio-section">
          <canvas ref={canvasRef} id='about-canvas'/>
          <p>
            Hi there, I'm your host Sam Musso. I'm a software engineer,
            architect, polyglot, and tinkerer. Welcome to smuser space.
          </p>
          
          <h3>
            Why <em>'smuser'?</em>
          </h3>
          <p>
            I'm glad you asked! I really enjoy the culture of *nix computing.
            Tron is one of my favorites (not least because Sam Flynn) and in a
            similar style, <em>smuser</em> is just my initials & 'user'.
          </p>

          <h3>A bit of my background...</h3>

          <p>
            I studied Computer Engineering at the University of Pittsburgh. Upon
            graduation, I joined the team at Netronome Systems where I worked on
            testing ASICs for network appliances. These were used for advanced
            network intrusion detection as well as hardware-accelerated load
            balancing and routing. This role deepened my appreciation for the
            internet and the systems powering it, enhancing my knowledge in
            networking, Linux, and C programming.
          </p>
          <p>
            I then moved to Boulder, Colorado, to work for a small startup,
            Alpine Labs. Alpine, a crowdfunded startup, specialized in Bluetooth
            camera remotes for DSLR cameras. As the first full-time engineering
            hire, I contributed to a range of areas from firmware to mobile app
            development and website management, embodying the 'Full-Stack' role.
            My experience expanded into embedded systems development, board
            bringup, debugging in resource-constrained environments,
            Bluetooth/Bluetooth Low Energy, mobile development, and AngularJS
            web development, thanks to our app's reliance on Cordova and Ionic.
          </p>
          <p>
            After budget constraints at Alpine, I joined TAIT, a leader in live
            event production. There, I was part of a team developing a command
            and control application for the distributed system that runs the
            installation. This role taught me about safety-critical systems,
            distributed and quorum computing, and command & control paradigms.
          </p>
          <p>
            Post-TAIT, I transitioned to Amazon as a Software Development
            Engineer in the consumer electronics technologies group. My projects
            included early experimentation with Chatbots for pre-purchase
            customer support, federated search technologies, and various other
            revenue generating initiatives. Working here enhanced my skills in
            AWS, serverless computing, and dealing with true internet-scale.
          </p>
          <p>
            I'm currently working with a space robotics startup, Lunar Outpost.
            We're developing a robotics as a service platform for lunar
            exploration and beyond. My focus is on the ground station software,
            where I'm expanding my knowledge in Kubernetes, space exploration,
            and in-situ resource utilization.
          </p>
        </div>
      </main>
      <ParticlesComponent />
    </div>
  );
}
