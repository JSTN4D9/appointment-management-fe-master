import { Container, Grid, Typography } from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import {
  FooterContainer,
  FooterLink,
  FooterTitle,
  FooterSection,
  FooterBottom,
  FooterIconContainer,
} from "./Footer.styles";

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <FooterTitle>OPENING HOURS</FooterTitle>
            <FooterSection>
              <Typography variant="body2">Sunday: Closed</Typography>
              <Typography variant="body2">
                Monday - Saturday: 7:00 - 19:00
              </Typography>
            </FooterSection>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>SERVICES</FooterTitle>
            <FooterLink>Vehicle Health Check</FooterLink>
            <FooterLink>Engine Diagnostics</FooterLink>
            <FooterLink>Brake Inspection</FooterLink>
            <FooterLink>Oil And Filter Change</FooterLink>
            <FooterLink>Tire Rotation</FooterLink>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>ADDITIONAL LINKS</FooterTitle>
            <FooterLink>About us</FooterLink>
            <FooterLink>Terms and conditions</FooterLink>
            <FooterLink>Privacy policy</FooterLink>
          </Grid>

          <Grid item xs={12} md={3}>
            <FooterTitle>NEWS</FooterTitle>
          </Grid>

          
        </Grid>
      </Container>
      <FooterBottom>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <LocationOn />
                <Typography variant="body2">
                Sumacab Este Cabanatuan City
                </Typography>
              </FooterIconContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <Phone />
                <FooterLink to="tel:+359888888888">+63 987 654 3210</FooterLink>
              </FooterIconContainer>
            </Grid>
            <Grid item xs={12} md={4}>
              <FooterIconContainer>
                <Email />
                <FooterLink to="mailto:rasautocare@gmail.com">
                  rasautocare@gmail.com
                </FooterLink>
              </FooterIconContainer>
            </Grid>
          </Grid>
        </Container>
      </FooterBottom>
    </FooterContainer>
  );
}
