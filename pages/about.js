import Head from 'next/head'

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>About Me - Bytes, Bots, and Backyards</title>
      </Head>

      <main>
        <h1 className="title">
          About Me
        </h1>

        <p className="description">
          Get to know more about my background and interests.
        </p>
      </main>
    </div>
  )
}
