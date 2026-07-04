import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ZoomScroll from "@/components/ZoomScroll";
import Features from "@/components/Features";
import Sound from "@/components/Sound";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ColorProvider } from "@/components/ColorContext";
import { MotionConfig } from "framer-motion";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <ColorProvider>
        <Navbar />
        <main>
          <Hero />
          <ZoomScroll />
          <Features />
          <Sound />
          <Gallery />
          <Testimonials />
          <Pricing />
          <FAQ />
        </main>
        <Footer />
      </ColorProvider>
    </MotionConfig>
  );
}
