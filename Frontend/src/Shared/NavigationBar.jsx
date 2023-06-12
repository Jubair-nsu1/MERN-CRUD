import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProviders';




const NavigationBar = () => {
    const { user, logOut } = useContext(AuthContext)
    // const [cart] = useCart()
    // const [isAdmin] = useAdmin()

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(() => { })

    }

    const navigationLink = <>

        <li><Link to='/'>Home</Link></li>


        {
            user && <li><Link to='/dashboard/add-products'>Dashboard</Link></li>
        }


        <li><Link to='/'>Blogs</Link></li>
        <li><Link to='/'>About</Link></li>




    </>
    return (
        <div className="navbar fixed z-10  bg-opacity-30 max-w-screen-xl mx-auto text-white bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact text-black dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navigationLink}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Crud Operation</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {navigationLink}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                {user ? <button className="btn btn-warning   px-1" onClick={handleLogOut}>Logout</button> :
                    <Link to='/login' className="btn btn-warning px-1"> Login </Link>
                }


                {
                    user?.photoURL && <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img title={user?.displayName} src={user?.photoURL} alt="" />
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default NavigationBar;