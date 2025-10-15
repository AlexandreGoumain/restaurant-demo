import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

type Dish = {
  title: string;
  image: string;
  description?: string;
};

const DISHES: Dish[] = [
  {
    title: "Paccheri all'Astice",
    image:
      "https://images.unsplash.com/photo-1632389762435-8c53185e40ae?auto=format&fit=crop&w=1200&q=80",
    description: "Pâtes artisanales, homard breton rôti, bisque corsée.",
  },
  {
    title: "Risotto Safran & Taleggio",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1200&q=80",
    description:
      "Crème de Taleggio, pistils de safran, pancetta croustillante.",
  },
  {
    title: "Carpaccio de Bœuf",
    image:
      "https://images.unsplash.com/photo-1613420408779-e517581a26aa?auto=format&fit=crop&w=1200&q=80",
    description: "Filet finement tranché, parmesan 36 mois, huile d'olive.",
  },
  {
    title: "Pizza Margherita DOP",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    description: "San Marzano, mozzarella di bufala, basilic frais.",
  },
  {
    title: "Bruschetta des Pouilles",
    image:
      "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=1200&q=80",
    description: "Pain rustique, tomates datterino, ail et basilic.",
  },
  {
    title: "Tiramisu aux Agrumes",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
    description: "Mascarpone onctueux, orange sanguine, limoncello.",
  },
];

export default function FeaturedDishes() {
  return (
    <Box as="section" py={{ base: 16, md: 20 }} bg="bg.canvas">
      <Container>
        <Stack spacing={3} mb={8}>
          <Text
            textTransform="uppercase"
            letterSpacing="widest"
            fontSize="sm"
            color="brand.600"
          >
            Plats signatures
          </Text>
          <Heading as="h2" size="xl">
            Nos incontournables
          </Heading>
          <Text color="text.default">
            Une sélection maison de nos recettes emblématiques, préparées avec
            des produits d&apos;exception.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {DISHES.map((dish) => (
            <Box
              key={dish.title}
              bg="bg.surface"
              border="1px solid"
              borderColor="border.muted"
              borderRadius="xl"
              overflow="hidden"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s ease"
            >
              <Box position="relative" aspectRatio={4 / 3}>
                <Image
                  src={dish.image}
                  alt={dish.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <Stack p={5} spacing={2}>
                <Heading as="h3" size="md">
                  {dish.title}
                </Heading>
                {dish.description && (
                  <Text color="text.muted">{dish.description}</Text>
                )}
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
