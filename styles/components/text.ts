import { defineRecipe } from '@chakra-ui/react'

const Text = defineRecipe({
  className: 'text',
  base: {
    fontWeight: 'normal',
    lineHeight: '1.66',
  },
  variants: {
    variant: {
      lightBackground: {
        color: 'text',
      },
      darkBackground: {
        color: 'textLight',
      },
    },
    size: {
      regular: {
        fontSize: '0.9375rem',
      },
    },
  },
  defaultVariants: {
    variant: 'lightBackground',
    size: 'regular',
  },
})

export default Text
