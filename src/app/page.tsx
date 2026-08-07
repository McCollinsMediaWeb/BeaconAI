import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TheGap from "@/components/TheGap";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Proof from "@/components/Proof";
import WhyBeacon from "@/components/WhyBeacon";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TheGap />
        <Services />
        <HowItWorks />
        <Proof />
        <WhyBeacon />
      </main>
      <Footer />
    </div>
  );
}
