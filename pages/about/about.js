import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function About() {
  return (
    <div className="container">
      <Header />

      <main>
        <h1 className="title">
          About Me
        </h1>

        <p className="description">
          Get to know more about my background and interests.
        </p>
      </main>

      <Footer/>
    </div>
  )
}
