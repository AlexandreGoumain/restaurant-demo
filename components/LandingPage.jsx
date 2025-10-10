'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  usePrefersReducedMotion,
  useToast
} from '@chakra-ui/react';
import {
  ArrowUpIcon,
  CheckCircleIcon,
  EmailIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  PhoneIcon,
  SmallCloseIcon
} from '@chakra-ui/icons';

const NAV_LINKS = [
  { href: '#experience', label: 'Expérience' },
  { href: '#signature', label: 'Signature' },
  { href: '#entreprises', label: 'Entreprises' },
  { href: '#temoignages', label: 'Avis' }
];

const MENU_ITEMS = [
  {
    title: "Paccheri all'Astice",
    description:
      'Homard breton rôti, tomates datterino confites, bisque corsée et basilic frais.',
    price: '32 €'
  },
  {
    title: 'Risotto Safran & Taleggio',
    description:
      'Riz Carnaroli, pistils de safran, crumble de pancetta croustillante, émulsion au Taleggio.',
    price: '27 €'
  },
  {
    title: 'Tiramisù aux agrumes',
    description: "Mascarpone onctueux, zestes d'orange sanguine, sabayon au limoncello.",
    price: '12 €'
  }
];

const TESTIMONIALS = [
  {
    quote:
      '« Un écrin italien en plein Paris. Service irréprochable, plats signatures à tomber, nous y emmenons désormais tous nos clients internationaux. »',
    author: 'Claire M.',
    role: 'Directrice commerciale, Maison Liora'
  },
  {
    quote:
      "« L'équipe a privatisé le salon mezzanine pour notre lancement produit. Menu sur-mesure, cocktails créatifs, expérience mémorable pour nos invités. »",
    author: 'Antoine G.',
    role: 'Responsable événementiel, Studio Nova'
  },
  {
    quote:
      '« Le brunch dominical est devenu notre rituel familial : buffet généreux, animations pour les enfants, café torréfié maison. »',
    author: 'Sofia R.',
    role: 'Cliente fidèle depuis 2018'
  }
];

const METRICS = [
  { value: '4.9/5', label: 'Avis Google' },
  { value: '+32%', label: 'Croissance CA 2023' },
  { value: '12', label: 'Partenaires producteurs' },
  { value: '48h', label: 'Délai moyen de devis' }
];

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/trattoriaaurora', label: 'Instagram' },
  { href: 'https://www.facebook.com/trattoriaaurora', label: 'Facebook' },
  { href: 'https://www.linkedin.com/company/trattoriaaurora', label: 'LinkedIn' }
];

const FOOTER_RESOURCES = [
  { href: '#', label: 'Dossier de presse' },
  { href: '#', label: "Banque d'images" },
  { href: '#', label: 'Charte graphique' }
];

const LEGAL_LINKS = [
  { href: '#', label: 'Mentions légales' },
  { href: '#', label: 'Politique de confidentialité' },
  { href: '#', label: 'Gestion des cookies' }
];

const EXPERIENCE_CARDS = [
  {
    title: 'Stratégie digitale',
    description:
      "Site optimisé SEO, réservations en ligne et campagnes médias ciblées pour booster votre taux de remplissage toute l'année."
  },
  {
    title: 'Hospitalité',
    description:
      "Formation continue de l'équipe, storytelling autour de chaque plat et suivi de satisfaction en temps réel."
  },
  {
    title: 'Partenariats',
    description:
      'Offres entreprises, accords mets & vins, ateliers team building et solutions traiteur pour vos événements.'
  }
];

const HERO_BADGES = [
  'Guide Michelin 2024',
  'Certifié Slow Food',
  "Privatisation jusqu'à 80 couverts"
];

const HERO_MOMENTS = [
  { title: 'Business lunch', description: 'Menu express 45 min' },
  { title: 'Afterwork', description: 'Carte cocktails signature' },
  { title: 'Week-end en famille', description: 'Brunch italien le dimanche' }
];

const BUSINESS_LIST = [
  'Privatisation dès 35 personnes',
  'Accords mets & vins, mixologie signature',
  'Options hybrides présentiel & livestream'
];

const RESERVATION_POINTS = [
  'Module de réservation en ligne connecté à Zenchef',
  'Coordination avec les hôtels partenaires',
  'Menus adaptés aux régimes alimentaires'
];

