import { useSignupForm } from "../hooks/useSignupForm";
import Input from "./lib/Input";
import Button from "./lib/Button";

const SignupForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
    isMismatched
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="name"
        placeholder="*Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="*Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="*Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={8}
        required
      />
      <Input
        type="password"
        placeholder="*Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {isMismatched && <p className="text-red-500 text-sm">Password mismatch</p>}
      <Button
        className="w-full bg-primary hover:border-primary cursor-pointer rounded p-2 text-black shadow-md mt-2 disabled:bg-gray-400 disabled:text-white"
        type="submit"
        disabled={!name || !email || !password || !!isMismatched}
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
