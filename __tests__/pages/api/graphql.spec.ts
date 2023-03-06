import { gql } from '@apollo/client';
import assert from 'assert';
import { server } from '../../../src/pages/api/graphql';

describe('GraphQL Server', () => {
  it('runs a health check', async () => {
    // check result from query
    let result = await server.executeOperation({
      query: gql`
        query Query {
          ok
        }
      `,
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.ok).toBeTruthy();

    // check result from mutation - true
    result = await server.executeOperation({
      query: gql`
        mutation Mutation($input: Boolean!) {
          ok(input: $input)
        }
      `,
      variables: { input: true },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.ok).toBeTruthy();

    // check result from mutation - false
    result = await server.executeOperation({
      query: gql`
        mutation Mutation($input: Boolean!) {
          ok(input: $input)
        }
      `,
      variables: { input: false },
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.ok).toBeFalsy();
  });
});
