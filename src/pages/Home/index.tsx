import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdultDataInput from '../../components/Form/AdultDataInput';
import TripDataInput from '../../components/Form/TripDataInput';
import PassengerControl from '../../components/Form/PassengerControl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateFormData } from '../../helpers/forms/validateForm';
import terms from '../../helpers/terms';
import { HomeContainer, PassengersContainer, ResumeContainer } from './styles';
import backgroundImg from '/background.jpg';

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
	children: number;
}

interface TravelFormData {
	adultInfo: AdultInfoProps[];
	placesInfo: PlacesInfoProps;
	quantityPeople: QuantityPeopleProps;
}

interface updatePeopleDataProps {
	data: AdultInfoProps;
	index: number;
}

interface updateLocationsDataProps {
	data: PlacesInfoProps;
}

interface updateQuantityPeopleDataProps {
	data: {
		adult: number;
		children: number;
	}
}

interface ErrorArrayProps {
	[0]: string;
	[1]: string[];
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

function Home() {
	const navigate = useNavigate();
	const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
	const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [isRedirect, setIsRedirect] = useState<boolean>(false);
	const [hasError, setHasError] = useState<ErrorArrayProps[]>([]);
	const [travelData, setTravelData] = useState<TravelFormData>(defaultFormData);
	
	const updatePeopleData = ({data, index}: updatePeopleDataProps) => {
		const { adultInfo, placesInfo, quantityPeople } = travelData;
		const newData = [...adultInfo];
		
		newData[index] = data;

		setTravelData({
			adultInfo: newData,
			placesInfo,
			quantityPeople
		});
	};

	const updateQuantityPeopleData = ({data}: updateQuantityPeopleDataProps) => {
		setTravelData({
			...travelData,
			quantityPeople: {...data}
		});
	};

	const updateLocationsData = ({data}: updateLocationsDataProps) => {
		const { adultInfo, quantityPeople } = travelData;

		setTravelData({
			adultInfo: adultInfo,
			placesInfo: {...data},
			quantityPeople
		});
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const resizeAdultsDataArray = () => {
		const { adultInfo, placesInfo, quantityPeople } = travelData;
		const newAdultInfo = [...adultInfo];
		
		if (adultInfo.length > numberOfAdults) {
			newAdultInfo.pop();

			setTravelData({
				adultInfo: newAdultInfo,
				placesInfo,
				quantityPeople
			});
		} else if (adultInfo.length < numberOfAdults) {
			newAdultInfo.push(defaultFormData.adultInfo[0]);

			setTravelData({
				adultInfo: newAdultInfo,
				placesInfo,
				quantityPeople
			});
		}
	};

	const handleSubmitForm = () => {
		window.localStorage.setItem('fakeRequest', JSON.stringify(travelData));
		setIsRedirect(true);
	};
	
	const handleRedirectPage = () => {
		navigate('/checkout');
	};

	useEffect(() => {
		if (isValidForm && !isRedirect) {
			handleSubmitForm();
		}

		if (travelData.adultInfo.length !== numberOfAdults) {
			resizeAdultsDataArray();
		}
		
		if (isRedirect) {
			handleRedirectPage();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRedirect, isValidForm, numberOfAdults, travelData]);

	return (
		<Fragment>
			<Header/>
			<form>
				<HomeContainer>
					<div className="content">
						<PassengersContainer>
							<PassengerControl
								adults={numberOfAdults}
								children={numberOfChildren}
								setAdults={setNumberOfAdults}
								setChildren={setNumberOfChildren}
								updateData={updateQuantityPeopleData}
							/>
							<h3>Quem são os adultos?</h3>
							{
								Array.from({ length: numberOfAdults }, (_, index) => (
									<AdultDataInput key={index} index={index} type={'Adulto'} updateData={updatePeopleData} />
								))
							}
						</PassengersContainer>
						<ResumeContainer>
							<TripDataInput updateLocationsData={updateLocationsData} />
							<button
								className="validate-form" 
								onClick={(e) => validateFormData(e, travelData, setHasError, setTravelData, setIsValidForm)}
							>
							Validar os dados
							</button>
							{hasError.length > 0 && <h4 className='error-message'>Corrija os seguintes campos</h4>}
							{hasError.map ((errorInfo, index) => {
								const code = String(errorInfo[0]);

								return (
									<div key={index} className="error-container">
										<p className="error-field">{terms[code]}</p>
										<div className="error-info">
											{ errorInfo[1].map ((error, index) => (
												<p key={index}>{terms[error]}</p>
											))}
										</div>
									</div>
								);
							})}
						</ResumeContainer>
					</div>
					
				</HomeContainer>
			</form>
			<Footer/>
			<div className="background">
				<img src={backgroundImg} className="logo react" alt="Imagem de plano de fundo mostrando uma praia" />
			</div>
		</Fragment>
	);
}

Home.displayName = 'pages/Home';

export default Home;
