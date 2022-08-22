import '../styles/globals.css'
import { Layout } from '../components'
import { ThenticContextProvider } from '../hooks/context'

function MyApp({ Component, pageProps }) {
  return (
    <ThenticContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThenticContextProvider>
  )
}

export default MyApp
