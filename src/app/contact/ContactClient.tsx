"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Card,
  CardBody,
  Button,
  Link,
  Divider,
} from "@chakra-ui/react";
import {
  PhoneIcon,
  EmailIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaInstagram, FaFacebook } from "react-icons/fa";
import { restaurantInfo, formatOpeningHours, formatPhoneForTel } from "@/lib/restaurantInfo";

export default function ContactClient() {
  const { name, address, contact, openingHours, transport, social, location, events } = restaurantInfo;
  const formattedHours = formatOpeningHours(openingHours);

  return (
    <Box bg="bg.canvas">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-b, brand.700, brand.800)"
        color="white"
        py={{ base: 16, md: 24 }}
      >
        <Container>
          <VStack spacing={4} textAlign="center" maxW="2xl" mx="auto">
            <Heading as="h1" size="2xl" fontWeight="bold">
              Contactez-nous
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900">
              Nous serions ravis de vous accueillir chez {name}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Info Cards */}
      <Container py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={12}>
          <Card
            bg="white"
            borderWidth="1px"
            borderColor="card.border"
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
          >
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  bg="brand.50"
                  p={4}
                  borderRadius="full"
                  color="brand.700"
                >
                  <Icon as={FaMapMarkerAlt} boxSize={6} />
                </Box>
                <VStack spacing={2}>
                  <Heading size="sm" color="brand.700">
                    Adresse
                  </Heading>
                  <Text color="text.muted" fontSize="sm">
                    {address.street}
                    <br />
                    {address.postalCode} {address.city}, {address.country}
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg="white"
            borderWidth="1px"
            borderColor="card.border"
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
          >
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  bg="brand.50"
                  p={4}
                  borderRadius="full"
                  color="brand.700"
                >
                  <PhoneIcon boxSize={6} />
                </Box>
                <VStack spacing={2}>
                  <Heading size="sm" color="brand.700">
                    Téléphone
                  </Heading>
                  <Link
                    href={`tel:${formatPhoneForTel(contact.phone)}`}
                    color="text.muted"
                    fontSize="sm"
                    _hover={{ color: "brand.700" }}
                  >
                    {contact.phoneDisplay}
                  </Link>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg="white"
            borderWidth="1px"
            borderColor="card.border"
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
          >
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  bg="brand.50"
                  p={4}
                  borderRadius="full"
                  color="brand.700"
                >
                  <EmailIcon boxSize={6} />
                </Box>
                <VStack spacing={2}>
                  <Heading size="sm" color="brand.700">
                    Email
                  </Heading>
                  <Link
                    href={`mailto:${contact.email}`}
                    color="text.muted"
                    fontSize="sm"
                    _hover={{ color: "brand.700" }}
                  >
                    {contact.email}
                  </Link>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          <Card
            bg="white"
            borderWidth="1px"
            borderColor="card.border"
            transition="all 0.3s"
            _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
          >
            <CardBody>
              <VStack spacing={4} align="center" textAlign="center">
                <Box
                  bg="brand.50"
                  p={4}
                  borderRadius="full"
                  color="brand.700"
                >
                  <TimeIcon boxSize={6} />
                </Box>
                <VStack spacing={2}>
                  <Heading size="sm" color="brand.700">
                    Horaires
                  </Heading>
                  <Text color="text.muted" fontSize="sm">
                    {restaurantInfo.quickHours.weekdays}
                    <br />
                    {restaurantInfo.quickHours.weekend}
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Main Content Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Hours & Info Section */}
          <Card bg="white" borderWidth="1px" borderColor="card.border">
            <CardBody p={8}>
              <VStack align="stretch" spacing={6}>
                <Heading size="lg" color="brand.700">
                  Informations pratiques
                </Heading>

                <Box>
                  <Heading size="sm" mb={3} color="text.default">
                    Horaires d&apos;ouverture
                  </Heading>
                  <VStack align="stretch" spacing={2}>
                    {formattedHours.map((day) => (
                      <HStack key={day.day} justify="space-between">
                        <Text color="text.muted">{day.day}</Text>
                        <Text fontWeight="semibold" color="text.default">
                          {day.isOpen ? day.periods?.join(", ") : "Fermé"}
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Heading size="sm" mb={3} color="text.default">
                    Accès & Transport
                  </Heading>
                  <VStack align="stretch" spacing={2}>
                    <Text color="text.muted" fontSize="sm">
                      <strong>Métro:</strong> {transport.metro.join(", ")}
                    </Text>
                    <Text color="text.muted" fontSize="sm">
                      <strong>Bus:</strong> {transport.bus.join(", ")}
                    </Text>
                    <Text color="text.muted" fontSize="sm">
                      <strong>Parking:</strong> {transport.parking.join(", ")}
                    </Text>
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Heading size="sm" mb={3} color="text.default">
                    Suivez-nous
                  </Heading>
                  <HStack spacing={4}>
                    <Button
                      as={Link}
                      href={social.instagram}
                      target="_blank"
                      leftIcon={<Icon as={FaInstagram} />}
                      colorScheme="pink"
                      variant="outline"
                      size="sm"
                    >
                      Instagram
                    </Button>
                    <Button
                      as={Link}
                      href={social.facebook}
                      target="_blank"
                      leftIcon={<Icon as={FaFacebook} />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                    >
                      Facebook
                    </Button>
                  </HStack>
                </Box>

                <Divider />

                <Box>
                  <Button
                    as={Link}
                    href="/reservation"
                    colorScheme="brand"
                    size="lg"
                    w="full"
                    bg="brand.600"
                    _hover={{ bg: "brand.700" }}
                  >
                    Réserver une table
                  </Button>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Map Section */}
          <Card
            bg="white"
            borderWidth="1px"
            borderColor="card.border"
            overflow="hidden"
          >
            <CardBody p={0}>
              <Box position="relative" h="full" minH="600px">
                <iframe
                  src={location.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Localisation du restaurant ${name}`}
                />
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Additional Info Section */}
        <Card
          bg="brand.50"
          borderWidth="1px"
          borderColor="brand.200"
          mt={8}
        >
          <CardBody p={8}>
            <VStack spacing={4} textAlign="center">
              <Heading size="md" color="brand.700">
                Événements privés & Groupes
              </Heading>
              <Text color="text.muted" maxW="2xl">
                {events.description}
              </Text>
              <Button
                as={Link}
                href="/entreprises"
                variant="outline"
                colorScheme="brand"
                size="lg"
              >
                En savoir plus
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}
