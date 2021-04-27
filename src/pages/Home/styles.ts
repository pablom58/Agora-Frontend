import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around; 
`

export const ButtonLink = styled(Link)`
  text-decoration: none;
  border: 1px solid #099DFD;
  padding: 5px;
  color: #000;
`