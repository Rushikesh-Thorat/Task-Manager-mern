import React, {useState} from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div>
            <label className="text-lg text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={onChange}
                />

                {type === 'password' && (
                    showPassword ? (
                        <FaEye
                            size={22}
                            className="text-primary cursor-pointer"
                            onClick={toggleShowPassword}
                        />
                    ) : (
                        <FaEyeSlash
                            size={22}
                            className="text-slate-500 cursor-pointer"
                            onClick={toggleShowPassword}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default Input

