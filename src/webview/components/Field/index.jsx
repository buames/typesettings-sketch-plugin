import styled from '@emotion/styled'
import { space } from 'webview/style/variables'

const Field = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: ${ props => (props.wrap ? 'wrap' : null) };
  padding-top: ${ space[1] };
  padding-bottom: ${ space[1] };
`

export default Field
