
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// SmartWaste Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// SmartWaste Dashboard React example components
import PageLayout from "examples/LayoutContainers/PageLayout";


// SmartWaste Dashboard React theme functions
import colors from "assets/theme/base/colors";

// SmartWaste Dashboard React theme functions
import tripleLinearGradient from "assets/theme/functions/tripleLinearGradient";

export default function CoverLayout({
  color,
  header,
  title,
  description,
  motto,
  premotto,
  image,
  top,
  cardContent,
  children,
}) {
  const { gradients } = colors;
  return (
    <PageLayout
      background={tripleLinearGradient(
        gradients.cover.main,
        gradients.cover.state,
        gradients.cover.stateSecondary,
        gradients.cover.angle
      )}
    >
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <VuiBox
          width="50vw"
          height="100vh"
          display={{ xs: "none", md: "block" }}
          top={0}
          left={0}
          sx={({ breakpoints }) => ({
            overflow: "hidden",
            [breakpoints.down("xl")]: {
              mr: "100px",
            },
            [breakpoints.down("lg")]: {
              display: "none",
            },
          })}
          zIndex={0}
        >
          <VuiBox
            height="100%"
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <VuiTypography
              textAlign={cardContent ? "center" : "start"}
              variant="subtitle1"
              fontWeight="medium"
              color="white"
              mb="10px"
              sx={{ mb: 1, letterSpacing: "8px" }}
            >
              {premotto}
            </VuiTypography>
            <VuiTypography
              textAlign={cardContent ? "center" : "start"}
              variant="h2"
              fontWeight="bold"
              color="logo"
              mb="10px"
              textGradient
              sx={{ letterSpacing: "8px" }}
            >
              {motto}
            </VuiTypography>
          </VuiBox>
        </VuiBox>

        <VuiBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "75vh",
            margin: "0 auto",
          }}
        >
          <VuiBox
            mt={top}
            ml="auto !important"
            sx={({ breakpoints }) => ({
              [breakpoints.down("xl")]: {
                mr: cardContent ? "50px" : "100px",
              },
              [breakpoints.down("lg")]: {
                mr: "auto",
                ml: "auto !important",
              },
              [breakpoints.down("md")]: {
                maxWidth: "90%",
                pr: "7px",
                pl: "10px !important",
              },
            })}
          >
            <VuiBox pt={3} px={3} mx="auto !important" maxWidth={cardContent ? "400px" : "350px"}>
              {!header ? (
                <VuiBox mb="35px">
                  <VuiTypography
                    textAlign={cardContent ? "center" : "start"}
                    variant="h3"
                    fontWeight="bold"
                    color={color}
                  >
                    {title}
                  </VuiTypography>
                  <VuiTypography
                    textAlign={cardContent ? "center !important" : "start !important"}
                    mx="auto"
                    sx={({ typography: { size }, functions: { pxToRem } }) => ({
                      fontWeight: "regular",
                      fontSize: size.sm,
                    })}
                    color="white"
                  >
                    {description}
                  </VuiTypography>
                </VuiBox>
              ) : (
                header
              )}
            </VuiBox>

            <VuiBox
              px={3}
              mb="30px"
              mx="auto"
              ml="auto !important"
              width="30vw"
              sx={({ breakpoints }) => ({
                mt: cardContent ? "0px" : { top },
                maxWidth: cardContent ? "550px" : "450px",
                [breakpoints.down("xl")]: {
                  mr: cardContent ? "0px" : "100px",
                },
                [breakpoints.only("lg")]: {
                  mr: "auto",
                  ml: "auto !important",
                },
                [breakpoints.down("lg")]: {
                  mr: "auto",
                  ml: "auto !important",
                },
                [breakpoints.down("md")]: {
                  mr: cardContent ? "auto !important" : "unset",
                  pr: "7px",
                  pl: cardContent ? "0px !important" : "10px !important",
                },
              })}
            >
              {children}
            </VuiBox>
          </VuiBox>
        </VuiBox>
      </div>

    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 0,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};
