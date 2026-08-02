import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { connection } from "next/server";

async function checkDatabase() {
  const start = performance.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    return {
      status: "Operational" as const,
      responseTime: Math.round(performance.now() - start),
    };
  } catch {
    return {
      status: "Outage" as const,
      responseTime: Math.round(performance.now() - start),
    };
  }
};

export default async function StatusPage() {
  await connection();

  const database = await checkDatabase();

  const isOperational = database.status === "Operational";

  return (
    <div className="flex flex-col w-full max-w-90 sm:max-w-3xl mx-auto pt-10 sm:pt-30 gap-10 sm:gap-14">
      {/* Status */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-3xl font-semibold tracking-tight">Status</h2>
        <p className="text-muted-foreground">Current status of Protected Notepad services.</p>
      </div>

      <div className="flex flex-col w-full max-w-2xl gap-14">
        <div className="flex flex-col gap-3 sm:gap-4 px-4 py-3 rounded-xl border border-accent">
          <div className="flex flex-row items-center gap-3">
            <span className="relative flex size-2">
              <span className={`absolute inline-flex h-full w-full rounded-full ${isOperational ? "bg-green-500" : "bg-red-500"} opacity-75 animate-ping`} />
              <span className={`relative inline-flex size-2 rounded-full ${isOperational ? "bg-green-500" : "bg-red-500"}`} />
            </span>

            <p className="text-sm font-medium">
              {isOperational ? "All Systems Operational" : "Service Disruption"}
            </p>
          </div>

          <p className="text-sm">
            {isOperational
              ? "Everything is working as expected."
              : "One or more services are currently unavailable."
            }
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Services</h4>

          <Separator />

          <div className="flex flex-col gap-6 mt-4">
            {/* 1 */}
            <div className="flex flex-row justify-between items-center">
              <div className="text-sm">
                <strong>Protected Notepad</strong>
                <p className="text-muted-foreground">Application is reachable and responding.</p>
              </div>

              <div className="flex flex-row items-center gap-3">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-400" />
                </span>

                <p className="text-sm">Operational</p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex flex-row justify-between items-center">
              <div className="text-sm">
                <strong>Database</strong>
                <p className="text-muted-foreground">
                  {database.status === "Operational"
                    ? "Database is reachable and responding."
                    : "Database is currently unreachable."
                  }
                </p>
                {isOperational && (
                  <p>Database response time: {database.responseTime}ms</p>
                )}
              </div>

              <div className="flex flex-row items-center gap-3">
                <span className="relative flex size-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full ${isOperational ? "bg-green-500" : "bg-red-500"} opacity-75 animate-ping`} />
                  <span className={`relative inline-flex size-2 rounded-full ${isOperational ? "bg-green-500" : "bg-red-500"}`} />
                </span>

                <p className="text-sm">{database.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 sm:my-20" />
    </div>
  );
}