import { useEffect , useState } from 'react'
import { v4 } from 'uuid'

import {
    StreamBoxContainer,
    StyledStreamBox,
    UserDetails
} from './styles'

const StreamBox = (props : any) => {
  const [name,setName] = useState<string>('')

  //start video stream in this container
  useEffect(() => {
      if(props.stream && props.video)
          props.stream.play(`${props.id}_container`)
  },[props.stream, props.video, props.id])

  //put the user name in local state to show it
  useEffect(() => {
    //   let data = JSON.parse(atob(`${props.id}`))
      setName(v4())
  },[props.id])

  return (
      <StreamBoxContainer>
          <StyledStreamBox id={`${props.id}_container`} />
          <UserDetails>{ name }</UserDetails>
      </StreamBoxContainer>
  )
}

export default StreamBox