import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { store } from './store'
import { Provider } from 'react-redux'
import './index.css'
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_9B6c16qt6",
  client_id: "6motri9tdloufgqk81niar4rru",
  redirect_uri: "http://localhost:8080",
  response_type: "code",
  scope: "phone openid email",
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
)
