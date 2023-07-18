import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckoutContainer } from './styles';

interface AdultInfoProps {
	email: string;
	cpf: string;
	name: string;
	phone: string;
}

interface PlacesInfoProps {
	destiny: string;
	origin: string;
	startDate: string | number;
	endDate: string | number;
}

interface QuantityPeopleProps {
	adult: number;
	children: number
}

interface TravelFormData {
	adultInfo: AdultInfoProps[];
	placesInfo: PlacesInfoProps;
	quantityPeople: QuantityPeopleProps;
}

const defaultFormData:TravelFormData = {
	adultInfo: [{
		email: '',
		cpf: '',
		name: '',
		phone: '',
	}],
	placesInfo: {
		destiny: '',
		origin: '',
		startDate: '',
		endDate: ''
	},
	quantityPeople: {
		adult: 1,
		children: 0
	}
};
function Checkout() {
	const [travelData, setTravelData] = useState<TravelFormData>(defaultFormData);
	
	const getFakeRequestData = () => {
		const storageData = window.localStorage.getItem('fakeRequest');

		if (storageData) {
			setTravelData(JSON.parse(storageData) as TravelFormData);

			console.log(travelData);
			// window.localStorage.removeItem('fakeRequest');
		}
	};

	const renderQuantityPeople = () => {
		const {quantityPeople} = travelData;
		const {adult, children} = quantityPeople;

		return (
			<div className="places-info">
				<div className="place-label">
					<h3>Quantidade de pessoas: {adult + children}</h3>
				</div>
				<div className="data-key">
					<p className="field">Quantidade de adultos:</p>
					<p className="info">{adult}</p>
				</div>
				<div className="data-key">
					<p className="field">Quantidade de crianças:</p>
					<p className="info">{children}</p>
				</div>
			</div>
		);
	};

	const renderPeopleData = () => {
		const {adultInfo} = travelData;

		return (
			<div className="adult-info">
				<h3>Dados dos adultos</h3>
				{adultInfo.map(({cpf, email, name, phone}, index) => (
					<div key={index} className="map">
						<div className="people-index">
							<h4>Adulto {index}:</h4>
						</div>
						<div className="data-key">
							<p className="field">Nome:</p>
							<p className="info">{name}</p>
						</div>
						<div className="data-key">
							<p className="field">CPF:</p>
							<p className="info">{cpf}</p>
						</div>
						<div className="data-key">
							<p className="field">Telefone:</p>
							<p className="info">{phone}</p>
						</div>
						<div className="data-key">
							<p className="field">Email:</p>
							<p className="info">{email}</p>
						</div>
					</div>
				))}
			</div>
		);
	};

	const renderPlacesData = () => {
		const {placesInfo} = travelData;
		const {destiny, origin, endDate, startDate} = placesInfo;

		return (
			<div className="places-info">
				<div className="place-label">
					<h3>Dados do roteiro</h3>
				</div>
				<div className="data-key">
					<p className="field">Origem:</p>
					<p className="info">{origin}</p>
				</div>
				<div className="data-key">
					<p className="field">Destino:</p>
					<p className="info">{destiny}</p>
				</div>
				<div className="data-key">
					<p className="field">Data da saída (timestamp):</p>
					<p className="info">{startDate}</p>
				</div>
				<div className="data-key">
					<p className="field">Data da volta (timestamp):</p>
					<p className="info">{endDate}</p>
				</div>
			</div>
		);
	};

	const renderDataInHtml = () => {
		return (
			<div className="data">
				{renderQuantityPeople()}
				{renderPeopleData()}
				{renderPlacesData()}
			</div>	
		);
	};
	
	useEffect(() => {
		getFakeRequestData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return(
		<Fragment>
			<Header/>
			<CheckoutContainer>
				<h2>Página para mostrar os dados armazenados</h2>
				<div className="card">
					{travelData.placesInfo.destiny !== '' && renderDataInHtml()}
				</div>
				<button>
					<Link to="/">Voltar para o cadastro</Link>
				</button>
			</CheckoutContainer>
			<Footer/>
		</Fragment>
	);
}

Checkout.displayName = 'pages/Checkout';

export default Checkout;
