import styled from "styled-components";

export const StyledRegister = styled.section`
	margin-left: calc(-50vw + 50%);
	margin-right: calc(-50vw + 50%);
	min-height: 100vh;
	padding: 32px 0;

	background-color: ${props => props.theme.grey100};

	h1 {
		margin-top: 0;
	}

	.register__wrapper {
		margin: 0 auto;
		max-width: 560px;
		padding: 32px;

		background-color: ${props => props.theme.white};
	}
`;

export default StyledRegister;
