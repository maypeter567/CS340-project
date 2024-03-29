import { useState } from "react";

interface Props {
  setAlias: (value: React.ChangeEvent<HTMLInputElement>) => void;
  setPassword: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginFields = (props: Props) => {

  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onChange={props.setAlias}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          placeholder="Password"
          onChange={props.setPassword}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  )
}

export default LoginFields