import React from 'react'

function Header({title}) {
  return (
    <header>
        <ul className=''>
            <ol>{title}</ol>
            <ol>About</ol>
            <ol>profile</ol>
        </ul>
    </header>
  )
}

export default Header
