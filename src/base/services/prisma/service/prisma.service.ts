import { Injectable, type OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			log: [
				{ level: 'query', emit: 'event' },
				{ level: 'info', emit: 'stdout' },
				{ level: 'warn', emit: 'stdout' },
				{ level: 'error', emit: 'stdout' },
			],
			omit: {
				user: {
					password: true,
				},
			},
		});

		// Cast because Prisma's event typings can be restrictive across versions
		(
			this as unknown as {
				$on: (event: any, cb: (e: any) => void) => void;
			}
		).$on('query', (e: Prisma.QueryEvent) => {
			try {
				// Avoid logging large params
				const limitedParams =
					e.params?.length > 512
						? e.params.slice(0, 512) + '…'
						: e.params;
				console.log(
					'[Prisma][query]',
					e.query,
					limitedParams,
					`${e.duration}ms`,
				);
			} catch {}
		});
	}

	async onModuleInit() {
		// Extra diagnostics around connection attempts
		const url = process.env.DATABASE_URL ?? '';
		try {
			if (url) {
				const u = new URL(url);
				console.log('[Prisma] attempting connect', {
					protocol: u.protocol,
					host: u.hostname,
					port: u.port || '5432',
					database: u.pathname.replace(/^\//, ''),
					ssl:
						u.searchParams.get('ssl') ??
						u.searchParams.get('sslmode'),
					prismaEnvLoaderDisabled:
						process.env.PRISMA_DISABLE_ENV_LOADER,
				});
			}
			await this.$connect();
			console.log('[Prisma] connected');
			try {
				const who = await this.$queryRawUnsafe<any[]>(
					'select current_user, version(), inet_server_addr() as server_addr',
				);
				console.log('[Prisma] post-connect probe', who?.[0]);
			} catch (probeErr) {
				console.warn(
					'[Prisma] post-connect probe failed',
					(probeErr as any)?.message,
				);
			}
		} catch (err) {
			console.error('[Prisma] connect error', {
				name: (err as any)?.name,
				code: (err as any)?.code,
				message: (err as any)?.message,
			});
			throw err;
		}
	}
}
