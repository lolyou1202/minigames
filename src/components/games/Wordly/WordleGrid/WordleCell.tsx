import {
	BorderedButton,
	BorderedButtonProps,
} from '../../../BorderedButton/BorderedButton'

export const WordleCell = <
	Props extends Pick<BorderedButtonProps, 'text' | 'className'>
>(
	props: Props
) => {
	return <BorderedButton {...props} variant='withoutShadow' />
}
