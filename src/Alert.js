import React from "react";

const Alert = ({type, messages}) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {messages.map(error=>{
                return (
                    <p className="mb-0 small" key={error}>
                        {error}
                    </p>
                )
            })}
        </div>
    )
}

Alert.defaultProps = {
    type: "danger",
    messages: []
  };

export default Alert;