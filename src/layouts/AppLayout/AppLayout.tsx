import './AppLayout.style.scss'
import React from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Header } from '../../components/Header/Header'
import { Main } from '../../components/Main/Main'

export interface AppLayoutProps {
	variantHeader?: 'withSearch' | 'withBanner'
	headerLabel?: string
	variantMain?: 'withCanvas' | 'empty'
	children?: React.ReactNode
}

export const AppLayout = ({
	variantHeader = 'withSearch',
	headerLabel = 'Label',
	variantMain = 'empty',
	children,
}: AppLayoutProps) => {
	return (
		<div className='appLayout'>
			<Sidebar />
			<section className='mainSection'>
				<Header
					variantHeader={variantHeader}
					headerLabel={headerLabel}
				/>
				<Main variantMain={variantMain}>{children}</Main>
			</section>
		</div>
	)
}
