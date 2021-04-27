import {
  Container,
  ButtonLink
} from './styles'

const Home = () => {
  return (
    <Container>
      <ButtonLink to='/'>Voice Call</ButtonLink>
      <ButtonLink to='/'>Video Call</ButtonLink>
      <ButtonLink to='/streaming/host'>Interactive Live Streaming Host</ButtonLink>
      <ButtonLink to='/streaming/audience'>Interactive Live Streaming Audience</ButtonLink>
    </Container>
  )
}

export default Home