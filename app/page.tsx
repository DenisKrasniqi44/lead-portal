import IntakeForm from "@/components/intake-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tell us about your project</h1>
          <p className="mt-2 text-gray-500">
            Fill in the form below and our team will review your request within one business day.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <IntakeForm />
        </div>
      </div>
    </main>
  );
}

