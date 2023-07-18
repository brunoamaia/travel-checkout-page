import styled from 'styled-components';

export const HomeContainer = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	margin: 0 auto;
	border: 1px solid #4A2;

	@media screen and (max-width: 1000px) {
		max-width: 900px;
	}

	@media screen and (min-width: 1001px) {
		max-width: 1000px;
	}

	h3 {
		font-size: 1.4em;
	}

	h4 {
		font-size: 1.2em;
		margin-left: 5px;
	}

	button:disabled {
		cursor: not-allowed;
		background-color: #666;
		border: 4px solid #666;
	}

	.label-input {
		display: flex;
		height: 30px;
		align-items: center;
		margin: 5px 0;

		label {
			min-width: 80px;
			text-align: end;
			padding: 0 2px;
		}
	}

	input {
		height: 30px;
		border-radius: 5px;
		border: none;
		padding-left: 5px;
		width: 100%;
		margin-right: 10px;
	}

	.error-message {
		color: #923;
	}

	.error-container {
		display: flex;
		justify-content: start;
		color: #923;
		
		width: 100%;
		padding: 0 10px;
		
		.error-field {
			margin-right: 5px;
		}
	}
`;

export const PassengersContainer = styled.div`
	width: 60%;
	border: 1px solid #723;
`;

export const ResumeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 40%;
	border: 1px solid #12a;

	.validate-form {
		margin-top: 30px;
	}
`;
