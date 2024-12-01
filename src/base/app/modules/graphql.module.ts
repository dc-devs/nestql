import { join } from 'path';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphqlModule } from '@nestjs/graphql';
// import { isDevelopmentEnv } from '@base/common/constants/environment';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const GraphQLModule = GraphqlModule.forRoot<ApolloDriverConfig>({
	sortSchema: true,
	playground: true,
	driver: ApolloDriver,
	autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
	context: ({ req, res }) => ({ req, res }),
	// plugins: isDevelopmentEnv
	// 	? [ApolloServerPluginLandingPageLocalDefault()]
	// 	: [],
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
