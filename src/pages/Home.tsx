import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Offers from "../components/Offers";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Partners />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Offers />
      </motion.div>
      <motion.div variants={itemVariants}>
        <About />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Testimonials />
      </motion.div>
    </motion.main>
  );
}
