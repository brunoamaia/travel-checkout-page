import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import NoMatch from './pages/NoMatch';

const Router = () => {
	return(
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
