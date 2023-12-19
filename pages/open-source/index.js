import ParticlesComponent from "../../components/Particles";

export default function OpenSource() {
  return (
    <div className="container">
      <h1 className="title">Open Source</h1>
      <main>
        <div className="grid">
          <div className="card">
            <h3>Alpine Test Harness &rarr;</h3>
          </div>

          <div className="card">
            <h3>Mesh Viewer&rarr;</h3>
          </div>

          <div className="card">
            <h3>QtWebEngine&rarr;</h3>
          </div>
        </div>
      </main>
      <ParticlesComponent />
    </div>
  );
}
