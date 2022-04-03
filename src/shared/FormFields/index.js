import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import PhoneInput from "react-phone-input-2";
import "./index.scss";

const Label = ({ title }) => {
  return <label className="form-label">{title}</label>;
};

const InputField = (props) => {
  const {
    className = "",
    mb,
    bg = "",
    required,
    label,
    type = "text",
    value = "",
    subtext,
    error = "",
    ...Rest
  } = props;
  const [inputType, setInputType] = useState(type);

  return (
    <Form.Group className={`FormFieldGroup ${mb} ${className}`}>
      {label && (
        <Form.Label>
          {label}{" "}
          {required ? <i className="bi bi-asterisk asterisk-icon"></i> : ""}
        </Form.Label>
      )}
      <Form.Control
        isInvalid={!!error}
        type={inputType}
        value={value || ""}
        {...Rest}
        className={bg}
      />
      {type === "password" ? (
        <i
          className={`bi bi-eye${
            inputType !== "password" ? "-slash" : ""
          } eye-icon`}
          onClick={() =>
            setInputType(inputType === "password" ? "text" : "password")
          }
        ></i>
      ) : (
        ""
      )}

      {subtext && <Form.Text className="text-muted">{subtext}</Form.Text>}
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const PhoneInputField = (props) => {
  const { required, label, subtext, error = "", mb, ...Rest } = props;
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      {label && (
        <Form.Label>
          {label}{" "}
          {required ? <i className="bi bi-asterisk asterisk-icon"></i> : ""}
        </Form.Label>
      )}
      <PhoneInput {...Rest} />
      {subtext && <Form.Text className="text-muted">{subtext}</Form.Text>}
      {error && <div className="ErrorMessage">{error}</div>}
    </Form.Group>
  );
};

const SelectField = (props) => {
  const {
    mb,
    label,
    selected = "",
    optionsName = [],
    optionsValue = [],
    subtext,
    error,
    ...Rest
  } = props;

  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        isInvalid={!!error}
        as="select"
        value={selected}
        custom
        {...Rest}
      >
        {optionsName.map((option, i) => (
          <option value={optionsValue[i]} key={i}>
            {option}
          </option>
        ))}
      </Form.Control>
      <Form.Text className="text-muted">{subtext}</Form.Text>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

const CheckBox = (props) => {
  const { mb, label, value = "", error, checked = false, ...Rest } = props;
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      <Form.Check
        custom
        type="checkbox"
        id={label}
        label={label}
        value={value}
        checked={checked}
        {...Rest}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const SwitchBtn = (props) => {
  const { name, mb, error, ...Rest } = props;
  return (
    <Form.Group className={`FormFieldGroup ${mb}`}>
      <Form.Switch id={name} name={name} {...Rest} />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const CheckRadio = (props) => {
  const {
    mb,
    label,
    name,
    checked,
    subtext,
    optionsName = [],
    optionsValue = [],
    optionsDisabled = [],
    error,
    inline,
    variant,
    labelPosition,
    onChange,
    ...Rest
  } = props;

  return (
    <Form.Group className={`FormFieldGroup ${variant} ${mb}`}>
      {label && (
        <Form.Label className={`${inline ? "Inline" : ""} ${labelPosition}`}>
          {label}
        </Form.Label>
      )}
      <div className="OptionsGroup">
        {optionsName.map((option, i) => (
          <Form.Check
            custom
            type="radio"
            id={name + option}
            name={name}
            label={option}
            checked={optionsValue[i] === checked}
            disabled={optionsDisabled[i] === true}
            onChange={() =>
              onChange({ target: { name, value: optionsValue[i] } })
            }
            inline={inline}
            {...Rest}
            key={i}
          />
        ))}
      </div>
      {subtext && <Form.Text className="text-muted">{subtext}</Form.Text>}
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const Textarea = (props) => {
  const { required, label, value = "", mb, subtext, error, ...Rest } = props;
  return (
    <Form.Group className={mb}>
      {label && (
        <Form.Label>
          {label}{" "}
          {required ? <i className="bi bi-asterisk asterisk-icon"></i> : ""}
        </Form.Label>
      )}
      <Form.Control isInvalid={!!error} as="textarea" value={value} {...Rest} />
      <Form.Text className="text-muted">{subtext}</Form.Text>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

const TooltipWrapper = (props) => {
  const { children, content } = props;
  const renderTooltip = (props) => (
    <Tooltip id={content} {...props}>
      {content}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};

export {
  Label,
  InputField,
  SelectField,
  CheckBox,
  CheckRadio,
  SwitchBtn,
  Textarea,
  TooltipWrapper,
  PhoneInputField,
};
