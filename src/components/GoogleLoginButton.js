import React from "react";
import { GoogleLogin, googleLogout } from '@react-oauth/google';

export default function GoogleLoginButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        if (onSuccess) onSuccess(credentialResponse);
      }}
      onError={() => {
        alert('Google Login Failed');
      }}
    />
  );
}
