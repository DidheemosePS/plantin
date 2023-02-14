import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "./PostComments.css";

export function PostCommentsEdit({
  value,
  setUpdate,
  commentid,
  postid,
  setPostComments,
}) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={yup.object({
        comment: yup.string().required(),
      })}
      onSubmit={async (comment, { resetForm }) => {
        try {
          const response = await axios.post(
            "http://localhost:3004/post/comments/edit",
            {
              commentid: commentid,
              postid,
              comments: comment.comment,
            }
          );
          setPostComments(response.data);
          setUpdate("");
          resetForm({ comment: "" });
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <input
            type="text"
            name="comment"
            className="commentinput"
            defaultValue={value}
            onChange={formik.handleChange}
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => setUpdate(false)}
            className="submitbtn"
          />
          <input type="submit" value="Update" className="submitbtn" />
        </form>
      )}
    </Formik>
  );
}

export function PostCommentsReplayEdit({
  value,
  setUpdate,
  replayid,
  commentid,
  setCommentsReplay,
  repliesfetch,
}) {
  return (
    <Formik
      initialValues={{ replay: "" }}
      validationSchema={yup.object({
        replay: yup.string().required(),
      })}
      onSubmit={async (replay, { resetForm }) => {
        try {
          const response = await axios.post(
            "http://localhost:3004/post/comments/replays/edit",
            {
              replayid,
              commentid,
              replay: replay.replay,
            }
          );
          setCommentsReplay(response.data);
          repliesfetch();
          setUpdate("");
          resetForm({ replay: "" });
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <input
            type="text"
            name="replay"
            className="replayinput"
            defaultValue={value}
            onChange={formik.handleChange}
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => setUpdate(false)}
            className="submitbtn"
          />
          <input type="submit" value="Update" className="submitbtn" />
        </form>
      )}
    </Formik>
  );
}
