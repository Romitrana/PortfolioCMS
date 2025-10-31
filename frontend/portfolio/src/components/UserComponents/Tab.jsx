import { motion } from "motion/react";
import CustomNavLink from "../UtilComponents/CustomNavLink"; // import the new component

export default function Tab({ type, url, d }) {
  return (
    <motion.li
      key={url}
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: d,
          duration: 0.5,
          ease: "easeOut",
        },
      }}
      style={{ cursor: "pointer" }}
    >
      <CustomNavLink type={type} url={url} />
    </motion.li>
  );
}
