import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <html lang="en" />
        <meta charset="utf-8" />
        <title>Web title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="favicon.ico" />
        

        <meta name="title" content="Waves example" />
        <meta
          name="description"
          content="Description website"
        />
   

      
      </Head>

      <Component {...pageProps} />
    </div>);
}

export default MyApp