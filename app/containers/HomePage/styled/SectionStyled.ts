import styled from 'styles/styled-components'

export interface SectionStyledProps {
  width?: string
}

export const SectionStyled = styled.section<SectionStyledProps>`
  margin: 0 auto 2em;
  width: ${(props) => props.width || '100%'};
  float: left;
`
