import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
    return (
        <Box as="section" py={{ base: 16, md: 20 }}>
            <Container>
                <Box
                    bg="bg.surface"
                    border="1px solid"
                    borderColor="border.muted"
                    borderRadius="xl"
                    p={{ base: 6, md: 8 }}
                >
                    <Heading as="h1" size="xl" mb={4}>
                        Mentions légales
                    </Heading>
                    <Text color="text.default">Contenu d’exemple.</Text>
                </Box>
            </Container>
        </Box>
    );
}
