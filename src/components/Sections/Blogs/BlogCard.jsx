import React from "react";
import styles from "./BlogCard.module.css";
import chefAvatar from "../../../assets/chef-avatar.png";

export default function BlogCard({ date, title, author, category, imgUrl }) {
  return (
    <article className={styles.card}>
      <img src={imgUrl} alt={title} className={styles.thumbnail} />
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{category} |</span>
          <span className={styles.date}>{date}</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.author}>
          <img src={chefAvatar} alt={author} className={styles.chefAvatar} />
          <span className={styles.authorName}>{author}</span>
        </div>
      </div>
    </article>
  );
}
