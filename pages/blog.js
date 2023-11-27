import Head from 'next/head'

export default function Blog() {
  return (
    <div className="container">
      <Head>
        <title>Blog - Bytes, Bots, and Backyards</title>
      </Head>

      <main>
        <h1 className="title">
          Blog
        </h1>

        <p className="description">
          Check back soon for my latest posts!
        </p>
      </main>
    </div>
  )
}
