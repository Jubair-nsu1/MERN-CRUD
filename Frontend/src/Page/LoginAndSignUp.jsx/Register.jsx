import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProviders';



const Register = () => {

    const { createAccount, userName } = useContext(AuthContext)
    const [error, setError] = useState('')


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [img, setImg] = useState('')



    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')


    const navigate = useNavigate()
    const location = useLocation()


    const handleRegister = (event) => {
        event.preventDefault()
        const eventTarget = event.target
       

        console.log(location)

        const from = location.state?.from?.pathname || '/'

        if (password.length < 6) {
            setError('At least give me 6 characters')
        }



        createAccount(email, password)
            .then(result => {
                const newAccount = result.user
                userName(name, img)
                eventTarget.reset()
                navigate(from)
                console.log(newAccount)
            })
            .catch((error) => {
                console.log(error.message)
                setError('Please Give Me Valid Email')
            })

    }



    const handleName = (event) => {
        const name = event.target.value
        setName(name)
    }

    const handleEmail = (event) => {
        const email = event.target.value
        setEmail(email)
        // /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

        // eslint-disable-next-line no-useless-escape
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {

            setEmailError('Please Give Me Valid Email')
        }
        else {
            setEmailError('')
        }

    }


    console.log(password)

    const handlePassword = (event) => {
        const password = event.target.value
        setPassword(password)

        if (password.length < 6) {
            setPasswordError(`At Least Give Me Six Character`)
        }
        else {
            setPasswordError('')
        }

    }

    const handlePhoto = (event) => {
        const photoUrl = event.target.value
        setImg(photoUrl)
    }



    return (
        <form onSubmit={handleRegister} className="hero py-24 banner-register min-h-screen -z-0 bg-base-200">
            <div className="flex-col p-10 ">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Please Register</h1>
                </div>

                <div className="flex-shrink-0 rounded-lg  w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input onChange={handleName} name='name' type="text" placeholder="Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo Url</span>
                            </label>
                            <input onChange={handlePhoto} name="photo" type="photo" placeholder="Your Photo" className="input input-bordered" required />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={handleEmail} name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        {email && <p className='text-sm text-red-700'><small>{emailError}</small></p>
                        }

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={handlePassword} name='password' type="password" placeholder="password" className="input input-bordered" required />
                        </div>

                        {password && <p className='text-sm text-red-700'><small>{passwordError}</small></p>
                        }

                        <div className="form-control mt-6">
                            <button disabled={!email || !password || !img || !name || passwordError || emailError} className="btn btn-warning">Register</button>
                        </div>
                        <p><small>Already have an account? <Link className='font-semibold' to='/login'>Login</Link></small></p>
                        <p className='text-red-400 text-sm'>{error}</p>

                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;