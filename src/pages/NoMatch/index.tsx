import { Link, useLocation } from 'react-router-dom';

function NoMatch() {
	const location = useLocation();
	const urlName = location.pathname.substring(1);

	return (
		<div>
			<p>
				A página <b style={{color: 'darkgreen'}} >{ urlName }</b> não foi encontrada!
			</p>
			<span>
				Volte para o <Link to={'/'}>início</Link>
			</span>
		</div>
	);
}

NoMatch.displayName = 'pages/NoMatch';

export default NoMatch;
