import { Dispatch, MouseEvent, SetStateAction} from 'react';
import { PassengerControlContainer } from './styles';
import addPeopleIcon from '/user-plus.svg';
import removePeopleIcon from '/user-minus.svg';

interface updatePeopleData {
	data: {
		adult: number;
		children: number;
	};
}

interface PassengerControlProps {
	adults: number
	children: number
	setAdults: Dispatch<SetStateAction<number>>
	setChildren: Dispatch<SetStateAction<number>>
	updateData: ({data}: updatePeopleData) => void;

}

function PassengerControl({adults, children, setAdults, setChildren, updateData}: PassengerControlProps) {
	const addOrRemovePeople = (event: MouseEvent<HTMLButtonElement>, type: string, operation: string) => {
		let adultQuantity = adults;
		let childQuantity = children;

		event.preventDefault();
		
		if (type === 'adult') {
			if (operation === 'add') {
				adultQuantity += 1;
				setAdults(adultQuantity);
			} else {
				adultQuantity -= 1;
				setAdults(adultQuantity);
			}
		} else if (type === 'children') {
			if (operation === 'add') {
				childQuantity += 1;
				setChildren(childQuantity);
			} else {
				childQuantity -= 1;
				setChildren(childQuantity);
			}
		}

		updateData({ 
			data: {
				adult: adultQuantity,
				children: childQuantity
			}
		});
	};

	return (
		<PassengerControlContainer>
			<h3>Informações das pessoas</h3>
			<h4>Quantidade</h4>
			<div className='quantity-control'>
				<p>Adultos: {adults}</p>
				<button
					className='btn-minus'
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
			<div className='quantity-control'>
				<p>Crianças: {children}</p>
				<button
					className='btn-minus'
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
		</PassengerControlContainer>
	);
}

PassengerControl.displayName = 'components/Form/PassengerControl';

export default PassengerControl;
