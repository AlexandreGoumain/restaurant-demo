import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";

const MENU_ITEMS = [
    {
        title: "Paccheri all'Astice",
        description:
            "Homard breton rôti, tomates datterino confites, bisque corsée et basilic frais.",
        price: "32 €",
    },
    {
        title: "Risotto Safran & Taleggio",
        description:
            "Riz Carnaroli, pistils de safran, crumble de pancetta croustillante, émulsion au Taleggio.",
        price: "27 €",
    },
    {
        title: "Tiramisu aux agrumes",
        description:
            "Mascarpone onctueux, zestes d’orange sanguine, sabayon au limoncello.",
        price: "12 €",
    },
];

export default function MenuSection() {
    return (
        <Box as="section" id="menu" py={{ base: 16, md: 20 }} bg="bg.surface">
            <Container>
                <Stack spacing={3} mb={8}>
                    <Text
                        textTransform="uppercase"
                        letterSpacing="widest"
                        fontSize="sm"
                        color="brand.600"
                    >
                        Carte signature
                    </Text>
                    <Heading as="h2" size="xl">
                        Une cuisine artisanale
                    </Heading>
                    <Text color="text.default">
                        Recettes au rythme des saisons, produits
                        d&apos;exception : burrata des Pouilles, truffe
                        d&apos;Alba, parmigiano 36 mois.
                    </Text>
                </Stack>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    {MENU_ITEMS.map((item) => (
                        <Box
                            key={item.title}
                            p={6}
                            bg={{ base: "white", _dark: "gray.800" }}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="border.muted"
                            _hover={{
                                shadow: "md",
                                transform: "translateY(-2px)",
                            }}
                            transition="all 0.2s ease"
                        >
                            <Heading as="h3" size="md">
                                {item.title}
                            </Heading>
                            <Text color="text.default" my={3}>
                                {item.description}
                            </Text>
                            <Text fontWeight={700}>{item.price}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
