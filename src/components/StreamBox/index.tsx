import { useEffect , useState } from 'react'

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
      let data = JSON.parse(atob(`${props.id}`))
      setName(data.name)
  },[props.id])

  return (
      <StreamBoxContainer>
          <StyledStreamBox id={`${props.id}_container`} />
          <UserDetails>{ name }</UserDetails>
      </StreamBoxContainer>
  )
}

export default StreamBox