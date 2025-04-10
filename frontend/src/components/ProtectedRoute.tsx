import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

// A helper function to check if the consent cookie exists and is set to 'true'
const hasCookieConsent = () => {
  return document.cookie.split(';').some(cookie => 
    cookie.trim().startsWith('CookieConsent=true'));
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
      if (!hasCookieConsent()) {
    // Redirect the user to a dedicated cookie consent page if no consent is given.
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;