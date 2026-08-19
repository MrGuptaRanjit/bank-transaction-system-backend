export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email address is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateName = (name) => {
  if (!name.trim()) {
    return "Full name is required";
  }

  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  return "";
};

export const validateRegisterForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return errors;
};