import { motion } from "framer-motion";
import styled from "@emotion/styled";

function Loading({ loading }) {
  if (loading) {
    return (
      <>
        <IconWrapper
          initial={{ rotate: 0 }}
          animate={{ rotate: 720 }}
          transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
        >
          <i id="loading-icon" className="fal fa-atom"></i>
        </IconWrapper>
      </>
    );
  }
  return "";
}

export default Loading;

const IconWrapper = styled(motion.div)`
  position: absolute;
  top: 12rem;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 5rem;
  color: rgb(97, 218, 251);
`;
