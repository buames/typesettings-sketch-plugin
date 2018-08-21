import styled from '@emotion/styled'
import {
  colors,
  font,
  radii,
  space
} from 'webview/style/variables'

export const Input = styled.input`
  appearance: none;
  background: ${ colors.white.base };
  border: 0;
  border-radius: ${ radii[1] }px;
  box-shadow: inset 0 0 0 1px ${ colors.black.l92 };
  margin: 0;
  padding: ${ space[1] };
  width: 100%;

  ${ font.s12.n400 };
  color: ${ colors.black.l10 };

  &:focus {
    box-shadow: inset 0 0 0 1px ${ colors.brand.base };
    outline: none;
  }

  &:disabled {
    background-color: ${ colors.black.l97 };
    cursor: not-allowed;
  }

  &::placeholder {
    ${ font.s12.n400 };
    color: ${ colors.black.l55 };
  }
`

export const InputLabel = styled.label`
  ${ font.s12.n400 };
  color: ${ colors.black.l10 };
  padding-top: ${ space[1] };
  padding-bottom: ${ space[1] };
  width: 100%;
`
