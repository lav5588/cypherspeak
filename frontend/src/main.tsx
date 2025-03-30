import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Provider } from 'react-redux'
import { store } from './redux-toolkit/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <div>
          <App />
        </div>
      </Provider>
    </ThemeProvider >
  </StrictMode>,
)
