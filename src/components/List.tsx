import {
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
} from "@chakra-ui/react";
import { FaOptinMonster } from "react-icons/fa6";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { Services } from "../services";
import { Preload } from "./Preload";

type PokemonData = {
  name: string;
  url: string;
};

const getImageUrl = (pokemonData: PokemonData): { url: string; id: string } => {
  const urlParts = pokemonData.url.split("/");
  const id = urlParts[urlParts.length - 2];
  return {
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    id,
  };
};

export const List = () => {
  const navigate = useNavigate();

  const { pageId } = useParams();

  const params =
    typeof pageId !== "undefined"
      ? `?offset=${String(Number(pageId) * 20)}&limit=20`
      : "?offset=0&limit=20";

  const { name, method } = Services.list(params);

  const { data: pokemonData, error, isLoading } = useSWR(name, method);

  if (isLoading) return <Preload />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <SimpleGrid
      minChildWidth="8.5rem"
      spacing={6}
      sx={{
        "a.active .chakra-card": {
          borderWidth: "1px",
        },
      }}
    >
      {pokemonData?.data.results.map((_c: PokemonData, i: number) => (
        <NavLink to={`detail/${getImageUrl(_c).id}`} key={i}>
          <Card maxW="sm">
            <CardBody>
              <Image
                src={getImageUrl(_c).url}
                width={"100%"}
                alt={_c.name}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md" textAlign={"center"} noOfLines={1}>
                  {_c.name}
                </Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justifyContent={"center"}>
              <ButtonGroup spacing="2">
                <Button
                  leftIcon={<FaOptinMonster />}
                  variant="solid"
                  colorScheme="blue"
                  alignSelf={"center"}
                  onClick={() => navigate(`detail/${getImageUrl(_c).id}`)}
                >
                  Details
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </NavLink>
      ))}
    </SimpleGrid>
  );
};
