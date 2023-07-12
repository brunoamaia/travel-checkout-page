import Counter from '../../components/Counter';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';

function Home() {
	return(
		<>
			<Header/>
			<div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<Counter /> 
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
		Click on the Vite and React logos to learn more
			</p>
			<Footer/>
		</>
	);
}

Home.displayName = 'pages/Home';

export default Home;
