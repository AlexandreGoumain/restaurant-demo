import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Testimonial } from "@/types/testimonial";
import { Suspense } from "react";
import { mockFetch } from "@/lib/mock";

async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await mockFetch(`/api/cms/testimonials/public`);
  const json = await res.json().catch(() => ({ data: [] }));
  type ApiTestimonial = { quote: string; author: string; role?: string };
  const rows = (json?.data || []) as ApiTestimonial[];
  return rows.map((t) => ({ quote: t.quote, author: t.author, role: t.role })) || [];
}

async function TestimonialsServer() {
  const items = await fetchTestimonials();
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
      {items.map((t) => (
        <Stack
          key={`${t.author}-${t.role ?? ''}-${t.quote.slice(0,20)}`}
          bg={{ base: "card.bg", _dark: "card.bg" }}
          borderRadius="xl"
          p={6}
          spacing={4}
          border="1px solid"
          borderColor={{ base: "card.border", _dark: "card.border" }}
          shadow="sm"
        >
          <Text fontStyle="italic" color="text.muted">{t.quote}</Text>
          <Box>
            <Text fontWeight={700}>{t.author}</Text>
            <Text color="gray.500">{t.role}</Text>
          </Box>
        </Stack>
      ))}
    </SimpleGrid>
  );
}

export default function Testimonials() {
  return (
    <Box as="section" py={{ base: 16, md: 20 }} bg="bg.canvas">
      <Container>
        <Stack spacing={3} mb={8}>
          <Heading as="h2" size="xl">Ils en parlent</Heading>
          <Text color="gray.600">Quelques retours de nos convives et partenaires.</Text>
        </Stack>
        <Suspense>
          <TestimonialsServer />
        </Suspense>
      </Container>
    </Box>
  );
}
