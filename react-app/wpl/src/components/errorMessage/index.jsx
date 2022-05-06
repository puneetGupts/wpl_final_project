import React, { useState } from "react";
import { Alert ,Button} from "react-bootstrap";

const ErrorMessage = ({ variant = "info", showCross,shows,children }) => {
    // const [show, setShow] = useState(true);
    return (
      <>
    <Alert show={shows} variant={variant} onClose={() => showCross(false)} dismissible>
          <Alert.Heading>{children}</Alert.Heading>
        </Alert>
        </>
    );
};

export default ErrorMessage;