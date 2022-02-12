import {
  // AspectRatio,
  Box,
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Image,
  Link,
  SimpleGrid,
  Stack,
  // Text,
} from "@chakra-ui/react";
import React from "react";

const ItemsCard = (props) => {
  return (
    <>
      <Container maxW="80rem" centerContent>
        <SimpleGrid columns={[1, 1, 1, 1]}>
          <Box
            p={4}
            display={{ md: "flex" }}
            maxWidth="32rem"
            borderWidth={1}
            margin={2}
          >
            <Image
              maxWidth="200px"
              margin="auto"
              src="https://vinc.gumlet.io/gallery/blog/thumbs/bicycle-playing-card-trick-decks.jpg"
              alt="Woman paying for a purchase"
            />
            <Stack
              align={{ base: "center", md: "stretch" }}
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: 4, md: 0 }}
              ml={{ md: 6 }}
            >
              <Editable
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
                color="teal.600"
                value={props.item.name}
              >
                <EditablePreview />
                <EditableInput name="name" onChange={props.handleItemchange} />
              </Editable>

              <Editable
                my={1}
                display="block"
                fontSize="md"
                lineHeight="normal"
                fontWeight="semibold"
                value={props.item.description}
              >
                <EditablePreview />
                <EditableInput
                  name="description"
                  onChange={props.handleItemchange}
                />
              </Editable>

              <Editable my={2} color="gray.500" value={props.item.base_Prize}>
                <EditablePreview />
                <EditableInput name="base" onChange={props.handleItemchange} />
              </Editable>

              <Editable my={2} color="gray.500" value={props.item.bid_timer}>
                <EditablePreview />
                <EditableInput name="timer" onChange={props.handleItemchange} />
              </Editable>

              <Button colorScheme="red" size="md" onClick={props.addItem}>
                Add Item
              </Button>
            </Stack>
          </Box>
          {props.list.map(function (data) {
            return (
              <Box
                p={4}
                display={{ md: "flex" }}
                maxWidth="32rem"
                borderWidth={1}
                margin={2}
                key={data.id}
              >
                <Image
                  maxWidth="200px"
                  margin="auto"
                  src="https://vinc.gumlet.io/gallery/blog/thumbs/bicycle-playing-card-trick-decks.jpg"
                  alt="Woman paying for a purchase"
                />
                <Stack
                  align={{ base: "center", md: "stretch" }}
                  textAlign={{ base: "center", md: "left" }}
                  mt={{ base: 4, md: 0 }}
                  ml={{ md: 6 }}
                >
                  <Editable
                    fontWeight="bold"
                    fontSize="lg"
                    letterSpacing="wide"
                    color="teal.600"
                    value={data.name}
                  >
                    <EditablePreview />
                    <EditableInput
                      name="name"
                      onChange={props.handleItemchange}
                    />
                  </Editable>

                  <Editable
                    my={1}
                    display="block"
                    fontSize="md"
                    lineHeight="normal"
                    fontWeight="semibold"
                    value={data.description}
                  >
                    <EditablePreview />
                    <EditableInput
                      name="description"
                      onChange={props.handleItemchange}
                    />
                  </Editable>

                  <Editable my={2} color="gray.500" value={data.base_Prize}>
                    <EditablePreview />
                    <EditableInput
                      name="base_Prize"
                      onChange={props.handleItemchange}
                    />
                  </Editable>

                  <Editable my={2} color="gray.500" value={data.bid_timer}>
                    <EditablePreview />
                    <EditableInput
                      name="bid_timer"
                      onChange={props.handleItemchange}
                    />
                  </Editable>
                  <Button maxWidth="100px" my={2}>
                    Remove Item!
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default ItemsCard;
