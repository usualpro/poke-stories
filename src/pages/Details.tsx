import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { Services } from "../services";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  Box,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Preload } from "../components/Preload";

export const Details = () => {
  const { itemId, pageId } = useParams();
  const navigate = useNavigate();
  const { name, method } = Services.list(String(itemId));
  const { data: pokemonData, error, isLoading } = useSWR(name, method);

  const onClose = () =>
    navigate(`/${typeof pageId !== "undefined" ? pageId : ""}`);

  if (isLoading) return <Preload />;

  if (error) return <div>Error: {error.message}</div>;

  const {
    name: itemName,
    sprites,
    types,
    id,
    height,
    weight,
    forms: itemForms,
  } = pokemonData?.data;

  return (
    <Modal isOpen={true} {...{ onClose }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">{itemName}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack flexDirection={"row"}>
            <Image
              sx={{ objectFit: "contain" }}
              src={sprites.front_default}
            ></Image>
            <Stack>
              <Box>
                <Heading size="s">Types</Heading>
                <Stack flexDirection={"row"}>
                  {types.map(
                    (
                      _c: {
                        type: {
                          name: string;
                        };
                      },
                      i: number
                    ) => (
                      <Tag key={`tag-type-${itemName}-${i}`}>
                        {_c.type.name}
                      </Tag>
                    )
                  )}
                </Stack>
              </Box>
              <Box>
                <Heading size="s">Forms</Heading>
                <Stack flexDirection={"row"}>
                  {itemForms.map(
                    (
                      _d: {
                        name: string;
                      },
                      i: number
                    ) => (
                      <Tag key={`tag-form-${itemName}-${i}`}>{_d.name}</Tag>
                    )
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>id</Th>
                  <Th>height</Th>
                  <Th isNumeric>weight</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{id}</Td>
                  <Td>{height}</Td>
                  <Td isNumeric>{weight}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
