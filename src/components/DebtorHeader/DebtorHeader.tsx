import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { DebtorHeaderRoot } from './DebtorHeader.style'

type Props = {
  name: string
}

export const DebtorHeader = ({ name }: Props) => (
  <DebtorHeaderRoot>
    <Text size="sm" tone="muted" weight="medium">
      Panel dłużnika
    </Text>
    <Heading level={1}>{name}</Heading>
  </DebtorHeaderRoot>
)
