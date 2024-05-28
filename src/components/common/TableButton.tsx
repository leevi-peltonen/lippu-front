
interface TableButtonProps <T> {
    action(value: T): void
    value: T
    label: string
}

const TableButton = <T,>({action, value, label}: TableButtonProps<T>): JSX.Element => {

    const handleClick = () => {
        action(value)
    }

    return (
        <button onClick={handleClick}>{label}</button>
    )
}

export default TableButton