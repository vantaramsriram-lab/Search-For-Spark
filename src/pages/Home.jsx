import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Opportunity from '../sections/Opportunity';
import Domains from '../sections/Domains';
import CtaBand from '../sections/CtaBand';

const TICKER = ['LOGIC', 'CURIOSITY', 'EXECUTION', 'ZERO EXPERIENCE REQUIRED', 'FIRST-YEAR BATCH', 'SEARCH FOR SPARK'];

export default function Home() {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // let the page paint first
      const t = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      }, 60);
      return () => clearTimeout(t);
    }
  }, [location.state, reduce]);

  return (
    <motion.main
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Hero />
      <Marquee items={TICKER} />
      <About />
      <Opportunity />
      <Domains />
      <CtaBand />
      <Footer />
    </motion.main>
  );
}
