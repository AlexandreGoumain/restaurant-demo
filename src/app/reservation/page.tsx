"use client";

import {
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    NumberInput,
    NumberInputField,
    Stack,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { mockFetch } from "@/lib/mock";
import { restaurantInfo } from "@/lib/restaurantInfo";
import type { ReservationFormData, ReservationFormErrors } from "@/types/reservation";

export default function ReservationPage() {
    const [form, setForm] = useState<ReservationFormData>({
        name: "",
        email: "",
        phone: "",
        date: "",
        partySize: 2,
        note: "",
    });
    const [errors, setErrors] = useState<ReservationFormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const toast = useToast();

    const label = useMemo(
        () => (submitting ? "Envoi en cours..." : "Confirmer la réservation"),
        [submitting]
    );

    const validate = () => {
        const next: ReservationFormErrors = {};

        if (!form.name.trim()) {
            next.name = "Ce champ est requis.";
        }

        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            next.email = "Email invalide.";
        }

        if (!form.date.trim()) {
            next.date = "Ce champ est requis.";
        } else {
            const selectedDate = new Date(form.date);
            const now = new Date();
            if (selectedDate < now) {
                next.date = "La date ne peut pas être dans le passé.";
            }
        }

        if (form.partySize < 1 || form.partySize > 20) {
            next.partySize = "Le nombre de convives doit être entre 1 et 20.";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        if (!validate()) return;

        setSubmitting(true);
        try {
            const payload = {
                name: form.name,
                email: form.email || undefined,
                phone: form.phone || undefined,
                date: new Date(form.date).toISOString(),
                partySize: Number(form.partySize),
                note: form.note || undefined,
            };

            await mockFetch("/api/cms/reservations/public", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            toast({
                title: "Réservation confirmée !",
                description: "Nous vous enverrons une confirmation par email.",
                status: "success",
                duration: 5000,
            });

            setForm({
                name: "",
                email: "",
                phone: "",
                date: "",
                partySize: 2,
                note: "",
            });
            setErrors({});
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Veuillez réessayer plus tard ou nous contacter directement.",
                status: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    // Set minimum date to current datetime
    const minDateTime = useMemo(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    }, []);

    return (
        <Box as="section" py={{ base: 16, md: 20 }}>
            <Container>
                <Stack spacing={6}>
                    <Box>
                        <Heading as="h1" size="xl" mb={4}>
                            Réservez votre table
                        </Heading>
                        <Text color="text.default" fontSize="lg">
                            Disponibilités en temps réel, confirmation rapide.
                        </Text>
                        <Text color="text.muted" fontSize="sm" mt={2}>
                            {restaurantInfo.fullName} • {restaurantInfo.address.fullAddress}
                        </Text>
                    </Box>

                    <Box
                        as="form"
                        onSubmit={handleSubmit}
                        bg="bg.surface"
                        border="1px solid"
                        borderColor="border.muted"
                        p={{ base: 6, md: 8 }}
                        borderRadius="xl"
                        boxShadow="xl"
                    >
                        <Stack spacing={5}>
                            <FormControl isRequired isInvalid={Boolean(errors.name)}>
                                <FormLabel htmlFor="name">Nom complet</FormLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({ ...form, name: e.target.value })
                                    }
                                    placeholder="Jean Dupont"
                                />
                                <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({ ...form, email: e.target.value })
                                    }
                                    placeholder="jean.dupont@email.com"
                                />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.phone)}>
                                <FormLabel htmlFor="phone">Téléphone</FormLabel>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        setForm({ ...form, phone: e.target.value })
                                    }
                                    placeholder={restaurantInfo.contact.phoneDisplay}
                                />
                                <FormErrorMessage>{errors.phone}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(errors.date)}>
                                <FormLabel htmlFor="date">Date et heure</FormLabel>
                                <Input
                                    id="date"
                                    name="date"
                                    type="datetime-local"
                                    value={form.date}
                                    onChange={(e) =>
                                        setForm({ ...form, date: e.target.value })
                                    }
                                    min={minDateTime}
                                />
                                <FormErrorMessage>{errors.date}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired isInvalid={Boolean(errors.partySize)}>
                                <FormLabel htmlFor="partySize">Nombre de convives</FormLabel>
                                <NumberInput
                                    min={1}
                                    max={20}
                                    value={form.partySize}
                                    onChange={(_, value) =>
                                        setForm({
                                            ...form,
                                            partySize: Number.isFinite(value) ? value : 2,
                                        })
                                    }
                                >
                                    <NumberInputField />
                                </NumberInput>
                                <FormErrorMessage>{errors.partySize}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.note)}>
                                <FormLabel htmlFor="note">Note (facultatif)</FormLabel>
                                <Textarea
                                    id="note"
                                    name="note"
                                    rows={4}
                                    value={form.note}
                                    onChange={(e) =>
                                        setForm({ ...form, note: e.target.value })
                                    }
                                    placeholder="Allergies, occasion spéciale, demande particulière..."
                                />
                                <FormErrorMessage>{errors.note}</FormErrorMessage>
                            </FormControl>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                isLoading={submitting}
                                loadingText="Envoi en cours..."
                            >
                                {label}
                            </Button>
                        </Stack>
                    </Box>

                    <Box bg="brand.50" p={6} borderRadius="xl" border="1px solid" borderColor="brand.200">
                        <Heading size="md" color="brand.700" mb={3}>
                            Informations pratiques
                        </Heading>
                        <Stack spacing={2}>
                            <Text fontSize="sm" color="text.muted">
                                <strong>Horaires:</strong> {restaurantInfo.quickHours.weekdays}, {restaurantInfo.quickHours.weekend}
                            </Text>
                            <Text fontSize="sm" color="text.muted">
                                <strong>Téléphone:</strong> {restaurantInfo.contact.phoneDisplay}
                            </Text>
                            <Text fontSize="sm" color="text.muted">
                                <strong>Capacité maximale:</strong> {restaurantInfo.events.capacity} personnes
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
