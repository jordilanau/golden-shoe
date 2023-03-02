import { gql } from '@apollo/client';
import assert from 'assert';
import { server } from '../../../src/pages/api/graphql';

describe('GraphQL Server', () => {
  it('runs a health check', async () => {
    const result = await server.executeOperation({
      query: gql`
        query Query {
          ok
        }
      `,
    });

    assert(result.body.kind === 'single');
    expect(result.body.singleResult.errors).toBeUndefined();
    expect(result.body.singleResult.data?.ok).toBeTruthy();
  });
});
