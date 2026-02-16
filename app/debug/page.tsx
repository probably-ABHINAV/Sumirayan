
import { stackServerApp } from "@/lib/stack-auth";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
  const headersList = await headers();
  const user = await stackServerApp.getUser();
  
  const envCheck = {
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID ? "SET" : "MISSING",
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY ? "SET" : "MISSING",
    STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY ? "SET" : "MISSING",
  };

  const config = stackServerApp.urls;

  return (
    <div className="p-8 text-white bg-black min-h-screen font-mono text-sm">
      <h1 className="text-xl font-bold mb-4">Auth Debug Report</h1>
      
      <div className="mb-8 p-4 border border-gray-700 rounded">
        <h2 className="text-lg font-semibold mb-2 text-green-400">Environment</h2>
        <pre>{JSON.stringify(envCheck, null, 2)}</pre>
      </div>

      <div className="mb-8 p-4 border border-gray-700 rounded">
        <h2 className="text-lg font-semibold mb-2 text-blue-400">Stack Config</h2>
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>

      <div className="mb-8 p-4 border border-gray-700 rounded">
        <h2 className="text-lg font-semibold mb-2 text-yellow-400">User Session</h2>
        <pre>{JSON.stringify(user || "No User", null, 2)}</pre>
      </div>

      <div className="mb-8 p-4 border border-gray-700 rounded">
        <h2 className="text-lg font-semibold mb-2 text-purple-400">Request Headers</h2>
        <div className="whitespace-pre-wrap break-all">
            {/* Minimal headers to avoid leaking too much */}
            Host: {headersList.get("host")}
        </div>
      </div>
    </div>
  );
}
