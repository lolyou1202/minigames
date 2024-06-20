import './AppLayout.style.scss'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Header } from '../../components/Header/Header'
import { Main } from '../../components/Main/Main'
import React from 'react'

export interface AppLayoutProps {
	variantHeader?: 'withSearch' | 'withBanner'
	variantMain?: 'withCanvas' | 'empty'
	children?: React.ReactNode
}

export const AppLayout = ({
	variantHeader = 'withSearch',
	variantMain = 'empty',
	children,
}: AppLayoutProps) => {
	return (
		<div className='appLayout'>
			<Sidebar />
			<section className='mainSection'>
				<Header variantHeader={variantHeader} />
				<Main variantMain={variantMain}>{children}</Main>
			</section>
		</div>
	)
}
