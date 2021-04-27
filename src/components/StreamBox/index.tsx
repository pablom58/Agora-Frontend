import { useEffect , useState } from 'react'

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
      <div id={`${props.id}_container`} style={{ width: '400px', height: '300px' }}>
      </div>
  )
}

export default StreamBox