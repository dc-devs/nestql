import { join } from 'path';
import { type GraphQLError, type GraphQLFormattedError } from 'graphql';
import { ApolloDriver, type ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphqlModule } from '@nestjs/graphql';
import { isDevelopmentEnv } from '@base/common/constants/environment';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const GraphQLModule = GraphqlModule.forRoot<ApolloDriverConfig>({
	sortSchema: true,
	playground: false,
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), 'src/app/schema.gql'),
	context: ({ req, res }) => ({ req, res }),
	plugins: isDevelopmentEnv
		? [ApolloServerPluginLandingPageLocalDefault()]
		: [],
	formatError: (error: GraphQLError) => {
		const graphQLFormattedError: GraphQLFormattedError = {
			message: !error.message.includes('prisma')
				? error.message
				: 'Database Error',
			extensions: error.extensions,
		};

		return graphQLFormattedError;
	},
});
