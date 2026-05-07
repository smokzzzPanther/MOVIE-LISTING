import { useState } from 'react';

export function useForm(initialValues, validate) {
	// Form state: stores current field values and validation errors.
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	// Input handler: updates the field that matches the input name attribute.
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
		// Submit validation: blocks onSubmit until the validate function returns no errors.
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
