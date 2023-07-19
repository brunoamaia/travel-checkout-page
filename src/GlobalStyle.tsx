import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		font-weight: 400;
	}

	body {
		background-color: #bbb;
		color: #29292E;

		@media screen and (min-width: 1001px) {
			overflow: hidden;
		}
	}

	h1, h2, h3, h4, h5 {
		font-weight: 700;
	}

	h1 {
		font-size: 3.2em;
		line-height: 1.1;
	}

	h2 {
		font-size: 1.5em;
	}

	h3 {
		font-size: 1.4em;
	}

	h4 {
		font-size: 1.2em;
	}

	button {
		border-radius: 15px;
		padding: 0 15px;
		color: #FFF;
		border: 4px solid #08852e;
		background-color: #08852e;
		cursor: pointer;
		min-width: 100px;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		object-fit: cover;

		img {
			width: 100%;
			height: 100%;
			object-fit: fill;

			@media screen and (max-width: 600px) {
				width: 250%;
			}
		}

		@media screen and (max-width: 1400px) {
			width: 150%;
			max-height:700px;
		}

		@media screen and (max-width: 600px) {
			.content {
				flex-direction: column;
				margin: 0;
			}
		}
	}

`;
