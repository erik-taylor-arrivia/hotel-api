import Styled from "@emotion/styled";

const SubmitButton = () => {
  return <SubmitBtn type="submit">SEARCH</SubmitBtn>;
};

export default SubmitButton;

const SubmitBtn = Styled.button`
  height: 50px;
  padding: 0.8rem;
  margin: 0.2rem;
`;
