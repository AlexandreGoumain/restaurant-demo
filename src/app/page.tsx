import MenuSection from "@/components/MenuSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import Testimonials from "@/components/Testimonials";
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import Script from "next/script";
import { restaurantInfo } from "@/lib/restaurantInfo";

export default function Home() {
    const { fullName, tagline, description, contact, social } = restaurantInfo;

    return (
        <Box>
            <Box
                as="section"
                color="white"
                bgImage="url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')"
                bgPos="center"
                bgSize="cover"
            >
                <Box bg="rgba(12,22,18,0.55)" py={{ base: 20, md: 28 }}>
                    <Container>
                        <Stack spacing={6} maxW="3xl">
                            <Text
                                textTransform="uppercase"
                                letterSpacing="widest"
                                fontSize="sm"
                                color="brand.100"
                            >
                                {tagline}
                            </Text>
                            <HStack spacing={2} flexWrap="wrap">
                                <Box
                                    as="span"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="whiteAlpha.700"
                                    color="white"
                                    bg="whiteAlpha.200"
                                    backdropFilter="saturate(180%) blur(4px)"
                                    fontWeight={600}
                                    fontSize="sm"
                                >
                                    Depuis 1998
                                </Box>
                                <Box
                                    as="span"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="whiteAlpha.700"
                                    color="white"
                                    bg="whiteAlpha.200"
                                    backdropFilter="saturate(180%) blur(4px)"
                                    fontWeight={600}
                                    fontSize="sm"
                                >
                                    Fait maison
                                </Box>
                                <Box
                                    as="span"
                                    px={3}
                                    py={1}
                                    borderRadius="full"
                                    border="1px solid"
                                    borderColor="whiteAlpha.700"
                                    color="white"
                                    bg="whiteAlpha.200"
                                    backdropFilter="saturate(180%) blur(4px)"
                                    fontWeight={600}
                                    fontSize="sm"
                                >
                                    Produits locaux
                                </Box>
                            </HStack>
                            <Heading as="h1" size="2xl" lineHeight={1.2}>
                                {fullName} — L&apos;Italie au cœur de Paris
                            </Heading>
                            <Text fontSize="lg" color="whiteAlpha.900">
                                {description}
                            </Text>
                            <HStack spacing={3}>
                                <Button
                                    as="a"
                                    href="/reservation"
                                    variant="primary"
                                    size="lg"
                                >
                                    Réserver
                                </Button>
                                <Button
                                    as="a"
                                    href="/menu"
                                    variant="ghost"
                                    size="lg"
                                    color="white"
                                    borderColor="whiteAlpha.700"
                                >
                                    Découvrir la carte
                                </Button>
                            </HStack>
                        </Stack>
                    </Container>
                </Box>
            </Box>
            <FeaturedDishes />
            <MenuSection />
            <Testimonials />

            <Box as="section" id="contact" py={{ base: 16, md: 20 }}>
                <Container>
                    <Heading as="h2" size="xl" mb={4}>
                        Nous contacter
                    </Heading>
                    <Text color="gray.600" mb={4}>
                        Pour une réservation ou un devis entreprise,
                        écrivez‑nous ou appelez‑nous.
                    </Text>
                    <HStack spacing={4}>
                        <Button as="a" href="/reservation" variant="primary">
                            Réserver
                        </Button>
                        <Button as="a" href="/entreprises" variant="ghost">
                            Devis entreprise
                        </Button>
                    </HStack>
                </Container>
            </Box>

            <Script
                id="restaurant-schema"
                type="application/ld+json"
                strategy="afterInteractive"
            >
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Restaurant",
                    name: fullName,
                    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
                    servesCuisine: "Italian",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: restaurantInfo.address.street,
                        addressLocality: restaurantInfo.address.city,
                        postalCode: restaurantInfo.address.postalCode,
                        addressCountry: "FR",
                    },
                    telephone: contact.phone,
                    email: contact.email,
                    priceRange: "€€",
                    acceptsReservations: true,
                    sameAs: [
                        social.instagram,
                        social.facebook,
                    ],
                })}
            </Script>
        </Box>
    );
}
