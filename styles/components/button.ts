import { defineRecipe } from '@chakra-ui/react'

const Button = defineRecipe({
  className: 'button',
  base: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 0,
    letterSpacing: '0.0625rem', 
    lineHeight: '1.2',
    transition: 'all 0.3s ease-in-out',
    p: 0, 
  },

  variants: {
    variant: {
      primary: {
        bg: 'accent',
        color: 'white',
        fontSize: '0.875rem',
        css: {
          paddingLeft: '2.5rem !important',
          paddingRight: '2.5rem !important',
          paddingTop: '1.125rem !important', 
          paddingBottom: '1.125rem !important', 
        },
        _hover: {
          bg: 'accentLight',
        },
        _active: {
          transform: 'scale(0.98)',
        },
        _disabled: {
          bg: 'accent',
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },

      secondary: {
        bg: 'transparent',
        color: 'black',
        border: '1px solid black',
        fontSize: '0.875rem',
        css: {
          paddingLeft: '2.5rem !important',
          paddingRight: '2.5rem !important',
          paddingTop: '1.125rem !important',
          paddingBottom: '1.125rem !important',
        },
        _hover: {
          bg: 'black',
          color: 'white',
        },
      },

      link: {
        background: 'transparent',
        border: 'none',
        color: 'text',
        px: 0,
        py: 0,
        fontWeight: 'normal',
        _hover: {
          textDecoration: 'underline',
          cursor: 'pointer',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

export default Button
