import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../AuthProvider/AuthProviders';
import Login from './Login';

describe('Login Component', () => {
  test('should display error message for invalid email', () => {
    render(
      <AuthContext.Provider value={{ loginAccount: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Please Give Us Your Valid Email');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should display error message for incorrect password', () => {
    const loginAccountMock = jest.fn().mockRejectedValueOnce(new Error('Password Not Matched'));

    render(
      <AuthContext.Provider value={{ loginAccount: loginAccountMock }}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });
    fireEvent.click(loginButton);

    const errorMessage = screen.getByText('Password Not Matched');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should call loginAccount and navigate on successful login', () => {
    const loginAccountMock = jest.fn().mockResolvedValueOnce({ user: {} });
    const navigateMock = jest.fn();

    render(
      <AuthContext.Provider value={{ loginAccount: loginAccountMock }}>
        <Login />
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(loginAccountMock).toHaveBeenCalledWith('validemail@example.com', 'password');
    expect(navigateMock).toHaveBeenCalled(); // Make sure to provide navigate mock in the context if you want to test navigation
  });
});
