import { Link } from "@mui/material";
import {
  HeroSectionContainer,
  ContentContainer,
  MainTitle,
  SubTitle,
  HeroButton,
} from "./HeroSection.styles";
import ScrollAnimation from "react-animate-on-scroll";

export default function HeroSection() {
  return (
    <HeroSectionContainer>
      <ContentContainer maxWidth="md">
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <MainTitle variant="h1" component="h1">
            RAS Autocare - Experience the traditional automotive service
          </MainTitle>
          <SubTitle variant="h3" component="h3">
            Professional care to maintain you vehicle's quality
          </SubTitle>
          <Link href="#booking-section" underline="none">
            <HeroButton variant="contained">Book Now</HeroButton>
          </Link>
        </ScrollAnimation>
      </ContentContainer>
    </HeroSectionContainer>
  );
}
