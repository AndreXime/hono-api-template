import { z } from "zod";

const SchemaEnvironment = z.object({
	PORT: z.coerce.number().default(8080),
	JWT_SECRET: z
		.string()
		.regex(
			/^[A-Za-z0-9+/]{43}=$/,
			"JWT_SECRET must be a 32-byte base64 encoded string (e.g. from openssl rand -base64 32)",
		),
	JWT_EXPIRATION: z
		.string()
		.regex(/^\d+m$/, {
			message: "O tempo de expiração deve estar no formato 'Xm' (ex: 15m)",
		})
		.transform((val) => {
			// Transforma em segundos
			const minutes = parseInt(val.replace("m", ""), 10);
			return minutes * 60;
		}),
	ENV: z
		.string()
		.toUpperCase()
		.refine(
			(val) => {
				const allKeys = ["DEV", "PROD", "TEST"];

				return allKeys.some((key) => val.includes(key));
			},
			{
				message: "Modo de ambiente invalido.",
			},
		)
		.transform((val) => {
			if (val.includes("PROD")) {
				return "PROD" as const;
			}
			if (val.includes("TEST")) {
				return "TEST" as const;
			}

			return "DEV" as const;
		})
		.default("DEV" as const),
	DATABASE_URL: z.url(),
	REDIS_URL: z.url(),
	FRONTEND_URL: z.url(),

	S3_ENDPOINT_URL: z.url(),
	S3_BUCKET: z.string(),
	S3_REGION: z.string(),
	S3_ACCESS_KEY: z.string(),
	S3_SECRET_KEY: z.string(),
});

// Impede de rodar o servidor sem alguma variavel de ambiente
const environment = SchemaEnvironment.parse(Bun.env);

export default environment;
export type environmentType = typeof environment;
