import './App.css';
import { QueryClient, QueryClientProvider, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import InfiniteScroll from 'react-infinite-scroller';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchInterval: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          {/* <InfinitePeople /> */}
          <Page />
        </header>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// 無限スクロール
// const initialUrl = 'https://swapi.dev/api/people/';
// const fetchUrl = async (url) => {
//   const response = await fetch(url);
//   return response.json();
// };

// export function InfinitePeople() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isLoading,
//     isFetching,
//     isError,
//     error,
//   } = useInfiniteQuery(
//     ['people'],
//     ({ pageParam = initialUrl }) => fetchUrl(pageParam),
//     {
//       getNextPageParam: (lastPage) => lastPage.next || undefined,
//     }
//   );

//   if (isLoading) return <div className="loading">Loading...</div>;
//   if (isError) return <div>Error! {error.toString()}</div>;

//   return (
//     <>
//       <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
//         {data.pages.map((pageData) => {
//           return pageData.results.map((person) => {
//             return (
//               <>
//                 <p>name: {person.name} / height: {person.height} / gender: {person.gender}</p>
//               </>
//             );
//           });
//         })}
//       </InfiniteScroll>
//       {isFetching && <div className="loading">Loading...</div>}
//     </>
//   );
// }


// キャッシュの永続化 リロードしても早い
export function Page() {
  const { isLoading, isError, data } = useQuery(
    ["repoData"],
    () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        res => res.json()
      )
  )

  if (isLoading) return <>Loading...</>

  if (isError) return <>Error</>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}
