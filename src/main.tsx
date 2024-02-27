import './index.css';
import { PublicClientApplication } from '@azure/msal-browser';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { msalConfig } from './auth/config';

export const msalInstance = new PublicClientApplication(msalConfig);

const rootElement = document.getElementById('app')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App msalInstance={msalInstance} />
    </StrictMode>,
  );
}
