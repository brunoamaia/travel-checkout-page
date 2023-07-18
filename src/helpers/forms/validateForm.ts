import { Dispatch, MouseEvent, SetStateAction } from 'react';

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

interface TravelFormData {
	adultInfo: AdultInfoProps[];
	placesInfo: PlacesInfoProps;
}

interface ErrorProps {
	[key: string]: string[];
}

interface validateAdultDataProps {
	(
		adultData: AdultInfoProps[]
	): ErrorProps;
}

interface insertAdultErrorProps {
	(
		field: string,
		info: string
	): void;
}

const validateAdultData: validateAdultDataProps = (adultData) => {
	const adultErrors: ErrorProps = {};

	const insertError: insertAdultErrorProps = (field, info) => {
		if (!adultErrors[field]) {
			adultErrors[field] = [info];
		} else {
			adultErrors[field].push(info);
		}
	};

	for (let index = 0; index < adultData.length; index++) {
		const { name, cpf, email, phone } = adultData[index];
		const field = `people${index}`;

		if (name.length <= 7) {
			insertError(field, 'name');
		}

		if (cpf.length !== 14) {
			insertError(field, 'cpf');
		}

		if (phone.length !== 15) {
			insertError(field, 'phone');
		}

		if (email.length <= 10) {
			insertError(field, 'email');
		}
	}

	return adultErrors;
};

interface setTimestampDateProps {
	(
		date: number| string 
	): number;
}

const setTimestampDate: setTimestampDateProps = (date) => {
	if (typeof date === 'number') {
		return date;
	}
	
	const dateWitchHour = `${date} 14:00`;
	const newDate = new Date(dateWitchHour);

	return newDate.getTime();
};

interface validatePlacesDataProps {
	(
		placesData: {
			destiny: string;
			origin: string;
			startDate: number;
			endDate: number;
		}
	): ErrorProps;
}

const validatePlacesData: validatePlacesDataProps = (placesData) => {
	const { destiny, origin, endDate, startDate} = placesData;
	const errors: ErrorProps = {};
	const today = new Date();
	today.setHours(23, 59, 0, 0);
	const todayTimestamp = today.getTime();
	const startDateValid = startDate ? startDate : todayTimestamp;

	const validationRules = [
		{
			condition: !destiny.length,
			field: 'destiny',
			info: 'selectDestiny',
		},
		{
			condition: !origin,
			field: 'origin',
			info: 'selectOrigin',
		},
		{
			condition: origin && destiny && origin === destiny,
			field: 'destiny',
			info: 'otherDestiny',
		},
		{
			condition: !startDate,
			field: 'startDate',
			info: 'selectStartDate',
		},
		{
			condition: startDate && startDateValid <= todayTimestamp,
			field: 'startDate',
			info: 'selectFutureDate',
		},
		{
			condition: !endDate,
			field: 'endDate',
			info: 'selectEndDate',
		},
		{
			condition: endDate && endDate <= todayTimestamp,
			field: 'endDate',
			info: 'selectFutureDate',
		},
		{
			condition: endDate && endDate <= startDateValid,
			field: 'endDate',
			info: 'selectFutureEndDate',
		},
	];

	validationRules.forEach(({condition, field, info}) => {
		if (condition) {
			if (!errors[field]) {
				errors[field] = [info];
			} else {
				errors[field].push(info);
			}
		}
	});

	return errors;
};

interface ErrorArrayProps {
	[0]: string;
	[1]: string[];
}

interface validateFormDataProps {
	(
		event: MouseEvent<HTMLButtonElement>,
		travelData: TravelFormData,
		setHasError: Dispatch<SetStateAction<ErrorArrayProps[]>>,
		setTravelData: Dispatch<SetStateAction<TravelFormData>>,
		setIsValidForm: Dispatch<SetStateAction<boolean>>
	): void;
}

export const validateFormData:validateFormDataProps = (event, travelData, setHasError, setTravelData, setIsValidForm) => {
	const { adultInfo, placesInfo } = travelData;
	const { endDate, startDate } = placesInfo;
	const initialDate = startDate ? setTimestampDate(startDate) : 0;
	const finalDate = endDate ? setTimestampDate(endDate) : 0;
	const newPlacesInfo = {
		...placesInfo,
		startDate: initialDate,
		endDate: finalDate
	};
	const adultErrors = validateAdultData(adultInfo);
	const placesErrors = validatePlacesData(newPlacesInfo);
	let errors:ErrorProps = {};

	// Depois remover "preventDefault" para fazer a validação dos campos e não redirecionar
	event.preventDefault();

	errors = {...adultErrors, ...placesErrors};

	if(!Object.keys(errors).length ) {
		const placesData = {
			...placesInfo,
			endDate: finalDate,
			startDate: initialDate
		};
		setTravelData({
			...travelData,
			placesInfo: { ...placesData}
		});
		setIsValidForm(true);
	}

	setHasError(Object.entries(errors));
};
