import styled from "styled-components";

export const StyledAccount = styled.section`
	margin-left: calc(-50vw + 50%);
	margin-right: calc(-50vw + 50%);
	min-height: 100vh;
	padding: 32px 0;

	background-color: ${props => props.theme.grey100};

	h1 {
		margin-top: 0;
	}

	.account__header {
		display: flex;
	}

	.account__header__actions {
		margin-left: auto;

		> * + * {
			margin-left: 24px;
		}
	}

	.account__ids {
		align-items: center;
		display: flex;
		padding: 24px 0;

		border: 1px solid ${props => props.theme.grey100};
		border-left: none;
		border-right: none;

		> * {
			margin-bottom: 0;
			margin-top: 0;
		}
	}

	.account__email {
		margin-left: auto;

		font-size: 14px;
		letter-spacing: 1px;
		text-transform: uppercase;
	}

	.account__wrapper {
		margin: 0 auto;
		max-width: 1000px;
		padding: 32px;

		background-color: ${props => props.theme.white};
	}
`;

export default StyledAccount;
