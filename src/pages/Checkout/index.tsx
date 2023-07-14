import React, { useState } from 'react';
import { CheckoutContainer, PassengersContainer, ResumeContainer } from './styles';
import AdultDataInput from '../../components/Form/AdultDataInput';
import TripDataInput from '../../components/Form/TripDataInput';
import addPeopleIcon from '/user-plus.svg';
import removePeopleIcon from '/user-minus.svg';

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

interface PeopleCounts {
	[key: string]: (count: number) => number;
}

function Checkout() {
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

	const addOrRemovePeople = (event: React.MouseEvent<HTMLButtonElement>, type: string, operation: string) => {
		event.preventDefault();
		const operations: PeopleCounts = {
			add: (count) => count + 1,
			remove: (count) => count - 1,
		};
		
		if (type === 'adult') {
			setAdults((prevAdults) => operations[operation](prevAdults));
		} else {
			setChildren((prevChildren) => operations[operation](prevChildren));
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
		<form>
			<CheckoutContainer>
				<PassengersContainer>
					<div>
						<h3>Passageiros</h3>
						<p>dados</p>
						<div>
							<span>Adultos: {adults}</span>
							<button
								onClick={(event) => addOrRemovePeople(event, 'adult', 'remove')}
								disabled={adults <= 1 ? true : false}
							>
								<img src={removePeopleIcon} className="logo react" alt="React logo" />
							</button>
							<button
								onClick={(event) => addOrRemovePeople(event, 'adult', 'add')}
								disabled={adults >= 4 ? true : false}
							>
								<img src={addPeopleIcon} className="logo react" alt="React logo" />
							</button>
						</div>
						<div>
							<span>Crianças: {children}</span>
							<button
								onClick={(event) => addOrRemovePeople(event, 'children', 'remove')}
								disabled={children <= 0 ? true : false}
							>
								<img src={removePeopleIcon} className="logo react" alt="React logo" />
							</button>
							<button
								onClick={(event) => addOrRemovePeople(event, 'children', 'add')}
								disabled={children >= 4 ? true : false}
							>
								<img src={addPeopleIcon} className="logo react" alt="React logo" />
							</button>
						</div>
					</div>
					<h2>Quem são os passageiros?</h2>
					{showPeopleForm()}
				</PassengersContainer>
				<ResumeContainer>
					<TripDataInput/>
					<button onClick={validateData}>Validate Form</button>
				</ResumeContainer>
			</CheckoutContainer>
		</form>
	);
}

Checkout.displayName = 'pages/Checkout';

export default Checkout;
