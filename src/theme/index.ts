import { extendTheme, ThemeConfig } from '@chakra-ui/react';
/* no mode helper needed; using semantic tokens */

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    // Sage/olive brand palette for an elegant restaurant feel
    brand: {
      50: '#F4F7F5',
      100: '#E3ECE6',
      200: '#C2D9CD',
      300: '#9FC4B0',
      400: '#79AE93',
      500: '#5A957A',
      600: '#3F7B62',
      700: '#2F5E4B',
      800: '#224438',
      900: '#162C25',
    },
  },
  semanticTokens: {
    colors: {
      'bg.canvas': '#FAF7F2',
      'bg.surface': 'white',
      'bg.footer': 'brand.900',
      'bg.sectionMuted': '#F3F0EA',
      'card.bg': 'white',
      'card.border': '#E7E2DA',
      'text.default': '#1F2937',
      'text.muted': 'gray.600',
      'text.footer': 'whiteAlpha.900',
      'border.muted': '#E7E2DA',
      link: 'brand.700',
      'link.footer': 'brand.200',
    },
  },
  fonts: {
    heading: 'var(--font-playfair), serif',
    body: 'var(--font-source-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        minHeight: '100%',
        backgroundColor: 'bg.canvas',
        color: 'text.default',
      },
      a: {
        fontWeight: 600,
        color: 'link',
      },
    },
  },
  components: {
    Button: {
      baseStyle: { fontWeight: 600, borderRadius: 'full' },
      variants: {
        primary: {
          bg: 'brand.600',
          color: 'white',
          _hover: { bg: 'brand.700' },
          _active: { bg: 'brand.800' },
        },
        ghost: {
          bg: 'transparent',
          color: 'link',
          border: '1px solid',
          borderColor: 'border.muted',
          _hover: { bg: 'brand.50' },
          _active: { bg: 'brand.100' },
        },
      },
    },
    Container: {
      baseStyle: {
        maxW: '6xl',
        px: { base: 6, md: 8 },
      },
    },
  },
});

export default theme;
