import { forwardRef } from 'react'
import { Box, Input, Text, Flex } from '@chakra-ui/react'

type FormFieldProps = {
  label: string
  placeholder: string
  type?: string
  gridArea?: { [key: string]: string } | string
  errors: { message: string } | undefined
  [prop: string]: unknown
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  const { label, placeholder, type = 'text', gridArea, ...other } = props

  let errorMessage: string | undefined
  if (props.errors) {
    errorMessage = (props.errors as { message: string }).message
  }

  return (
    <Box gridArea={gridArea as any}>
      <Flex justify="space-between">
        <Box
          as="label"
          fontSize="0.75rem"
          fontWeight="bold"
          // @ts-expect-error - htmlFor prop on Box with as="label"
          htmlFor={label}
          display="inline-block"
          mb={2}
          color={props['errors'] ? 'inputError' : 'black'}
        >
          {label as React.ReactNode}
        </Box>
        {errorMessage && (
          <Text aria-live="polite" color="inputError" fontSize="0.75rem" mb={2}>
            {errorMessage}
          </Text>
        )}
      </Flex>
      <Input
        ref={ref}
        {...other}
        type={type as any}
        placeholder={placeholder as string}
        border="1px solid"
        borderColor={props['errors'] ? 'inputError' : 'inputBorder'}
        id={label as string}
      />
    </Box>
  )
})

FormField.displayName = 'FormField'

export default FormField
