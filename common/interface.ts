export interface Cell {
	id?: string | number
	title: string | number
	label?: string | number
	value?: string | number | boolean
	icon?: string
	rightIcon?: string
	isRightIcon?: boolean
	url?: string
	height?: string | number
	type?: string | number
	event?: string
}

export interface Item {
	icon?: string,
	name: string
}