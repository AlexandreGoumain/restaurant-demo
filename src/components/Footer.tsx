import {
    Box,
    Container,
    Divider,
    Flex,
    HStack,
    Heading,
    Link,
    List,
    ListItem,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { restaurantInfo } from "@/lib/restaurantInfo";

export default function Footer() {
    const { fullName, address, quickHours, transport } = restaurantInfo;

    return (
        <Box
            as="footer"
            bg="bg.footer"
            color="text.footer"
            pt={{ base: 12, md: 16 }}
            pb={10}
            borderTop="1px solid"
            borderColor="whiteAlpha.300"
        >
            <Container>
                <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    spacing={10}
                    mb={12}
                    justifyItems="center"
                >
                    <Stack spacing={3} align="center" textAlign="center">
                        <Heading as="h3" size="md" color="white">
                            {fullName}
                        </Heading>
                        <Text>{address.street}, {address.postalCode} {address.city}</Text>
                        <Text>{transport.metro[0]}</Text>
                    </Stack>
                    <Stack spacing={3} align="center" textAlign="center">
                        <Heading as="h3" size="md" color="white">
                            Horaires
                        </Heading>
                        <List spacing={2} color="gray.300">
                            <ListItem>{quickHours.weekdays}</ListItem>
                            <ListItem>{quickHours.weekend}</ListItem>
                            <ListItem>Fermé: {quickHours.closedDays.join(", ")}</ListItem>
                        </List>
                    </Stack>
                    <Stack spacing={3} align="center" textAlign="center">
                        <Heading as="h3" size="md" color="white">
                            Navigation
                        </Heading>
                        <HStack spacing={4} justify="center">
                            <Link
                                as={NextLink}
                                href="/menu"
                                color="link.footer"
                            >
                                Carte
                            </Link>
                            <Link
                                as={NextLink}
                                href="/entreprises"
                                color="link.footer"
                            >
                                Entreprises
                            </Link>
                            <Link
                                as={NextLink}
                                href="/reservation"
                                color="link.footer"
                            >
                                Réservation
                            </Link>
                        </HStack>
                    </Stack>
                </SimpleGrid>
                <Divider borderColor="whiteAlpha.300" mb={6} />
                <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    gap={4}
                >
                    <Text fontSize="sm">
                        © {new Date().getFullYear()} {fullName}. Tous
                        droits réservés.
                    </Text>
                    <HStack spacing={4} fontSize="sm">
                        <Link
                            as={NextLink}
                            href="/mentions-legales"
                            color="link.footer"
                        >
                            Mentions légales
                        </Link>
                        <Link
                            as={NextLink}
                            href="/politique-de-confidentialite"
                            color="link.footer"
                        >
                            Confidentialité
                        </Link>
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}
