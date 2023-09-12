import clsx from "clsx";

function getClassName({ className }) {
    return clsx(
        'text-black text-lg font-bold transition-duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded',
        className
    )
}

const sizes = {
    tiny: 'px-2',
    small: 'px-4 py-3',
    medium: 'px-6 py-4',
    large: 'w-full px-4 py-3'
}

const variants = {
    primary: 'bg-marigold-500 focus:ring-marigold hover:bg-marigold-600',
    secondary: 'bg-tomato focus:ring-tomato',
    dark: 'bg-black focus:ring-white',
    white: 'bg-white hover:bg-marigold-200 focus:bg-marigold-500',
}

const Button = ({
                    children,
                    className,
                    size = 'small',
                    variant = 'primary',
                    ...rest
                }) => {
    return (
        <button className={clsx(
            sizes[size],
            variants[variant],
            getClassName({ className })
        )}
                {...rest}
        >
            {children}
        </button>
    )
}

export default Button;