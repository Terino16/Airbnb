import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
const Navbar = () => {
  return (
    <div
    className='py-4
    border-b-[1px]'>
        <Container>
            <div className='flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0'>
          <div className=''>
           <Logo/>
           </div>

           <div className='hidden sm:block'>
  <Search />
</div>

           <UserMenu/>
            </div>

        </Container>
    </div>
  )
}

export default Navbar