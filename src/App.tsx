import { Fragment } from 'react';
import Router from './routes';
import { GlobalStyle } from './GlobalStyle';

function App() {
	return (
		<Fragment>
			<GlobalStyle/>
			<Router />
		</Fragment>
	);
}

export default App;
