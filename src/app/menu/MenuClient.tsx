"use client";

import type { MenuCategory, MenuItem } from "@/types/menu";
import type { HeadingProps } from "@chakra-ui/react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

function AccentTitle({
    children,
    as = "h2",
    size = "lg",
}: {
    children: React.ReactNode;
    as: string;
    size: string;
}) {
    return (
        <Heading
            as={as as HeadingProps["as"]}
            size={size as HeadingProps["size"]}
            color="brand.700"
        >
            {children}
        </Heading>
    );
}

function MenuItemCard({ item }: { item: MenuItem }) {
    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border.muted"
            borderRadius="xl"
            overflow="hidden"
            _hover={{ shadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s ease"
        >
            {item.image && (
                <Box position="relative" aspectRatio={4 / 3}>
                    <Image
                        src={item.image}
                        alt={item.title}
                        objectFit="cover"
                        w="100%"
                        h="100%"
                    />
                </Box>
            )}
            <Stack p={5} spacing={2}>
                <Flex align="baseline" justify="space-between" gap={4}>
                    <Heading as="h3" size="md">
                        {item.title}
                    </Heading>
                    {item.price && <Text fontWeight={700}>{item.price}</Text>}
                </Flex>
                {item.desc && <Text color="text.muted">{item.desc}</Text>}
            </Stack>
        </Box>
    );
}

function CategorySection({ cat }: { cat: MenuCategory }) {
    return (
        <Box as="section" id={cat.id} py={{ base: 2, md: 3 }}>
            <AccordionItem border="none">
                <Box
                    bg="card.bg"
                    border="1px solid"
                    borderColor="card.border"
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="sm"
                >
                    <AccordionButton
                        px={5}
                        py={4}
                        _hover={{
                            bg: "brand.50",
                        }}
                        _expanded={{
                            bg: "brand.50",
                        }}
                    >
                        <Box flex="1" textAlign="left">
                            <AccentTitle as="h2" size="lg">
                                {cat.title}
                            </AccentTitle>
                        </Box>
                        <AccordionIcon color="brand.700" />
                    </AccordionButton>
                    <AccordionPanel px={5} pt={4} pb={6}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            {cat.items.map((it) => (
                                <MenuItemCard
                                    item={it}
                                    key={`${cat.id}-${it.title}`}
                                />
                            ))}
                        </SimpleGrid>
                    </AccordionPanel>
                </Box>
            </AccordionItem>
        </Box>
    );
}

export default function MenuClient({
    categories,
}: {
    categories: MenuCategory[];
}) {
    const idToIndex = useMemo(() => {
        const map: Record<string, number> = {};
        categories.forEach((c, i) => (map[c.id] = i));
        return map;
    }, [categories]);

    const [open, setOpen] = useState<number[]>([0]);

    useEffect(() => {
        const openFromHash = () => {
            const hash =
                typeof window !== "undefined"
                    ? window.location.hash.replace("#", "")
                    : "";
            if (!hash) return;
            const idx = idToIndex[hash];
            if (idx !== undefined)
                setOpen((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
        };
        openFromHash();
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
    }, [idToIndex]);

    return (
        <Box as="section" bg="bg.canvas" py={{ base: 16, md: 20 }}>
            <Container>
                <Stack spacing={4} mb={8}>
                    <AccentTitle as="h1" size="xl">
                        Carte
                    </AccentTitle>
                    <Text color="text.default">
                        Simple, authentique, parcourez notre carte.
                    </Text>
                </Stack>

                <Accordion
                    allowMultiple
                    index={open}
                    onChange={(v) => setOpen(Array.isArray(v) ? v : [v])}
                >
                    {categories.map((cat) => (
                        <CategorySection key={cat.id} cat={cat} />
                    ))}
                </Accordion>
            </Container>
        </Box>
    );
}
