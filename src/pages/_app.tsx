import ModalProvider from '@/context/ModalContext';
import ModalContainer from '@/modal-container';
import { store } from '@/store';
import '@/styles/globals.css';
import WindowWrapper from '@/window-wrapper';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WindowWrapper>
        <ModalContainer />
        <ModalProvider selector='modal'>
          <Component {...pageProps} />
        </ModalProvider>
      </WindowWrapper>
    </Provider>
  );
}
