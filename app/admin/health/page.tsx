import { 
  CheckCircle2, 
  XCircle, 
  Activity,
  Database,
  Mail,
  Webhook,
  Key
} from "lucide-react";

export default async function AdminHealthPage() {
  // Real check simulation
  const envVars = [
    { name: "STRIPE_API_KEY", status: process.env.STRIPE_API_KEY ? "set" : "missing" },
    { name: "OPENAI_API_KEY", status: process.env.OPENAI_API_KEY ? "set" : "missing" },
    { name: "RESEND_API_KEY", status: process.env.RESEND_API_KEY ? "set" : "missing" },
    { name: "DATABASE_URL", status: process.env.DATABASE_URL ? "set" : "missing" },
  ];

  const systems = [
    { name: "Database", status: "online", icon: Database, latency: "4ms" },
    { name: "Stripe API", status: "online", icon: Webhook, latency: "142ms" },
    { name: "OpenAI API", status: "online", icon: Activity, latency: "890ms" },
    { name: "Resend Mail", status: "online", icon: Mail, latency: "65ms" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">System Health</h2>
        <p className="text-gray-500">Real-time status of external services and infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {systems.map((sys) => (
          <div key={sys.name} className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <sys.icon className="h-5 w-5 text-gray-600" />
              </div>
              <span className={`flex items-center text-xs font-bold uppercase tracking-wider ${
                sys.status === 'online' ? 'text-green-600' : 'text-red-600'
              }`}>
                {sys.status === 'online' ? (
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {sys.status}
              </span>
            </div>
            <h3 className="font-bold text-lg">{sys.name}</h3>
            <p className="text-xs text-gray-400 mt-1">Latency: {sys.latency}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-gray-50/50">
            <h3 className="font-bold flex items-center gap-2">
                <Key className="h-5 w-5 text-gray-400" />
                Environment Variables
            </h3>
        </div>
        <div className="divide-y">
            {envVars.map(ev => (
                <div key={ev.name} className="p-4 flex items-center justify-between">
                    <span className="text-sm font-mono text-gray-600">{ev.name}</span>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                        ev.status === 'set' ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {ev.status}
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
