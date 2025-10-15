import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NotFound() {
    return (
        <Box as="section" py={{ base: 16, md: 20 }}>
            <Container>
                <Heading as="h1" size="xl" mb={3}>
                    Page introuvable
                </Heading>
                <Text color="gray.600" mb={6}>
                    La page demandée n’existe pas ou a été déplacée.
                </Text>
                <Button as={NextLink} href="/" variant="primary">
                    Retour à l’accueil
                </Button>
            </Container>
        </Box>
    );
}
