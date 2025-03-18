import StaffsSection from "../sections/StaffsSection/StaffsSection";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent/BreadcrumbsComponent";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ReviewsSection from "../sections/ReviewsSection/ReviewsSection";
import BookNowCTASection from "../sections/BookNowCTASection/BookNowCTASection";
import theme from "../styles/theme";

export default function Staffs() {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      <ReviewsSection />
      <BookNowCTASection backgroundColor={theme.palette.background.custom} />
      <Footer />
    </>
  );
}
