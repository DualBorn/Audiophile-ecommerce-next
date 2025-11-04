import { Text, HStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

type SummaryLineProps = {
  name: string
  amount: number
  [props: string]: unknown
  grandTotal?: boolean
}

const SummaryLine: React.FC<SummaryLineProps> = (props): ReactElement => {
  const { name, amount, grandTotal = false, ...other } = props
  return (
    <HStack justify="space-between" {...other}>
      <Text as="dt" textTransform="uppercase">
        {name}
      </Text>
      <Text
        as="dd"
        textTransform="uppercase"
        fontWeight="bold"
        fontSize="1.125rem"
        color={grandTotal ? 'accent' : 'black'}
      >
        $ {amount.toLocaleString('en-US')}
      </Text>
    </HStack>
  )
}

export default SummaryLine
