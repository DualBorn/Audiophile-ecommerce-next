import { defineRecipe } from '@chakra-ui/react'

const Input = defineRecipe({
  className: 'input',
  base: {
    fontWeight: 'bold',
    borderRadius: '0.5rem',
    _placeholder: {
      color: 'placeholder',
    },
  },
  variants: {
    size: {
      regular: {
        pl: '1rem',
        py: '1rem',
        fontSize: '0.875rem',
      },
    },
  },
  defaultVariants: {
    size: 'regular',
  },
})

export default Input
