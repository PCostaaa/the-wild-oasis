import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import { useResetPassword } from "./useResetPassword";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const ForgotPasswordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: var(--color-brand-600);
  text-align: right;
  padding: 0.4rem 0;
  align-self: flex-end;
  text-decoration: underline;

  &:hover {
    color: var(--color-brand-700);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const ResetActions = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { login, isLoading } = useLogin();
  const { sendResetEmail, isLoading: isResetting } = useResetPassword();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  function handleSendReset(e) {
    e.preventDefault();
    if (!resetEmail) return;
    sendResetEmail(resetEmail, {
      onSuccess: () => {
        setShowReset(false);
        setResetEmail("");
      },
    });
  }

  return (
    <Form onSubmit={showReset ? handleSendReset : handleSubmit}>
      {!showReset ? (
        <>
          <FormRowVertical label="Email address">
            <Input
              type="email"
              id="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </FormRowVertical>

          <FormRowVertical label="Password">
            <Input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </FormRowVertical>

          <FormRowVertical>
            <ForgotPasswordButton
              type="button"
              onClick={() => {
                setResetEmail(email);
                setShowReset(true);
              }}
              disabled={isLoading}
            >
              Forgot password?
            </ForgotPasswordButton>
          </FormRowVertical>

          <FormRowVertical>
            <Button size="large" disabled={isLoading}>
              {!isLoading ? "Login" : <SpinnerMini />}
            </Button>
          </FormRowVertical>
        </>
      ) : (
        <ResetSection>
          <FormRowVertical label="Enter your email to reset password">
            <Input
              type="email"
              id="resetEmail"
              autoComplete="username"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              disabled={isResetting}
            />
          </FormRowVertical>
          <ResetActions>
            <Button
              type="button"
              variation="secondary"
              onClick={() => setShowReset(false)}
              disabled={isResetting}
            >
              Cancel
            </Button>
            <Button size="large" disabled={isResetting || !resetEmail}>
              {!isResetting ? "Send reset email" : <SpinnerMini />}
            </Button>
          </ResetActions>
        </ResetSection>
      )}
    </Form>
  );
}

export default LoginForm;
