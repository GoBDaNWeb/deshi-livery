// * react
import {Route, Routes} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'

// * styles
import './scss/app.scss'

// * components
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        },
    }
})

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='/pizza/:id' element={<FullPizza/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
