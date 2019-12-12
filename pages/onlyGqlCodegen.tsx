import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { NextPage } from 'next';
//import { Mutation } from 'react-apollo';
//import { gql } from 'apollo-boost';
import { LoginComponent, LoginMutationFn } from '../generated/apolloComponents';

const IndexPage: NextPage = () => {
  // 그냥 graphql-code-generate 만 쓴 것
  const handleClick = async (mutate: LoginMutationFn) => {
    const response = await mutate({
      variables: { email: 'myung01@naver.com', password: '1111' }
    });

    console.log(response);
  };

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
      <LoginComponent>
        {mutate => (
          <button onClick={() => handleClick(mutate)}>
            call login mutation
          </button>
        )}
      </LoginComponent>
    </Layout>
  );
};

export default IndexPage;
