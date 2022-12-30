import React,{useContext} from 'react'
import { Container } from 'react-bootstrap'
import { useTheme } from '../Context/ColorMode'
import { UserContexts } from '../App'

export default function Trending() {
const user = useContext(UserContexts)

  const darkTheme = useTheme()

  const themeStyle = {
    backgroundColor:darkTheme?'#333 ':'#f6f6f6',
    color:darkTheme?'#f6f6f6':'#333',
  }
  return (
    <Container className='mainContainer' fluid style={themeStyle}>
      Trending
      <div>{user !== undefined ? user.username:''}</div>
      {/* {console.log(user.username)} */}
      </Container>

  )
}
