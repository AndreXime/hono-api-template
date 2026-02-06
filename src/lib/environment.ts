import { z } from "zod";

const SchemaEnvironment = z.object({
	JWT_SECRET: z
		.string("JWT_SECRET is required and must be a string")
		.regex(
			/^[A-Za-z0-9+/]{43}=$/,
			"JWT_SECRET must be a 32-byte base64 encoded string (e.g. from openssl rand -base64 32)",
		),
	PORT: z.coerce.number("PORT is required and must be a number").default(8080),
	ENV: z
		.string()
		.toUpperCase()
		.refine(
			(val) => {
				const allKeys = ["DEV", "PROD", "TEST"];

				// Verifica se a string de entrada inclui alguma das chaves
				// Ex: Se o ENV=Devel, val será 'DEVEL'. O 'DEVEL' inclui 'DEV'? Sim.
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
	DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),
	REDIS_URL: z.url(),
	FRONTEND_URL: z.url("FRONTEND_URL must be a valid URL").default("http://localhost:3000"),

	// --- Variáveis AWS S3 (Storage) ---
	S3_ENDPOINT_URL: z.string().url(),
	S3_BUCKET: z.string(),
	S3_REGION: z.string("S3_REGION is required and must be a string").default("us-east-1"),
	S3_ACCESS_KEY: z.string("S3_ACCESS_KEY is required and must be a string"),
	S3_SECRET_KEY: z.string("S3_SECRET_KEY is required and must be a string"),
});

// Impede de rodar o servidor sem alguma variavel de ambiente
const environment = SchemaEnvironment.parse(Bun.env);

export default environment;
export type environmentType = typeof environment;
