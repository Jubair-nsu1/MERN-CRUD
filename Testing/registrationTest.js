import { render, screen, fireEvent } from '@testing-library/react';
import { AuthContext } from '../../AuthProvider/AuthProviders';
import Register from './Register';

describe('Register Component', () => {
  test('should display error message for invalid email', () => {
    render(
      <AuthContext.Provider value={{ createAccount: jest.fn(), userName: jest.fn() }}>
        <Register />
      </AuthContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const photoInput = screen.getByPlaceholderText('Your Photo');
    const registerButton = screen.getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(photoInput, { target: { value: 'photo-url' } });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText('Please Give Me Valid Email');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should display error message for short password', () => {
    render(
      <AuthContext.Provider value={{ createAccount: jest.fn(), userName: jest.fn() }}>
        <Register />
      </AuthContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const photoInput = screen.getByPlaceholderText('Your Photo');
    const registerButton = screen.getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.change(photoInput, { target: { value: 'photo-url' } });
    fireEvent.click(registerButton);

    const errorMessage = screen.getByText('At Least Give Me Six Character');
    expect(errorMessage).toBeInTheDocument();
  });

  test('should call createAccount and navigate on successful registration', () => {
    const createAccountMock = jest.fn().mockResolvedValueOnce({ user: {} });
    const userNameMock = jest.fn();
    const navigateMock = jest.fn();

    render(
      <AuthContext.Provider value={{ createAccount: createAccountMock, userName: userNameMock }}>
        <Register />
      </AuthContext.Provider>
    );

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const photoInput = screen.getByPlaceholderText('Your Photo');
    const registerButton = screen.getByText('Register');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(photoInput, { target: { value: 'photo-url' } });
    fireEvent.click(registerButton);

    expect(createAccountMock).toHaveBeenCalledWith('validemail@example.com', 'password');
    expect(userNameMock).toHaveBeenCalledWith('John Doe', 'photo-url');
    expect(navigateMock).toHaveBeenCalled(); // Make sure to provide navigate mock in the context if you want to test navigation
  });
});
