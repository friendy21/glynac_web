"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

interface NewPostForm {
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
}

export function Blog(): React.ReactElement {
  const [activePost, setActivePost] = useState<number | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([
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

  const [newPost, setNewPost] = useState<NewPostForm>({
    title: "",
    excerpt: "",
    content: "",
    image: null,
  });

  const handleClick = (id: number) => {
    if (activePost === id) {
      setActivePost(null); // Hide content if it's already active
    } else {
      setActivePost(id); // Show content for clicked post
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setNewPost({
        ...newPost,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newPostId = posts.length + 1;
    setPosts([
      ...posts,
      {
        ...newPost,
        id: newPostId,
        date: new Date().toLocaleDateString(),
        author: "You", // You can change this to any name or get it from a logged-in user
      } as BlogPost,
    ]);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      image: null,
    });
  };

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container mx-auto px-4 space-y-10">
        
        {/* New Post Form */}
        <Card className="p-6">
          <h2 className="text-3xl font-semibold text-foreground">Create a New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <Label htmlFor="title" className="text-foreground">Title</Label>
              <Input
                id="title"
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="excerpt" className="text-foreground">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="content" className="text-foreground">Content</Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="image" className="text-foreground">Image</Label>
              <Input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="w-full mt-2"
                accept="image/*"
              />
              {newPost.image && (
                <div className="mt-4">
                  <img src={newPost.image} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
            >
              Submit Post
            </Button>
          </form>
        </Card>

        {/* Blog List */}
        {posts.map((post) => (
          <Card
            key={post.id}
            className="p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Using a div with background image for better control instead of img */}
              <div className="w-full sm:w-32 h-32 rounded-md overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2
                  className="text-2xl sm:text-3xl font-semibold text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleClick(post.id)}
                >
                  {post.title}
                </h2>
                <p className="text-muted-foreground mt-2">{post.excerpt}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>By {post.author} | {post.date}</p>
                </div>
              </div>
            </div>

            {/* Full content visibility */}
            {activePost === post.id && (
              <div className="mt-6 text-lg text-foreground leading-relaxed">
                <p>{post.content}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Blog;