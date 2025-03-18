import { useTheme, useMediaQuery, Box, Grid, Container } from "@mui/material";
import Marquee from "react-fast-marquee";
import {
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  GitHub,
} from "@mui/icons-material";
import {
  TopBarContainer,
  IconText,
  IconStyled,
  LinkIcon,
  LinkIconContainer,
  HorizontalLine,
  StyledLink,
} from "./TopBar.styles.jsx";

export default function TopBar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%" }}>
      {isSmallScreen ? (
        // This version will show for "md" and below
        <TopBarContainer>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            gap={3}
          >
            <Marquee gradient={false} speed={50} pauseOnClick pauseOnHover>
              <Grid item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconText>
                    <IconStyled>
                      <LocationOnOutlined />
                    </IconStyled>
                    Sumacab Este Cabanatuan City
                    <IconStyled>
                      <PhoneOutlined />
                    </IconStyled>
                    <StyledLink to="tel:+359888888888">
                    +63 987 654 3210
                    </StyledLink>
                    <IconStyled>
                      <EmailOutlined />
                    </IconStyled>
                    <StyledLink to="mailto:rasautocare@gmail.com">
                      rasautocare@gmail.com
                    </StyledLink>
                  </IconText>
                </Box>
              </Grid>
              <Grid item>
                <LinkIconContainer>
                  <LinkIcon
                    to="https://github.com/stekatag/appointment-management-fe/"
                    target="_blank"
                  >
                    <GitHub />
                  </LinkIcon>
                </LinkIconContainer>
              </Grid>
            </Marquee>
          </Grid>
        </TopBarContainer>
      ) : (
        // This version will show for "md" and above
        <TopBarContainer>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <IconText>
                  <IconStyled>
                    <LocationOnOutlined />
                  </IconStyled>
                  Sumacab Este Cabanatuan City
                  <IconStyled>
                    <PhoneOutlined />
                  </IconStyled>
                  <StyledLink to="tel:+359888888888">
                    +63 987 654 3210
                  </StyledLink>
                  <IconStyled>
                    <EmailOutlined />
                  </IconStyled>
                  <StyledLink to="mailto:rasautocare@gmail.com">
                  rasautocare@gmail.com
                  </StyledLink>
                </IconText>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Container>
        </TopBarContainer>
      )}
      <HorizontalLine />
    </Box>
  );
}
