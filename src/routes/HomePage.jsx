import StaffsSection from "../sections/StaffsSection/StaffsSection";
import BookAppointmentSection from "../sections/BookAppointmentSection/BookAppointmentSection";
import BookNowCTASection from "../sections/BookNowCTASection/BookNowCTASection";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HeroSection from "../sections/HeroSection/HeroSection";
import ServicesSection from "../sections/ServicesSection/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <BookNowCTASection />
      <ServicesSection />
      <BookAppointmentSection />
      <Footer />
    </>
  );
}
