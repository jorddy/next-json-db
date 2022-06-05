import { Post } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Index() {
  const queryClient = useQueryClient();

  const posts = useQuery<Post[], Error>(["posts"], () =>
    fetch("/api/posts").then(r => r.json())
  );

  const createPost = useMutation<any, Error, Post>(
    data =>
      fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(async res => {
        if (!res.ok) {
          throw new Error(await res.text());
        }
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(["posts"])
    }
  );

  return (
    <main>
      <h1>Testing React Query + Local JSON </h1>

      {posts.data?.map((post, idx) => (
        <article key={idx}>{post.title}</article>
      ))}

      <button
        onClick={() => createPost.mutate({ title: Math.random().toString(36) })}
      >
        Create Post
      </button>

      {createPost.error?.message}
    </main>
  );
}
