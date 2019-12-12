import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import { useLoginMutation } from '../generated/apolloComponents';

const IndexPage: NextPage = () => {
  // graphql-code-generate hooks 기능을 쓴것
  const [loginMutation, { data, loading, error }] = useLoginMutation({
    variables: {
      email: 'myung01@naver.com',
      password: '1111'
    }
  });

  if (loading || error) {
    return <div>loading...</div>;
  } else {
    console.log('data:', data && data.login && data.login.email);
  }

  return (
    <Layout title='Home | Next.js + TypeScript Example'>
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </p>
      {/* <Mutation
        mutation={gql`
          mutation {
            login(email: "sangwook99@naver.com", password: "1111") {
              id
              firstName
              lastName
              email
            }
          }
        `}
      > */}
      {/* <LoginComponent>
        {mutate => (
          <button onClick={() => handleClick(mutate)}>
            call login mutation
          </button>
        )}
      </LoginComponent> */}
      <button onClick={() => loginMutation()}>call login mutation</button>
    </Layout>
  );
};

export default IndexPage;
