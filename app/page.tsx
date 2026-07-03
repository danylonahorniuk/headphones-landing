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

export default function Home() {
  return (
    <>
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
    </>
  );
}
