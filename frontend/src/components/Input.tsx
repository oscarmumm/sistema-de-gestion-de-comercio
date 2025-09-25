interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
    return (
        <div className='flex flex-col'>
            <label className="font-medium">{label}</label>
            <input
                {...props}
                className='p-3 my-3 outline-none shadow-lg rounded-lg bg-white'
            />
        </div>
    );
};
