import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import InteractiveLiveStreamingHost from './pages/InteractiveLiveStreamingHost'
import InteractiveLiveStreamingAudience from './pages/InteractiveLiveStreamingAudience'

const App = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/streaming/host' exact component={InteractiveLiveStreamingHost} />
      <Route path='/streaming/audience' exact component={InteractiveLiveStreamingAudience} />
    </Switch>
  )
}

export default App