import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion as Motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useForm } from '../hooks/useForm';

const Login = () => {
	const { dispatch } = useApp();
	const [authError, setAuthError] = useState('');

	const validate = (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(values.email)) {
			errors.email = 'Email address is invalid';
		}
		
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}
		return errors;
	};

	const { values, errors, handleChange, handleSubmit } = useForm(
		{ email: '', password: '' },
		validate
	);

	const onSubmit = (formData) => {
		if (formData.email === 'john@example.com' && formData.password === 'password123') {
			dispatch({ type: 'LOGIN', payload: { name: 'John Doe', email: formData.email } });
		} else {
			setAuthError('Invalid credentials. Check the demo login.');
		}
	};

	return (
		<div className='max-w-7xl mx-auto px-6 min-h-[calc(100vh-80px)] flex items-center justify-center py-20'>
			<Motion.div 
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className='w-full max-w-md p-10 glass-card'
			>
				<div className='text-center mb-10'>
					<h1 className='text-4xl font-black text-white tracking-tighter mb-2 uppercase'>Operative Login</h1>
					<p className='text-slate-400 font-bold'>Authenticate to access the armory</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					{authError && (
						<div className='p-4 bg-red-500/10 border border-red-500/20 rounded-none text-red-400 text-xs font-bold text-center'>
							{authError}
						</div>
					)}
					
					<div className='space-y-2'>
						<div className='flex justify-between items-end px-1'>
							<label className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>Email Address</label>
							{errors.email && <span className='text-[10px] text-red-400 font-bold'>{errors.email}</span>}
						</div>
						<div className='relative group'>
							<Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within:text-primary'}`} size={18} />
							<input 
								type='email' 
								name='email'
								value={values.email}
								onChange={handleChange}
								className={`w-full pl-12 pr-4 py-4 bg-dark-surface/50 border rounded-none focus:outline-none focus:ring-2 focus:bg-white/5 transition-all text-white placeholder:text-slate-600 font-bold ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-dark-border focus:ring-primary/50'}`}
								placeholder='john@example.com'
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<div className='flex justify-between items-end px-1'>
							<label className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>Password</label>
							{errors.password && <span className='text-[10px] text-red-400 font-bold'>{errors.password}</span>}
						</div>
						<div className='relative group'>
							<Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-slate-500 group-focus-within:text-primary'}`} size={18} />
							<input 
								type='password' 
								name='password'
								value={values.password}
								onChange={handleChange}
								className={`w-full pl-12 pr-4 py-4 bg-dark-surface/50 border rounded-none focus:outline-none focus:ring-2 focus:bg-white/5 transition-all text-white placeholder:text-slate-600 font-bold ${errors.password ? 'border-red-500/50 focus:ring-red-500/50' : 'border-dark-border focus:ring-primary/50'}`}
								placeholder='password123'
							/>
						</div>
					</div>

					<button type='submit' className='w-full btn-primary flex items-center justify-center gap-2 mt-4'>
						<LogIn size={20} />
						<span>AUTHORIZE</span>
					</button>
				</form>

				<div className='mt-10 pt-10 border-t border-white/5'>
					<div className='bg-primary/5 p-4 rounded-none border border-primary/20'>
						<p className='text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2'>Demo Credentials</p>
						<div className='flex justify-between items-center'>
							<div>
								<p className='text-[10px] text-slate-500 uppercase font-bold'>Email</p>
								<p className='text-xs font-bold text-white'>john@example.com</p>
							</div>
							<div>
								<p className='text-[10px] text-slate-500 uppercase font-bold'>Pass</p>
								<p className='text-xs font-bold text-white'>password123</p>
							</div>
						</div>
					</div>
				</div>
			</Motion.div>
		</div>
	);
};

export default Login;