const HERO_FEATURES = [
  'Menu dégustation 7 services',
  'Accords mets & vins naturels',
  'Option végétarienne élaborée'
];

const FOOTER_SCHEDULE = ['Lun-Jeu : 12h - 23h', 'Ven-Sam : 12h - 00h', 'Dim : Brunch 11h - 15h'];

const INITIAL_FORM_STATE = {
  company: '',
  email: '',
  message: '',
  'event-date': ''
};

export default function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const toast = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.company.trim()) {
      nextErrors.company = 'Ce champ est requis.';
    }

    if (!formValues.email.trim()) {
      nextErrors.email = 'Ce champ est requis.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = 'Veuillez saisir un email professionnel valide.';
    }

    if (!formValues.message.trim()) {
      nextErrors.message = 'Ce champ est requis.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setFormValues(INITIAL_FORM_STATE);
      setErrors({});
      setIsSubmitting(false);
      toast({
        title: 'Merci pour votre demande !',
        description: "Notre équipe vous recontacte sous 24h pour affiner votre projet.",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    }, 1200);
  };

  const formButtonLabel = useMemo(
    () => (isSubmitting ? 'Envoi en cours…' : 'Recevoir ma proposition'),
    [isSubmitting]
  );

  const desktopNav = (
    <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }} aria-label="Navigation principale">
      {NAV_LINKS.map((link) => (
        <Link key={link.href} href={link.href} onClick={onClose} fontWeight={600} color="gray.700">
          {link.label}
        </Link>
      ))}
      <Button as="a" href="#reservation" variant="ghost" onClick={onClose}>
        Réserver
      </Button>
    </HStack>
  );

  const mobileNav = (
    <Collapse in={isOpen} animateOpacity>
      <Box bg="white" shadow="lg" py={6} px={6} borderTopRadius="xl" w="100%">
        <Stack as="nav" spacing={4} aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={onClose} fontSize="lg" color="gray.700">
              {link.label}
            </Link>
          ))}
          <Button as="a" href="#reservation" variant="primary" size="lg" onClick={onClose}>
            Réserver
          </Button>
          <Stack spacing={1} pt={4} borderTop="1px solid" borderColor="gray.100">
            <Link href="tel:+33123456789" display="inline-flex" alignItems="center" gap={2}>
              <PhoneIcon /> +33 1 23 45 67 89
            </Link>
            <Link href="mailto:bonjour@trattoria-aurora.fr" display="inline-flex" alignItems="center" gap={2}>
              <EmailIcon /> bonjour@trattoria-aurora.fr
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Collapse>
  );

  return (
    <Box>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex="sticky"
        bg="white"
        boxShadow="sm"
        borderBottom="1px solid"
        borderColor="gray.100"
        backdropFilter="saturate(180%) blur(12px)"
      >
        <Container>
          <Flex align="center" justify="space-between" py={4}>
            <Link href="#hero" fontWeight={700} fontSize="xl" letterSpacing="wide" onClick={onClose}>
              Aurora
            </Link>
            {desktopNav}
            <IconButton
              display={{ base: 'inline-flex', md: 'none' }}
              variant="ghost"
              borderWidth={0}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              icon={isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
              onClick={onToggle}
            />
          </Flex>
        </Container>
        {mobileNav}
      </Box>

      <Box
        as="main"
        bg="gray.50"
        pb={24}
      >
        <Box
          as="section"
          id="hero"
          position="relative"
          color="white"
          bgImage="url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80')"
          bgPos="center"
          bgSize="cover"
          bgRepeat="no-repeat"
        >
          <Box position="absolute" inset={0} bg="rgba(8, 23, 30, 0.65)" />
          <Container position="relative" py={{ base: 20, md: 32 }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
              <Stack spacing={6}>
                <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.100">
                  Restaurant italien gastronomique
                </Text>
                <Heading as="h1" size="2xl" lineHeight={1.2}>
                  Trattoria Aurora — L&apos;Italie vibrante au cœur de Paris
                </Heading>
                <Text fontSize="lg" color="whiteAlpha.900">
                  Cuisine de saison, ingrédients sourcés en direct des producteurs italiens, accueil raffiné et offres sur-mesure pour vos événements privés et professionnels.
                </Text>
                <HStack spacing={4} flexWrap="wrap">
                  <Button as="a" href="#reservation" variant="primary" size="lg">
                    Réserver une table
                  </Button>
                  <Button as="a" href="#menu" variant="ghost" size="lg" color="white" borderColor="whiteAlpha.700" _hover={{ bg: 'whiteAlpha.200' }}>
                    Découvrir la carte
                  </Button>
                </HStack>
                <HStack spacing={3} flexWrap="wrap">
                  {HERO_BADGES.map((badge) => (
                    <Tag key={badge} size="lg" bg="whiteAlpha.200" color="white">
                      {badge}
                    </Tag>
                  ))}
                </HStack>
              </Stack>
              <Box bg="white" color="gray.800" p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="2xl">
                <Heading as="h2" size="md" mb={4}>
                  Moments clés
                </Heading>
                <Stack spacing={4}>
                  {HERO_MOMENTS.map((moment) => (
                    <Box key={moment.title}>
                      <Text fontWeight={700}>{moment.title}</Text>
                      <Text color="gray.600">{moment.description}</Text>
                    </Box>
                  ))}
                </Stack>
                <Divider my={6} />
                <Stack spacing={1}>
                  <Link href="tel:+33123456789" display="inline-flex" alignItems="center" gap={2}>
                    <PhoneIcon /> Réserver par téléphone
                  </Link>
                  <Text color="gray.600">18 Rue des Carmes, 75005 Paris</Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="experience" py={{ base: 20, md: 28 }}>
          <Container>
            <VStack spacing={4} align="flex-start" mb={12} maxW="3xl">
              <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                Expérience client
              </Text>
              <Heading as="h2" size="xl">
                Un parcours pensé pour séduire vos clients et partenaires
              </Heading>
              <Text fontSize="lg" color="gray.600">
                De la première impression digitale à l&apos;accueil en salle, chaque détail est conçu pour convertir vos visiteurs en ambassadeurs fidèles.
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {EXPERIENCE_CARDS.map((card) => (
                <Box key={card.title} bg="white" p={8} borderRadius="xl" boxShadow="md">
                  <Heading as="h3" size="md" mb={3}>
                    {card.title}
                  </Heading>
                  <Text color="gray.600">{card.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="menu" py={{ base: 20, md: 24 }} bg="white">
          <Container>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="start">
              <Stack spacing={5}>
                <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                  Carte signature
                </Text>
                <Heading as="h2" size="xl">
                  Une cuisine artisanale qui raconte un terroir
                </Heading>
                <Text color="gray.600">
                  Nos recettes suivent le rythme des saisons, avec des produits en direct des producteurs italiens : burrata crémeuse des Pouilles, truffe blanche d&apos;Alba, parmigiano reggiano affiné 36 mois.
                </Text>
                <List spacing={3} color="gray.700">
                  {HERO_FEATURES.map((feature) => (
                    <ListItem key={feature} display="flex" alignItems="flex-start" gap={3}>
                      <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                      <Text>{feature}</Text>
                    </ListItem>
                  ))}
                </List>
                <Button
                  as="a"
                  href="https://www.trattoria-aurora.fr/menu.pdf"
                  variant="ghost"
                  rightIcon={<ExternalLinkIcon />}
                  alignSelf="flex-start"
                >
                  Télécharger la carte
                </Button>
              </Stack>
              <Stack spacing={6}>
                {MENU_ITEMS.map((item) => (
                  <Box key={item.title} bg="gray.50" borderRadius="xl" p={6} border="1px solid" borderColor="gray.100">
                    <Heading as="h3" size="md">
                      {item.title}
                    </Heading>
                    <Text color="gray.600" my={3}>
                      {item.description}
                    </Text>
                    <Text fontWeight={700}>{item.price}</Text>
                  </Box>
                ))}
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="signature" py={{ base: 20, md: 28 }}>
          <Container>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
              <Box
                borderRadius="2xl"
                minH={{ base: 64, md: 96 }}
                bgImage="url('https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb0?auto=format&fit=crop&w=1200&q=80')"
                bgSize="cover"
                bgPos="center"
                position="relative"
                overflow="hidden"
              >
                <Box position="absolute" inset={0} bgGradient="linear(to-t, rgba(0,0,0,0.35), rgba(0,0,0,0))" />
              </Box>
              <Stack spacing={5}>
                <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                  Chef exécutif
                </Text>
                <Heading as="h2" size="xl">
                  La vision de Luca Bianchi
                </Heading>
                <Text color="gray.600">
                  Formé à Modène auprès de Massimo Bottura, Luca imagine une cuisine qui mêle audace contemporaine et respect des traditions italiennes. Chaque plat raconte l&apos;histoire d&apos;un producteur, d&apos;une famille et d&apos;un territoire.
                </Text>
                <List spacing={3} color="gray.700">
                  <ListItem>Masterclass mensuelle pour vos équipes et clients VIP</ListItem>
                  <ListItem>Création de menus personnalisés pour vos événements</ListItem>
                  <ListItem>Offres traiteur haut de gamme pour vos bureaux</ListItem>
                </List>
                <HStack spacing={4} flexWrap="wrap">
                  <Button as="a" href="#reservation" variant="primary">
                    Rencontrer le chef
                  </Button>
                  <Link href="https://www.instagram.com/trattoriaaurora" display="inline-flex" alignItems="center" gap={2}>
                    Suivre nos coulisses <ExternalLinkIcon />
                  </Link>
                </HStack>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="temoignages" py={{ base: 20, md: 24 }} bg="white">
          <Container>
            <VStack spacing={4} align="flex-start" mb={12} maxW="2xl">
              <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                Avis clients
              </Text>
              <Heading as="h2" size="xl">
                Ce que disent nos convives
              </Heading>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {TESTIMONIALS.map((testimonial) => (
                <Stack
                  key={testimonial.author}
                  bg="gray.50"
                  borderRadius="xl"
                  p={6}
                  spacing={4}
                  border="1px solid"
                  borderColor="gray.100"
                  shadow="sm"
                >
                  <Text fontStyle="italic" color="gray.700">
                    {testimonial.quote}
                  </Text>
                  <Box>
                    <Text fontWeight={700}>{testimonial.author}</Text>
                    <Text color="gray.500">{testimonial.role}</Text>
                  </Box>
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="entreprises" py={{ base: 20, md: 28 }}>
          <Container>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="flex-start">
              <Stack spacing={5}>
                <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                  Solutions entreprises
                </Text>
                <Heading as="h2" size="xl">
                  Accueillez vos clients et équipes dans un cadre signature
                </Heading>
                <Text color="gray.600">
                  Salon privatif modulable, matériel audiovisuel, menus personnalisables, service traiteur et accompagnement marketing pour valoriser votre événement.
                </Text>
                <List spacing={3} color="gray.700">
                  {BUSINESS_LIST.map((item) => (
                    <ListItem key={item} display="flex" alignItems="flex-start" gap={3}>
                      <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                      <Text>{item}</Text>
                    </ListItem>
                  ))}
                </List>
              </Stack>
              <Box as="form" onSubmit={handleFormSubmit} noValidate bg="white" p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="xl">
                <Heading as="h3" size="md" mb={6}>
                  Obtenir un devis sous 24h
                </Heading>
                <Stack spacing={5}>
                  <FormControl isRequired isInvalid={Boolean(errors.company)}>
                    <FormLabel htmlFor="company">Entreprise</FormLabel>
                    <Input
                      id="company"
                      name="company"
                      value={formValues.company}
                      onChange={handleInputChange}
                      autoComplete="organization"
                    />
                    <FormErrorMessage>{errors.company}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={Boolean(errors.email)}>
                    <FormLabel htmlFor="email">Email professionnel</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="event-date">Date envisagée</FormLabel>
                    <Input
                      id="event-date"
                      name="event-date"
                      type="date"
                      value={formValues['event-date']}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={Boolean(errors.message)}>
                    <FormLabel htmlFor="message">Type d&apos;événement</FormLabel>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Décrivez votre projet..."
                      value={formValues.message}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" variant="primary" size="lg" isDisabled={isSubmitting} isLoading={isSubmitting} loadingText="Envoi en cours…">
                    {formButtonLabel}
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <Link href="#">politique de confidentialité</Link>.
                  </Text>
                </Stack>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" py={{ base: 16, md: 20 }} bg="white">
          <Container>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {METRICS.map((metric) => (
                <Stack key={metric.label} align="center" spacing={1} py={6} borderRadius="xl" bg="gray.50" border="1px solid" borderColor="gray.100">
                  <Text fontSize="2xl" fontWeight={700} color="brand.600">
                    {metric.value}
                  </Text>
                  <Text color="gray.600">{metric.label}</Text>
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" id="reservation" py={{ base: 20, md: 28 }}>
          <Container>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
              <Stack spacing={5}>
                <Text textTransform="uppercase" letterSpacing="widest" fontSize="sm" color="brand.600">
                  Réservation
                </Text>
                <Heading as="h2" size="xl">
                  Réservez votre table ou privatisez un espace
                </Heading>
                <Text color="gray.600">
                  Disponibilités mises à jour en temps réel, confirmation instantanée et acompte sécurisé. Service conciergerie pour vos demandes spécifiques.
                </Text>
                <List spacing={3} color="gray.700">
                  {RESERVATION_POINTS.map((point) => (
                    <ListItem key={point} display="flex" alignItems="flex-start" gap={3}>
                      <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                      <Text>{point}</Text>
                    </ListItem>
                  ))}
                </List>
              </Stack>
              <Stack spacing={4} bg="white" p={{ base: 6, md: 8 }} borderRadius="xl" boxShadow="xl" align="flex-start">
                <Button as="a" href="https://bookings.trattoria-aurora.fr" variant="primary" size="lg">
                  Réserver en ligne
                </Button>
                <Button as="a" href="tel:+33123456789" variant="ghost" leftIcon={<PhoneIcon />}>Par téléphone</Button>
                <Link href="mailto:events@trattoria-aurora.fr" display="inline-flex" alignItems="center" gap={2}>
                  <EmailIcon /> events@trattoria-aurora.fr
                </Link>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      <Box as="footer" bg="gray.900" color="gray.100" pt={{ base: 16, md: 20 }} pb={10}>
        <Container>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} mb={12}>
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="white">
                Trattoria Aurora
              </Heading>
              <Text>18 Rue des Carmes, 75005 Paris</Text>
              <Text>Métro Maubert-Mutualité</Text>
              <Stack spacing={1}>
                <Link href="tel:+33123456789" display="inline-flex" alignItems="center" gap={2}>
                  <PhoneIcon /> +33 1 23 45 67 89
                </Link>
                <Link href="mailto:bonjour@trattoria-aurora.fr" display="inline-flex" alignItems="center" gap={2}>
                  <EmailIcon /> bonjour@trattoria-aurora.fr
                </Link>
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="white">
                Horaires
              </Heading>
              <List spacing={2} color="gray.300">
                {FOOTER_SCHEDULE.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </List>
            </Stack>
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="white">
                Suivez-nous
              </Heading>
              <List spacing={2}>
                {SOCIAL_LINKS.map((link) => (
                  <ListItem key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack spacing={3}>
              <Heading as="h3" size="md" color="white">
                Espace presse
              </Heading>
              <List spacing={2}>
                {FOOTER_RESOURCES.map((resource) => (
                  <ListItem key={resource.label}>
                    <Link href={resource.href}>{resource.label}</Link>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </SimpleGrid>
          <Divider borderColor="whiteAlpha.300" mb={6} />
          <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'flex-start', md: 'center' }} gap={4}>
            <Text fontSize="sm">© 2024 Trattoria Aurora. Tous droits réservés.</Text>
            <HStack spacing={4} fontSize="sm">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.label} href={link.href} color="gray.300">
                  {link.label}
                </Link>
              ))}
            </HStack>
          </Flex>
        </Container>
      </Box>

      <IconButton
        position="fixed"
        bottom={{ base: 4, md: 8 }}
        right={{ base: 4, md: 8 }}
        aria-label="Revenir en haut"
        icon={<ArrowUpIcon />}
        variant="primary"
        onClick={handleBackToTop}
        opacity={showBackToTop ? 1 : 0}
        visibility={showBackToTop ? 'visible' : 'hidden'}
        transition="all 0.3s ease"
        pointerEvents={showBackToTop ? 'auto' : 'none'}
      />
    </Box>
  );
}
