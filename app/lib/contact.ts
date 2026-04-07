export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const PLACEHOLDER_CONTACT_ENDPOINT =
  "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/contactForm";

export async function submitContactForm(formData: ContactFormData) {
  const configuredEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim();

  if (
    !configuredEndpoint ||
    configuredEndpoint === PLACEHOLDER_CONTACT_ENDPOINT
  ) {
    throw new Error(
      "Contact service is not configured. Set NEXT_PUBLIC_CONTACT_API_URL to your Resend webhook endpoint.",
    );
  }

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const response = await fetch(configuredEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      name: fullName,
    }),
  });

  if (response.ok) {
    return;
  }

  let detail = "Failed to send message";

  try {
    const json = await response.json();
    if (typeof json?.error === "string" && json.error.trim()) {
      detail = json.error;
    } else if (typeof json?.message === "string" && json.message.trim()) {
      detail = json.message;
    }
  } catch {
    try {
      const text = await response.text();
      if (text.trim()) {
        detail = text;
      }
    } catch {
      detail = "Failed to send message";
    }
  }

  throw new Error(detail);
}
