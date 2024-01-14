import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from './components/TemplateParts/Header/Header.jsx'
import Footer from './components/TemplateParts/Footer/Footer.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <Header />
        <App />
        <Footer />
    </>
)
