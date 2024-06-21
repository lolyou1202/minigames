import {
	BorderedButton,
	BorderedButtonProps,
} from '../../../BorderedButton/BorderedButton'

export const WordlyCell = <
	Props extends Pick<BorderedButtonProps, 'text' | 'className'>
>(
	props: Props
) => {
	return <BorderedButton {...props} variant='withoutShadow' />
}
