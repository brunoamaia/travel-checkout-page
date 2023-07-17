import React, { Fragment, useState } from 'react';
import AdultDataInput from '../../components/Form/AdultDataInput';
import TripDataInput from '../../components/Form/TripDataInput';
import PassengerControl from '../../components/Form/PassengerControl';
import { HomeContainer, PassengersContainer, ResumeContainer } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface AdultInfoProps {
	email: string;
	cpf: string;
	name: string;
	phone: string;
}

interface PlacesInfoProps {
	destiny: string;
	origin: string;
	startDate: string;
	endDate: string;
}

interface TravelFormData {
	adultInfo: AdultInfoProps[]
	placesInfo: PlacesInfoProps;
}

interface updatePeopleDataProps {
	data: AdultInfoProps;
	index: number;
}

interface updateLocationsDataProps {
	data: PlacesInfoProps
}

interface ErrorStructureProps {
	field: string;
	info: string;
}

function Home() {
	const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
	const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
	const [isValidForm, setIsValidForm] = useState<boolean>(true);
	const [hasError, setHasError] = useState<ErrorStructureProps[]>([]);
	const [travelData, setTravelData] = useState<TravelFormData>({
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
		}
	});

	const validateData = (event: React.MouseEvent<HTMLButtonElement>) => {
		let isValid = false;

		// Depois remover "preventDefault" para fazer a validação dos campos e não redirecionar
		event.preventDefault();
	
		if (travelData.adultInfo.length === 0) {
			isValid = false;
		}

		// Realizar a validação real do formulário
		setIsValidForm(isValid);

		console.log(travelData);
	
		if (isValid) {
			console.log('Formulário válido');
			console.log(travelData);
		} else {
			console.log('Formulário inválido');
		}
	};

	const updatePeopleData = ({data, index}: updatePeopleDataProps) => {
		const { adultInfo, placesInfo } = travelData;
		const newData = [...adultInfo];
		
		newData[index] = data;

		setTravelData({
			adultInfo: newData,
			placesInfo,
		});
	};

	const updateLocationsData = ({data}: updateLocationsDataProps) => {
		const { adultInfo } = travelData;

		setTravelData({
			adultInfo: adultInfo,
			placesInfo: {...data}
		});
	};

	return (
		<Fragment>
			<Header/>
			<form>
				<HomeContainer>
					<PassengersContainer>
						<PassengerControl
							adults={numberOfAdults}
							children={numberOfChildren}
							setAdults={setNumberOfAdults}
							setChildren={setNumberOfChildren}
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
						<button className="validate-form" onClick={validateData}>Validar os dados</button>
						{hasError.map (({ field, info }, index) => (
							<div key={index} className="error">
								<p>{field}</p>
								<span>{info}</span>
							</div>
						))}
					</ResumeContainer>
				</HomeContainer>
			</form>
			<Footer/>
		</Fragment>
	);
}

Home.displayName = 'pages/Home';

export default Home;
