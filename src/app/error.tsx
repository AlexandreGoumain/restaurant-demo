"use client";

import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <Box as="section" py={{ base: 16, md: 20 }}>
            <Container>
                <Heading as="h1" size="xl" mb={3}>
                    Une erreur est survenue
                </Heading>
                <Text color="gray.600" mb={6}>
                    Veuillez réessayer. Si le problème persiste, contactez‑nous.
                </Text>
                <Button variant="primary" onClick={() => reset()}>
                    Réessayer
                </Button>
            </Container>
        </Box>
    );
}
