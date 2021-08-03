import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const Advice = () => {
  const [advice, setAdvice] = useState("");
  useEffect(() => {
    const url = "https://api.adviceslip.com/advice";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setAdvice(json.slip.advice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      >
        <Title>Random Advice</Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      >
        <Wrapper>
          <Paragraph>{advice}</Paragraph>
        </Wrapper>
      </motion.div>
    </div>
  );
};

export default Advice;

const Title = styled.h2`
  padding: 1em;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 50%;
`;

const Paragraph = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
