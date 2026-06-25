import React from 'react'

const Header = () => {
  return (
	<nav className='w-[90%] mx-auto flex justify-between items-center py-4'>
		<p>Tracker</p>

		<div className='flex gap-4 items-center'>
			<input type="text" className='' />
			<button>New request</button>
		</div>
	</nav>
  )
}

export default Header