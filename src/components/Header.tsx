"use client";

import {
    HamburgerIcon,
    SmallCloseIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Collapse,
    Container,
    Flex,
    HStack,
    IconButton,
    Link,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const pathname = usePathname();
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname?.startsWith(href);
    return (
        <Box
            as="header"
            position="sticky"
            top={0}
            zIndex="sticky"
            bg="bg.surface"
            borderBottom="1px solid"
            borderColor="border.muted"
            backdropFilter="saturate(180%) blur(8px)"
        >
            <Container>
                <Flex py={4} align="center" justify="space-between">
                    <Link
                        as={NextLink}
                        href="/"
                        fontWeight={700}
                        fontSize="xl"
                        letterSpacing="wide"
                    >
                        Aurora
                    </Link>
                    <HStack
                        spacing={6}
                        display={{ base: "none", md: "flex" }}
                        as="nav"
                        aria-label="Navigation principale"
                    >
                        <Link
                            as={NextLink}
                            href="/menu"
                            color={isActive("/menu") ? "link" : undefined}
                        >
                            Carte
                        </Link>
                        <Link
                            as={NextLink}
                            href="/entreprises"
                            color={
                                isActive("/entreprises") ? "link" : undefined
                            }
                        >
                            Entreprises
                        </Link>
                        <Link
                            as={NextLink}
                            href="/reservation"
                            color={
                                isActive("/reservation") ? "link" : undefined
                            }
                        >
                            Réservation
                        </Link>
                        <Link
                            as={NextLink}
                            href="/contact"
                            color={isActive("/contact") ? "link" : undefined}
                        >
                            Contact
                        </Link>
                    </HStack>
                    <IconButton
                        aria-label={
                            isOpen ? "Fermer le menu" : "Ouvrir le menu"
                        }
                        display={{ base: "inline-flex", md: "none" }}
                        variant="ghost"
                        icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
                        onClick={onToggle}
                    />
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <Box
                        bg="white"
                        shadow="lg"
                        py={6}
                        px={2}
                        borderTopRadius="xl"
                        w="100%"
                    >
                        <Stack
                            as="nav"
                            spacing={4}
                            aria-label="Navigation mobile"
                        >
                            <Link
                                as={NextLink}
                                href="/menu"
                                onClick={onClose}
                                color={isActive("/menu") ? "link" : undefined}
                            >
                                Carte
                            </Link>
                            <Link
                                as={NextLink}
                                href="/entreprises"
                                onClick={onClose}
                                color={
                                    isActive("/entreprises")
                                        ? "link"
                                        : undefined
                                }
                            >
                                Entreprises
                            </Link>
                            <Link
                                as={NextLink}
                                href="/reservation"
                                onClick={onClose}
                                color={
                                    isActive("/reservation")
                                        ? "link"
                                        : undefined
                                }
                            >
                                Réservation
                            </Link>
                            <Link
                                as={NextLink}
                                href="/contact"
                                onClick={onClose}
                                color={
                                    isActive("/contact") ? "link" : undefined
                                }
                            >
                                Contact
                            </Link>
                        </Stack>
                    </Box>
                </Collapse>
            </Container>
        </Box>
    );
}
