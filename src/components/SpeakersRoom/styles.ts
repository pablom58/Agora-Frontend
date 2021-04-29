import styled from 'styled-components'

export const ContainerLayout1 = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const StreamBoxContainerLayout1 = styled.div`
  width: 100%;
  height: 90%;
  min-height: 90vh;
  background: #1c1c1c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`

export const ActionButtonsContainerLayout1 = styled.div`
  width: 100%;
  height: 10%;
  min-height: 10vh;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

export const TotalSpeakers = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 100%;
  background: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  z-index: 100;
  align-self: flex-start;
`