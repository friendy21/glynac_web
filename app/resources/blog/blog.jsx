"use client";

import React, { useState } from "react";

export function Blog() {
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Ultimate Guide to Web Development",
      excerpt:
        "Web development is an exciting and dynamic field that allows developers to create websites and web applications...",
      content: `
        Web development is an exciting and dynamic field that allows developers to create websites and web applications for users all around the world. 
        In this guide, we will walk you through some of the fundamental concepts, tools, and technologies used in modern web development.
        
        Web development refers to the process of building websites and web applications. It includes everything from creating the user interface (UI) to writing the server-side code that powers the site.
        
        Frontend developers use HTML, CSS, and JavaScript to create visually appealing and responsive designs. Some of the popular frontend frameworks and libraries include React, Angular, and Vue.js.
        
        Backend developers work with server-side programming languages such as Python, Node.js, Ruby, and PHP. They also manage databases like MySQL, MongoDB, and PostgreSQL.
      `,
      date: "February 17, 2025",
      author: "John Doe",
      image: "https://via.placeholder.com/800x400", // Image for the post
    },
    {
      id: 2,
      title: "Understanding JavaScript ES6 Features",
      excerpt:
        "JavaScript ES6 introduced a wide range of new features that make development easier and more efficient. Let's explore the major features...",
      content: `
        JavaScript ES6 introduced a wide range of new features that make development easier and more efficient. Let's explore the major features...
        
        Some key features include arrow functions, promises, async/await, template literals, destructuring, and more. These features help reduce boilerplate code, make your code cleaner and easier to understand, and improve overall performance.
      `,
      date: "February 10, 2025",
      author: "Jane Smith",
      image: "https://via.placeholder.com/800x400", // Image for the post
    },
    {
      id: 3,
      title: "Getting Started with React Hooks",
      excerpt:
        "React Hooks changed the way we write React components by allowing us to use state and side effects in functional components...",
      content: `
        React Hooks changed the way we write React components by allowing us to use state and side effects in functional components. Before hooks, you had to write class components to use state and lifecycle methods.
        
        With hooks, we now have the useState hook for state management and the useEffect hook for side effects, like data fetching and subscriptions. These hooks make functional components much more powerful and easier to write.
      `,
      date: "February 5, 2025",
      author: "Alice Brown",
      image: "https://via.placeholder.com/800x400", // Image for the post
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null,
  });

  const handleClick = (id) => {
    if (activePost === id) {
      setActivePost(null); // Hide content if it's already active
    } else {
      setActivePost(id); // Show content for clicked post
    }
  };

  const handleImageChange = (event) => {
    setNewPost({
      ...newPost,
      image: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPostId = posts.length + 1;
    setPosts([
      ...posts,
      {
        ...newPost,
        id: newPostId,
        date: new Date().toLocaleDateString(),
        author: "You", // You can change this to any name or get it from a logged-in user
      },
    ]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      image: null,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 space-y-10">
        
        {/* New Post Form */}
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800">Create a New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Excerpt</label>
              <textarea
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                accept="image/*"
              />
              {newPost.image && (
                <div className="mt-4">
                  <img src={newPost.image} alt="Preview" className="w-32 h-32 object-cover" />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg"
            >
              Submit Post
            </button>
          </form>
        </section>

        {/* Blog List */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <div className="flex">
              <img
                src={post.image}
                alt={post.title}
                className="w-32 h-32 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h2
                  className="text-3xl font-semibold text-gray-800 cursor-pointer"
                  onClick={() => handleClick(post.id)}
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.excerpt}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>By {post.author} | {post.date}</p>
                </div>
              </div>
            </div>

            {/* Full content visibility */}
            {activePost === post.id && (
              <div className="mt-6 text-lg text-gray-800 leading-relaxed">
                <p>{post.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;