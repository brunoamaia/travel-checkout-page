import styled from 'styled-components';

export const HomeContainer = styled.div`
	margin: 0 auto;
	background-color: rgba(255, 255, 255, 0.4);
	min-height: calc(100vh - 150px);

	width: 100vw;
	padding: 50px;
	margin: 0 auto;

	.content {
		display: flex;
		flex: 1;
		justify-content: space-between;
		margin: 0 auto;
		border: 2px solid #333;
		border-radius: 20px;
		background-color: rgba(100, 130, 200, 0.6);
	}

	@media screen and (max-width: 450px) {
		padding: 30px 20px;
	}

	@media screen and (max-width: 600px) {
		.content {
			flex-direction: column;
			margin: 0;
		}
	}

	@media screen and (min-width: 1001px) {
		.content {
			max-width: 950px;
		}
	}

	@media screen and (min-width: 1400px) {
		.content {
			max-width: 1300px;
		}
	}

	h4 {
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
	padding: 10px;

	@media screen and (max-width: 850px) {
		width: 50%;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

export const ResumeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 40%;
	border-left: 2px solid #333;
	padding: 10px;

	.validate-form {
		margin-top: 30px;
	}

	@media screen and (max-width: 850px) {
		width: 50%;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
		border-top: 2px solid #333;
		border-left: none;
	}
`;
