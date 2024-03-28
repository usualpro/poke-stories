import { Box, Spinner } from "@chakra-ui/react";

export const Preload = () => (
  <Box
    sx={{
      position: "absolute",
      zIndex: 4,
      height: "100dvh",
      width: "100%",
    }}
  >
    <Spinner
      sx={{
        position: "absolute",
        bottom: 10,
        right: 0,
      }}
    />
  </Box>
);
