import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-gray-500">Manage your account and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
          <h3 className="text-lg font-bold">Profile Information</h3>
          
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-lg">{session.user.name}</p>
              <p className="text-gray-500 text-sm">{session.user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Email: {session.user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Role: User</span>
            </div>
          </div>

          <Button variant="outline" className="w-fit" disabled>
            Edit Profile
          </Button>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-red-600">Danger Zone</h3>
          <p className="text-sm text-gray-500 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button variant="destructive">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
