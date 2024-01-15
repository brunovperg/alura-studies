import style from './Button.module.scss';

interface ButtonProps {
	text: string;
	type?: 'submit' | 'button' | 'reset';
	onClick?: () => void | undefined;
}
export default function Button({
	text,
	type = 'button',
	onClick = () => {},
}: ButtonProps) {
	

	return (
		<button type={type} className={style.botao} onClick={onClick}>
			{text}
		</button>
	);
}
