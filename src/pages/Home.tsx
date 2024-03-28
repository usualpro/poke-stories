import { Container, Stack, Heading, Box } from "@chakra-ui/react";
import { Pagination } from "../components/Pagination";
import { List } from "../components/List";

export const Home = () => {
  return (
    <Stack spacing={6}>
      <Box
        sx={{
          overflow: "scroll",
          position: "sticky",
          scrollbarWidth: "none",
          padding: 4,
          top: 0,
          zIndex: 1,
          background: "var(--chakra-colors-white)",
        }}
      >
        <Pagination />
      </Box>
      <Container paddingBlockEnd={4}>
        <Stack spacing={6}>
          <Heading as="h1" size="4xl" textAlign={"center"} noOfLines={1}>
            Pokemon ❤️
          </Heading>
          <List />
        </Stack>
      </Container>
    </Stack>
  );
};
