import { motion } from "framer-motion";
import Styled from "@emotion/styled";

function Loading({ loading }) {
  if (loading) {
    return (
      <IconWrapper
        initial={{ rotate: 0 }}
        animate={{ rotate: 720 }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 2 }}
      >
        <i id="loading-icon" className="fal fa-atom"></i>
      </IconWrapper>
    );
  }
  return "";
}

export default Loading;

const IconWrapper = Styled(motion.div)`
position: absolute;
top: 25%;
left: 46.5%;
font-size: 5rem;
color: rgb(97, 218, 251);`;
