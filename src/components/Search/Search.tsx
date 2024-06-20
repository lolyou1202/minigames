import './Search.style.scss'
import { BorderedContainer } from '../BorderedContainer/BorderedContainer'
import SVG from 'react-inlinesvg'
import React from 'react'
import { useDebounce } from 'use-debounce'
import classNames from 'classnames'

export const Search = () => {
	const [searchValue, setSearchValue] = React.useState('')
	const [debouncedSearchValue] = useDebounce(searchValue, 500)

	const handleChangeInput = (value: string) => {
		setSearchValue(value)
	}
	const handleClickLoupe = () => {}
	const handleClickCross = () => {
		setSearchValue('')
	}

	const crossIconCN = classNames('search-icon', 'cross', {
		hidden: searchValue === '',
	})

	return (
		<BorderedContainer
			variant='withShadow'
			background='light'
			className='search'
		>
			<SVG
				src='../../../icons/search.svg'
				width={32}
				className='search-icon loupe'
				onClick={handleClickLoupe}
			/>
			<input
				type='text'
				className='search-input'
				placeholder='Search game...'
				value={searchValue}
				onChange={e => {
					handleChangeInput(e.target.value)
				}}
			/>
			<SVG
				src='../../../icons/cross.svg'
				width={32}
				className={crossIconCN}
				onClick={handleClickCross}
			/>
		</BorderedContainer>
	)
}
