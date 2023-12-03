import Header from '../../components/Header'
import Footer from '../../components/Footer'


export default function Blog() {
  return (
    <div className="container">
      <Header />

      <main>
        <h1 className="title">
          Blog
        </h1>

        <p className="description">
          Check back soon for my latest posts!
        </p>
      </main>

      <Footer/>
    </div>
  )
}
