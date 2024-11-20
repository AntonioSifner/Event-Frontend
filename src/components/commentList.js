import React from "react";
import Comment from "@/components/comment";
export default function CommentList({ comments }) {
  return comments.map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));
}
