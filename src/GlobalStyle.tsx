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

`;
