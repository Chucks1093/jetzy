import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

interface FormInputProps {
	label: string;
	value: string | number;
	onChange: (value: string) => void;
	placeholder?: string;
	type?: 'text' | 'email' | 'tel' | 'password' | 'textarea' | 'number';
	required?: boolean;
	error?: string | number;
	touched?: boolean;
	disabled?: boolean;
	inputClassName?: string;
	className?: string;
	rows?: number;
	maxLength?: number;
	autoComplete?: string;
	id?: string;
	// Prefix and suffix elements
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	// Optional wrapper className for the input container
	wrapperClassName?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
	label,
	value,
	onChange,
	placeholder = '',
	type = 'text',
	required = false,
	error = '',
	touched = false,
	disabled = false,
	inputClassName = '',
	className = '',
	rows = 3,
	maxLength,
	autoComplete,
	id,
	prefix,
	suffix,
	wrapperClassName = '',
}) => {
	const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
	const hasError = error && touched;

	const baseInputStyles = cn(`
		w-full px-4 py-2 border-none rounded-md transition-colors duration-200 outline-none
		focus:ring-0 focus:ring-blue-500  h-14
		placeholder:text-gray-400 
		disabled:bg-gray-100 disabled:cursor-not-allowed bg-white  selection:bg-blue-500 selection:text-white 
		${
			hasError
				? 'border-red-500 focus:border-red-500 focus:ring-red-500'
				: 'border-gray-300 focus:border-blue-500'
		}
		${inputClassName}
	`);

	const containerStyles = cn(`
		relative flex items-center w-full border ring-0  rounded-md transition-colors duration-200  
		${
			hasError
				? 'border-red-500  focus-within:ring-red-200/70 focus-within:ring-[3px]'
				: 'border-gray-300 focus-within:ring-gray-300/70 focus-within:ring-[3px]'
		}
		${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
		${wrapperClassName}
	`);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		onChange(e.target.value);
	};

	const renderInput = () => {
		const commonProps = {
			id: inputId,
			value,
			onChange: handleChange,
			placeholder,
			disabled,
			maxLength,
			autoComplete,
			className: cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-green-400/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md',

				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-gray-200',
				baseInputStyles
			),
		};

		if (type === 'textarea') {
			return (
				<Textarea
					{...commonProps}
					rows={rows}
					style={{ resize: 'none', height: '140px' }} // 56px is h-14 (tailwind), adjust as needed
				/>
			);
		}

		return <input {...commonProps} type={type} />;
	};

	const renderInputWithElements = () => {
		// Always use container approach now for consistency
		return (
			<div className={containerStyles}>
				{prefix}
				{renderInput()}
				{suffix}
			</div>
		);
	};

	return (
		<div className={cn('space-y-2', className)}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-gray-600"
				>
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}

			{renderInputWithElements()}

			{hasError && (
				<p
					id={`${inputId}-error`}
					className="text-sm text-red-600"
					role="alert"
				>
					{error}
				</p>
			)}
		</div>
	);
};

export default FormInput;
