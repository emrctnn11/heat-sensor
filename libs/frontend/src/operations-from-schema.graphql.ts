import {
  buildClientSchema,
  getIntrospectionQuery,
  parse,
  print,
} from 'graphql';

import { buildOperationNodeForField } from '@graphql-tools/utils';
import axios from 'axios';

// https://github.com/nestjs/graphql/issues/679

const getSchemaFromUrl = async (url: string) => {
  const response = await axios
    .post(url, { query: getIntrospectionQuery().toString() })
    .catch((e) => console.error(e));

  if (response) {
    return buildClientSchema(response.data.data);
  }
};

const main = async (schemaUrl: string) => {
  const schema = await getSchemaFromUrl(schemaUrl);
  const operationsDictionary = {
    query: { ...(schema.getQueryType()?.getFields() ?? {}) },
    mutation: { ...(schema.getMutationType()?.getFields() ?? {}) },
    subscription: { ...(schema.getSubscriptionType()?.getFields() ?? {}) },
  };

  let documentString = ``;

  for (const [operationKind, operationValue] of Object.entries(
    operationsDictionary
  )) {
    for (const operationName of Object.keys(operationValue)) {
      const operationAST = buildOperationNodeForField({
        schema,
        kind: operationKind as never,
        field: operationName,
      });

      documentString += print(operationAST);
    }
  }

  return parse(documentString);
};

export default main;
