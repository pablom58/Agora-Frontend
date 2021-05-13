import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import InteractiveLiveStreamingHost from './pages/InteractiveLiveStreamingHost'
import InteractiveLiveStreamingAudience from './pages/InteractiveLiveStreamingAudience'
import Room1 from './pages/Room1'

const App = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/streaming/host' exact component={InteractiveLiveStreamingHost} />
      <Route path='/streaming/audience' exact component={InteractiveLiveStreamingAudience} />
      <Route path='/room-1' exact component={Room1} />
    </Switch>
  )
}

export default App