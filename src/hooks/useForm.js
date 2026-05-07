import { useState } from 'react';

export function useForm(initialValues, validate) {
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});

		// Clear error when user types
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: null,
			});
		}
	};

	const handleSubmit = (onSubmit) => (e) => {
		e.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			onSubmit(values);
		}
	};

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
	};
}
