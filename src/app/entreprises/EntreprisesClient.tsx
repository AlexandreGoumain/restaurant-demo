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
    Stack,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import type { EnterpriseFormData, EnterpriseFormErrors } from "@/types/entreprise";
import { mockFetch } from "@/lib/mock";

export default function EntreprisesClient() {
    const [form, setForm] = useState<EnterpriseFormData>({ company: "", email: "", message: "" });
    const [errors, setErrors] = useState<EnterpriseFormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const toast = useToast();
    const label = useMemo(
        () => (submitting ? "Envoi…" : "Envoyer ma demande"),
        [submitting]
    );

    const validate = () => {
        const next: EnterpriseFormErrors = {};
        if (!form.company.trim()) next.company = "Ce champ est requis.";
        if (!form.email.trim()) next.email = "Ce champ est requis.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            next.email = "Email invalide.";
        if (!form.message.trim()) next.message = "Ce champ est requis.";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        if (!validate()) return;
        setSubmitting(true);
        try {
            await mockFetch("/api/cms/leads/public", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            toast({
                title: "Merci !",
                description: "Nous revenons vers vous sous 24h.",
                status: "success",
            });
            setForm({ company: "", email: "", message: "" });
        } catch {
            toast({
                title: "Erreur",
                description: "Veuillez réessayer plus tard.",
                status: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box as="section" py={{ base: 16, md: 20 }}>
            <Container>
                <Heading as="h1" size="xl" mb={6}>
                    Solutions entreprises
                </Heading>
                <Text color="text.default" mb={8}>
                    Privatisation, menus sur‑mesure, accords mets & vins, et
                    accompagnement événementiel.
                </Text>
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
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.company)}
                        >
                            <FormLabel htmlFor="company">Entreprise</FormLabel>
                            <Input
                                id="company"
                                name="company"
                                value={form.company}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company: e.target.value,
                                    })
                                }
                            />
                            <FormErrorMessage>
                                {errors.company}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.email)}
                        >
                            <FormLabel htmlFor="email">
                                Email professionnel
                            </FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={Boolean(errors.message)}
                        >
                            <FormLabel htmlFor="message">
                                Votre demande
                            </FormLabel>
                            <Textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={form.message}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        message: e.target.value,
                                    })
                                }
                            />
                            <FormErrorMessage>
                                {errors.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={submitting}
                        >
                            {label}
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
