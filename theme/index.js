import { extendTheme } from '@chakra-ui/react';

const brandColors = {
  50: '#FFF3EC',
  100: '#FFD9C7',
  200: '#FFBFA1',
  300: '#FFA47C',
  400: '#FF8A57',
  500: '#F16F3B',
  600: '#C7562D',
  700: '#9C3F20',
  800: '#712913',
  900: '#471407'
};

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  colors: {
    brand: brandColors
  },
  fonts: {
    heading: 'var(--font-playfair), serif',
    body: 'var(--font-source-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  styles: {
    global: {
      'html, body': {
        minHeight: '100%',
        backgroundColor: 'gray.50'
      },
      html: {
        scrollBehavior: 'smooth'
      },
      body: {
        color: 'gray.800'
      },
      a: {
        color: 'brand.600',
        fontWeight: 600,
        _hover: { color: 'brand.700' }
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: 'full'
      },
      variants: {
        primary: {
          bg: 'brand.600',
          color: 'white',
          _hover: { bg: 'brand.700' },
          _active: { bg: 'brand.800' }
        },
        ghost: {
          bg: 'transparent',
          color: 'brand.600',
          border: '1px solid',
          borderColor: 'brand.200',
          _hover: { bg: 'brand.50' },
          _active: { bg: 'brand.100' }
        }
      }
    },
    Link: {
      baseStyle: {
        fontWeight: 600,
        _hover: { textDecoration: 'none', color: 'brand.700' }
      }
    },
    Container: {
      baseStyle: {
        maxW: '6xl',
        px: { base: 6, md: 8 }
      }
    }
  }
});

export default theme;
