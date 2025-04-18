import { useLoginForm } from "../hooks/useLoginForm";
import Input from "./lib/Input";
import Button from "./lib/Button";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="w-full bg-primary hover:border-primary cursor-pointer rounded p-2 text-black shadow-md mt-2"
        type="submit"
        disabled={!email || !password}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
