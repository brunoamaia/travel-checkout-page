import { Fragment, MouseEvent, useEffect, useState } from 'react';
import AdultDataInput from '../../components/Form/AdultDataInput';
import TripDataInput from '../../components/Form/TripDataInput';
import PassengerControl from '../../components/Form/PassengerControl';
import { HomeContainer, PassengersContainer, ResumeContainer } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { validateFormData } from '../../helpers/forms/validateForm';

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
	adultInfo: AdultInfoProps[];
	placesInfo: PlacesInfoProps;
}

interface updatePeopleDataProps {
	data: AdultInfoProps;
	index: number;
}

interface updateLocationsDataProps {
	data: PlacesInfoProps;
}

interface ErrorStructureProps {
	field: string;
	info: string;
}

const defaultFormData = {
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
};

function Home() {
	const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
	const [numberOfChildren, setNumberOfChildren] = useState<number>(0);
	const [isValidForm, setIsValidForm] = useState<boolean>(false);
	const [hasError, setHasError] = useState<ErrorStructureProps[]>([]);
	const [travelData, setTravelData] = useState<TravelFormData>(defaultFormData);
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

	const handleSubmitForm = () => {
		console.log('Foi');
	};

	const resetStatus = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsValidForm(false);
	};

	useEffect(() => {
		if (isValidForm) {
			handleSubmitForm();
		}
	}, [isValidForm]);

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
						<button className="validate-form" onClick={(e) => resetStatus(e)}>Resetar</button>
						<button className="validate-form" onClick={(e) => validateFormData(e, travelData, setHasError, setIsValidForm)}>Validar os dados</button>
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
