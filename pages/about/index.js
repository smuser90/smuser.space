import { useRef, useState, useEffect } from "react";

export default function About() {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);


  useEffect(() => {
    const images = [new Image(), new Image()];

    images[0].src = "/static/sam-musso.jpg";
    images[1].src = "/static/sam-solar.png";

    images[0].onload = function () {
      const canvas = canvasRef.current;
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      setContext(canvas.getContext("2d"));
    };

    let activeImage = 0;
    let opacity = 1;
    let transitionDuration = 1.2; // transition duration in seconds
    let steadyStateDuration = 5; // steady state duration in second
    let transitionStartTime = null;
   
    const draw = () => {
      if (context) {
        const canvas = canvasRef.current;
        context.clearRect(0, 0, canvas.width, canvas.height);
   
        if (transitionStartTime === null) {
          transitionStartTime = Date.now();
        }
   
        let timeElapsed = (Date.now() - transitionStartTime) / 1000
    // convert to seconds
   
        if (timeElapsed < transitionDuration) {
          // we are in transition phase
          opacity = Math.pow(2, -10 * timeElapsed /
    transitionDuration);
        } else if (timeElapsed < transitionDuration +
    steadyStateDuration) {
          // we are in steady state phase
          opacity = 1;
        } else {
          // transition to the next image
          transitionStartTime = Date.now();
          activeImage = 1 - activeImage;
        }
   
        context.globalAlpha = opacity;
        context.drawImage(images[activeImage], 0, 0, canvas.width,
    canvas.height);
   
        context.globalAlpha = 1 - opacity;
        context.drawImage(
          images[1 - activeImage],
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
        <div className="bio-section">
          <canvas ref={canvasRef} className="bio-image"></canvas>

          <p>
            I'm your host, Sam Musso. I'm a software engineer, polyglot, and
            tinkerer.
          </p>

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

          <h3>
            <em>Why 'smuser'?</em>
          </h3>
          <p>
            I'm glad you asked. Its inspired by the hacker culture of the early
            unix days of computing. Tron is one of my favorites (not least
            because Sam Flynn) and in a similar style, smuser is just my
            initials & 'user'.
          </p>
        </div>
      </main>
    </div>
  );
}
