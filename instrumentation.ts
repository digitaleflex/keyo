
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('[Instrumentation] Registering Keep-Alive...');

        // Dynamic import to avoid build-time execution issues
        const { default: prisma } = await import('@/lib/db');

        const PING_INTERVAL = 4 * 60 * 1000; // 4 minutes

        setInterval(async () => {
            try {
                const start = Date.now();
                // Execute a lightweight query to keep the connection active
                await prisma.$queryRaw`SELECT 1`;
                const duration = Date.now() - start;
                console.log(`[Keep-Alive] DB Ping success (${duration}ms)`);
            } catch (error) {
                console.error('[Keep-Alive] DB Ping failed:', error);
            }
        }, PING_INTERVAL);
    }
}
