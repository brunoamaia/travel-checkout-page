import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Fragment } from 'react';
import { CheckoutContainer } from './styles';

function Checkout() {
	return(
		<Fragment>
			<Header/>
			<CheckoutContainer>
				<div className="card">
					<Link to="/">Voltar para o cadastro</Link>
					<p>
					Página para mostrar os dados armazenados
					</p>
				</div>
			</CheckoutContainer>
			<Footer/>
		</Fragment>
	);
}

Checkout.displayName = 'pages/Checkout';

export default Checkout;
