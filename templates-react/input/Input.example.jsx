import { useState } from 'react';
import Input from './Input';

function InputExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  return (
    <div style={{ maxWidth: '400px', padding: '2rem' }}>
      <h2>Input Component Examples</h2>

      {/* Basic Input */}
      <Input
        label="Name"
        placeholder="Enter your name"
        required
      />

      {/* Email with validation */}
      <Input
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        required
      />

      {/* Password Input */}
      <Input
        type="password"
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="Must be at least 8 characters"
        required
      />

      {/* With Icon */}
      <Input
        label="Search"
        placeholder="Search..."
        icon="🔍"
      />

      {/* Disabled Input */}
      <Input
        label="Disabled"
        value="This is disabled"
        disabled
      />

      {/* With max length */}
      <Input
        label="Username"
        placeholder="Max 20 characters"
        maxLength={20}
        helperText="Choose a unique username"
      />
    </div>
  );
}

export default InputExample;
