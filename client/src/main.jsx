import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDom.createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
<BrowserRouter>
<App />
</BrowserRouter>
</QueryClientProvider>
)
