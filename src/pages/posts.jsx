import React from "react"
import useAllPosts from "../hooks/useAllPosts"

export default () => {
  const posts = useAllPosts()
  if (!posts) return <h1>No Posts</h1>
  if (!posts.length) return <h1>No Posts</h1>

  return (
    <>
      <h1>All Posts</h1>
      {posts.map(post => (
        <h2>{post.title}</h2>
      ))}
    </>
  )
}
