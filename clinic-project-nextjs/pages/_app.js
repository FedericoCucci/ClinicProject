import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { MoralisProvider } from 'react-moralis'
import { NotificationProvider } from 'web3uikit'
export default function App({ Component, pageProps }) {
  return (
    <NotificationProvider>
  <MoralisProvider initializeOnMount={false}>
  <Component {...pageProps} />
  </MoralisProvider>
  </NotificationProvider>)
}
