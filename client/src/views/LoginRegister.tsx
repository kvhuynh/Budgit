import { Routes, Route, Link, Outlet } from 'react-router-dom';

export const LoginRegister = () => {
  return (
    <>
      <h1>User</h1>

      <nav>
        <Link to="profile">Profile</Link>
        <Link to="account">Account</Link>
      </nav>

      <Outlet />
    </>
  );
};

export default LoginRegister;