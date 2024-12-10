import { useContext, useEffect } from "react";
import { RegistrationContext } from "../context/RegistrationContext";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Page: React.ComponentType; 
}

const Protected: React.FC<ProtectedProps> = ({ Page }) => {
  const { phoneNumber } = useContext(RegistrationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!phoneNumber) {
      navigate('/'); 
    }
  }, [phoneNumber, navigate]);

  return <Page />;
};

export default Protected;
