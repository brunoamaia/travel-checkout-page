import React, { Fragment, useState } from 'react';
import AdultDataInput from '../../components/Form/AdultDataInput';
import TripDataInput from '../../components/Form/TripDataInput';
import PassengerControl from '../../components/Form/PassengerControl';
import { HomeContainer, PassengersContainer, ResumeContainer } from './styles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface PeopleFormData {
	email: string;
	cpf: string;
	name: string;
	phone: string;
}

interface TripFormData {
	origin: string;
	destiny: string;
	startDate: string;
	endDate: string;
}

interface updatePeopleData {
	data: PeopleFormData
	index: number
}

function Home() {
	const [peopleData, setPeopleData] = useState<PeopleFormData[]>([]);
	const [tripData, setTripData] = useState<TripFormData>({
		origin: '', destiny: '', startDate: '', endDate: ''
	});
	const [adults, setAdults] = useState<number>(1);
	const [children, setChildren] = useState<number>(0);
	const [isFormValid, setIsFormValid] = useState<boolean>(true);

	const validateData = (event: React.MouseEvent<HTMLButtonElement>) => {
		let isValid = false;

		// Depois remover "preventDefault" para fazer a validação dos campos e não redirecionar
		event.preventDefault();
	
		if (peopleData.length === 0) {
			isValid = false;
		}

		// Realizar a validação real do formulário
		setIsFormValid(isValid);

		console.log(peopleData);
	
		if (isValid) {
			console.log('Formulário válido');
			console.log(peopleData);
		} else {
			console.log('Formulário inválido');
		}
	};

	const updatePeopleData = ({data, index}: updatePeopleData) => {
		const newData = [...peopleData];
		
		newData[index] = data;

		setPeopleData(newData);
		console.log(newData);
		console.log(tripData);
	};

	const showPeopleForm = () => {
		return (
			Array.from({ length: adults }, (_, index) => (
				<AdultDataInput key={index} index={index} type={'Adulto'} updateData={updatePeopleData} />
			))
		);
	};

	return (
		<Fragment>
			<Header/>
			<form>
				<HomeContainer>
					<PassengersContainer>
						<PassengerControl
							adults={adults}
							children={children}
							setAdults={setAdults}
							setChildren={setChildren}
						/>
						<h3>Quem são os adultos?</h3>
						{showPeopleForm()}
					</PassengersContainer>
					<ResumeContainer>
						<TripDataInput/>
						<button className="validate-form" onClick={validateData}>Validar os dados</button>
					</ResumeContainer>
				</HomeContainer>
			</form>
			<Footer/>
		</Fragment>
	);
}

Home.displayName = 'pages/Home';

export default Home;
