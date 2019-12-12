# TypeScript Next.js Graphql(with Graphql code generater)

## next.js with apollo-auth

- url
  - https://github.com/DavyBello/nextjs-with-apollo-auth-boilerplate

## 설치

- Next.js template 설치

  ```
  npx create-next-app --example with-typescript .
  ```

- yarn

  - dependencies

    ```
    yarn add apollo-boost apollo-link-http apollo-link-context graphql
    yarn add cookie isomorphic-unfetch react-apollo
    ```

  - dev dependency

    ```
    yarn add -D @types/cookie @types/graphql @types/node @types/react @types/react-dom typescript
    ```

## TEST 용 GraphQL API

- URL
  - https://countries.trevorblades.com

## graphql-code-generator

- 참조

  - URL

    - https://graphql-code-generator.com/docs/getting-started/

- 설치

  - yarn

    ```
    yarn add graphql
    yarn add -D @graphql-codegen/cli @graphql-codegen/typescript
    yarn global add @graphql-codegen/cli
    ```

  - plugin 설치

    ```
    yarn add @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-resolvers
    ```

  - cli 실행

    - 아래 명령어 입력
      - gql-gen init
    - 몇가지 질문사항이 나옴, 아래를 선택
      - 1. What type of application are you building?
        - Backend - API or server, Application built with React
      - 2. Where is your schema?
        - http://localhost:4000/graphql
      - 3. Where are your operations and fragments?
        - `graphql/**/*.ts`
      - 4. Pick plugins
        - TypeScript (required by other typescript plugins)
        - TypeScript Operations (operations and fragments)
        - TypeScript Resolvers (strongly typed resolve functions)
        - TypeScript React Apollo (typed components and HOCs)
      - 5. Where to write the output
        - generated/apolloComponents.tsx
      - 6. Do you want to generate an introspection file?
        - n
      - 7. How to name the config file?
        - codegen.yml
      - 8. What script in package.json should run the codegen?
        - generate

  - package.json > scripts
    ```json
    {
      ...
      "scripts": {
        ...
        "generate": "graphql-codegen"
      }
    }
    ```
  - 기존코드와 비교

    - 기존
      ```js
      <Mutation
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
      >
        {(mutate: any) => (
          <button
            onClick={async () => {
              const response = await mutate();
              console.log(response);
            }}
          >
            call login mutation
          </button>
        )}
      </Mutation>
      ```
    - graphql-code-gen 사용 후

      ```js
      const handleClick = async (mutate: LoginMutationFn) => {
        const response = await mutate({
          variables: { email: 'myung01@naver.com', password: '1111' }
        });

        console.log(response);
      };

      <LoginComponent>
        {mutate => (
          <button onClick={() => handleClick(mutate)}>
            call login mutation
          </button>
        )}
      </LoginComponent>;
      ```

  - 참조파일

    - 오직 graphql-code-generate 만 사용

      - onlyGqlCodegen.tsx

    - graphql-code-generate 훅스(hooks) 기능 사용
      - useHooksGqlCodegen.tsx
