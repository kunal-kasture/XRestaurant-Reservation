import React from "react";
import BlogCard from "./BlogCard";
import diningBlogImg from "../../../assets/dining-blog.jpg";
import styles from "./Blogs.module.css";

const POSTS = [
  {
    date: "March 31, 2022",
    category: "Dining",
    title: "Top 5 Fine Dining Experiences You Must Try",
    author: "Chef John",
    imgUrl: diningBlogImg,
  },
  {
    date: "March 31, 2022",
    category: "Dining",
    title: "Top 5 Fine Dining Experiences You Must Try",
    author: "Chef John",
    imgUrl: diningBlogImg,
  },
  {
    date: "March 31, 2022",
    category: "Dining",
    title: "Top 5 Fine Dining Experiences You Must Try",
    author: "Chef John",
    imgUrl: diningBlogImg,
  },
];

export default function Blogs() {
  return (
    <section className={styles.blogsSection}>
      <div className={styles.container}>
        <span className={styles.tagline}>Blog & News</span>
        <h2 className={styles.sectionTitle}>Read Our Latest News</h2>
        <div className={styles.grid}>
          {POSTS.map((post, idx) => (
            <BlogCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
