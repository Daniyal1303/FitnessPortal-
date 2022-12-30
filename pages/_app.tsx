import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react';
import  NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress  
        color="#32D" 
        startPosition={0.5} 
        stopDelayMs={200} 
        height={4} 
        showOnShallow={true}/>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
