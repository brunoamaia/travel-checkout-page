import { MouseEvent } from 'react';

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

interface ErrorProps {
	[key: string]: string[];
}

interface validateAdultDataProps {
	(
		adultData: AdultInfoProps[]
	): ErrorProps;
}

const validateAdultData: validateAdultDataProps = (adultData) => {
	const propertiesToValidate: Record<string, number> = {
		name: 6,
		cpf: 9,
		email: 12,
		phone: 12,
	};
	const adultErrors: ErrorProps = {};

	for (let index = 0; index < adultData.length; index++) {
		const adult = adultData[index];

		for (const property in propertiesToValidate) {
			if (property in propertiesToValidate) {
				const maxLength = propertiesToValidate[property];
				const value = adult[property as keyof AdultInfoProps];
				const field = `people${index}`;

				if (value.length <= maxLength) {
					if (!adultErrors[field]) {
						adultErrors[field] = [property];
					} else {
						adultErrors[field].push(property);
					}
				}
			}
		}
	}

	return adultErrors;
};

interface setTimestampDateProps {
	(
		stringData: string
	): number
}

const setTimestampDate: setTimestampDateProps = (stringData) => {
	const dateWitchHour = `${stringData} 14:00`;
	const newDate = new Date(dateWitchHour);

	return newDate.getTime();
};

interface validatePlacesDataProps {
	(
		placesData: {
			destiny: string;
			origin: string;
			startDate: number | null;
			endDate: number | null;
		}
	): ErrorProps
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
		setHasError: React.Dispatch<React.SetStateAction<ErrorArrayProps[]>>,
		setIsValidForm: React.Dispatch<React.SetStateAction<boolean>>
	): void;
}

export const validateFormData:validateFormDataProps = (event, travelData, setHasError, setIsValidForm) => {
	const { adultInfo, placesInfo } = travelData;
	const { endDate, startDate } = placesInfo;
	const initialDate = startDate ? setTimestampDate(startDate) : null;
	const finalDate = endDate ? setTimestampDate(endDate) : null;
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
		setIsValidForm(true);
	}

	setHasError(Object.entries(errors));
};
