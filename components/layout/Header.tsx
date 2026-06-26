import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
	<nav className='w-[90%] mx-auto flex justify-between items-center py-4'>
		<Link href="/">Tracker</Link>

		<div className='flex gap-4 items-center'>
			<input type="text" className='' />
			<Link href="/expenses/new">New request</Link>
			<Link href="/auth">Sign up</Link>
		</div>
	</nav>
  )
}

export default Header