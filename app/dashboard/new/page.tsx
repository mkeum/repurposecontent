import { RepurposeForm } from "@/components/dashboard/repurpose-form";

export default function NewContentPage() {
  return (
    <div className="p-8">
      <div className="mb-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold">Repurpose New Content</h2>
        <p className="text-gray-500">Paste your content below and let AI work its magic.</p>
      </div>

      <RepurposeForm />
    </div>
  );
}
