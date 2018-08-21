import styled from '@emotion/styled'
import {
  colors,
  font,
  radii,
  space
} from 'webview/style/variables'

export const CheckboxInput = styled.input`
  appearance: none;
  background: ${ colors.black.l100 };
  border: 0;
  border-radius: ${ radii[1] }px;
  box-shadow: inset 0 0 0 1px ${ colors.black.l92 };
  height: 14px;
  margin: 0;
  width: 14px;

  &:checked {
    box-shadow: inset 0 0 0 1px ${ colors.brand.base };
    background: ${ colors.brand.base };
    outline: none;
  },
  
  &:hover {
    cursor: pointer;
  }
`

export const CheckboxLabel = styled.label`
  ${ font.s12.n400 };
  color: ${ colors.black.l10 };
  padding-left: ${ space[1] };
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`
