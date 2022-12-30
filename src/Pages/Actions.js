import React from 'react'
import { Container } from 'react-bootstrap'
import { useTheme } from '../Context/ColorMode'
// import { Popover } from 'react-bootstrap'

export default function Actions() {
  const darkTheme = useTheme()

  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }
  return (
    <Container fluid className='mainContainer' style={themeStyle}>
      <div> hi action </div>
  
 </Container>
  )
}
