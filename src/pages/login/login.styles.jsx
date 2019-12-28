import styled from "styled-components";

export const StyledLogin = styled.section`
  min-height: 100vh;
  padding: 32px 0;

  background-color: ${props => props.theme.grey100};

  h1 {
    margin-top: 0;
  }

  .login__wrapper {
    margin: 0 auto;
    max-width: 560px;
    padding: 32px;

    background-color: ${props => props.theme.white};
  }
`;

export default StyledLogin;
