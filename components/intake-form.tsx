"use client";

import { useState } from "react";
import { INDUSTRIES } from "@/lib/types";

const initialFormState = {
  name: "",
  email: "",
  business_name: "",
  industry: "",
  help_text: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function IntakeForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<typeof initialFormState>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user corrects it
    if (fieldErrors[name as keyof typeof initialFormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const errors: Partial<typeof initialFormState> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.business_name.trim()) errors.business_name = "Business name is required.";
    if (!formData.industry) errors.industry = "Please select an industry.";
    if (!formData.help_text.trim()) errors.help_text = "Please describe what you need help with.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData(initialFormState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-5">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Request received</h2>
        <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8">
          Thanks for reaching out. We&apos;ve logged your inquiry and will be in touch shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Submit another request →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full name" htmlFor="name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={fieldErrors.name ? inputErrorClass : inputClass}
          />
        </Field>

        <Field label="Email address" htmlFor="email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={fieldErrors.email ? inputErrorClass : inputClass}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business name" htmlFor="business_name" error={fieldErrors.business_name}>
          <input
            id="business_name"
            name="business_name"
            type="text"
            autoComplete="organization"
            value={formData.business_name}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={fieldErrors.business_name ? inputErrorClass : inputClass}
          />
        </Field>

        <Field label="Industry" htmlFor="industry" error={fieldErrors.industry}>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={fieldErrors.industry ? inputErrorClass : inputClass}
          >
            <option value="" disabled>
              Select an industry
            </option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="help_text" error={fieldErrors.help_text}>
        <textarea
          id="help_text"
          name="help_text"
          rows={5}
          value={formData.help_text}
          onChange={handleChange}
          placeholder="Describe your business challenge or what you're looking to build..."
          className={`${fieldErrors.help_text ? inputErrorClass : inputClass} resize-none`}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Submitting…
          </>
        ) : (
          "Submit request"
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

const inputErrorClass =
  "w-full rounded-lg border border-red-400 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
