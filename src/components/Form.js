import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Form = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title>External API</Title>
      <SearchForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input required type="text" />
        <input required type="date" name="checkInDate" id="checkIn" />
        <input required type="date" name="checkOutDate" id="checkOut" />
        <button>SEARCH</button>
      </SearchForm>
    </motion.div>
  );
};

export default Form;

const Title = styled.h1`
  padding: 1rem;
`;

const SearchForm = styled.form`
  input {
    height: 50px;
    padding: 0.2rem;
    margin: 0.2rem;
  }
  button {
    height: 50px;
    padding: 0.8rem;
    margin: 0.2rem;
  }
`;
