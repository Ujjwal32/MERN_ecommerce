export const validateSignUp = (user) => {
  const { name, mobile, password, email } = user;
  if (name.length < 6 || name.length > 30) {
    return {
      status: "error",
      msg: "Name should be between 6 and 30 character.",
    };
  }
  if (!mobile.match(/[0-9]{10}/)) {
    return { status: "error", msg: "Mobile number should be 10 digit long." };
  }
  if (password.length < 6) {
    return {
      status: "error",
      msg: "Password should be at least 6 character long.",
    };
  }
  if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
    return { status: "error", msg: "Invalid email" };
  }
  return { status: "success", msg: "Signing up..." };
};

export const validateSignin = (user) => {
  const { email, password } = user;
  if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
    return { status: "error", msg: "Invalid email" };
  }
  if (password.length < 5) {
    return {
      status: "error",
      msg: "Password should be at least 6 character long.",
    };
  }
  return { status: "success", msg: "Signing in..." };
};
