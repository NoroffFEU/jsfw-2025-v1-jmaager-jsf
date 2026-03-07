"use client";

import { useMemo, useState } from "react";

interface ContactFields {
  fullName: string;
  subject: string;
  email: string;
  message: string;
}

interface ContactErrors {
  fullName?: string;
  subject?: string;
  email?: string;
  message?: string;
}

const initialFields: ContactFields = {
  fullName: "",
  subject: "",
  email: "",
  message: "",
};

function validate(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};

  if (fields.fullName.trim().length < 3) {
    errors.fullName = "Full Name must be at least 3 characters.";
  }

  if (fields.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactPage() {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const errors = useMemo(() => validate(fields), [fields]);
  const isValid = Object.keys(errors).length === 0;

  function updateField<K extends keyof ContactFields>(
    key: K,
    value: ContactFields[K],
  ) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (success) {
      setSuccess(false);
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setSuccess(false);

    if (!isValid) {
      return;
    }

    setFields(initialFields);
    setSuccess(true);
    setSubmitted(false);
  }

  const showErrors = submitted && !success;

  return (
    <section className="rounded-4 border bg-white p-4 shadow-sm">
      <h1 className="h3 mb-2">Contact us</h1>
      <p className="text-secondary mb-4">
        Send a message and we will get back to you shortly.
      </p>

      <form className="row g-3" noValidate onSubmit={onSubmit}>
        <div className="col-12 col-md-6">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            id="fullName"
            className={`form-control ${showErrors && errors.fullName ? "is-invalid" : ""}`}
            value={fields.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
          {showErrors && errors.fullName ? (
            <div className="invalid-feedback">{errors.fullName}</div>
          ) : null}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            id="subject"
            className={`form-control ${showErrors && errors.subject ? "is-invalid" : ""}`}
            value={fields.subject}
            onChange={(event) => updateField("subject", event.target.value)}
          />
          {showErrors && errors.subject ? (
            <div className="invalid-feedback">{errors.subject}</div>
          ) : null}
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-control ${showErrors && errors.email ? "is-invalid" : ""}`}
            value={fields.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {showErrors && errors.email ? (
            <div className="invalid-feedback">{errors.email}</div>
          ) : null}
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className={`form-control ${showErrors && errors.message ? "is-invalid" : ""}`}
            value={fields.message}
            onChange={(event) => updateField("message", event.target.value)}
          />
          {showErrors && errors.message ? (
            <div className="invalid-feedback">{errors.message}</div>
          ) : null}
        </div>

        <div className="col-12 d-flex align-items-center gap-3">
          <button
            type="submit"
            className="btn btn-success"
            disabled={!isValid && submitted}
          >
            Send message
          </button>
          {success ? (
            <span className="text-success">Message sent successfully.</span>
          ) : null}
        </div>
      </form>
    </section>
  );
}
