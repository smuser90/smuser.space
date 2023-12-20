import ParticlesComponent from "../../components/Particles";

export default function OpenSource() {
  const projects = [
    {
      name: "Alpine Test Harness",
      description: "A test harness for Alpine.js components",
      imageUrl: "/static/alpine-tester.png",
      link: "https://github.com/smuser90",
    },
    {
      name: "Mesh Viewer",
      description: "A simple mesh viewer",
      imageUrl: "/static/mesh-viewer.png",
      link: "https://github.com/smuser90",
    },
    {
      name: "QtWebEngine",
      description: "A QtWebEngine based browser",
      imageUrl: "/static/webengine-view.png",
      link: "https://github.com/smuser90",
    },
  ];
  return (
    <div className="container">
      <main>
        <div className="grid">
          {projects.map((post) => {
            return (
              <div className="card-large" key={post.name} onClick={() => window.open(post.link, '_blank')}>
                <h2>{post.name}</h2>
                <img className="post-image" src={post.imageUrl} />
                <p id="cta">&rarr;</p>
                <p>{post.description}</p>
              </div>
            );
          })}
        </div>
      </main>
      <ParticlesComponent />
    </div>
  );
}
