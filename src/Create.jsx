import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch("https://server-add.vercel.app/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("new blog added");
      setIsPending(false);
      history.push("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          value={title}
        />
        <label>Blog body:</label>
        <textarea
          onChange={(e) => setBody(e.target.value)}
          required
          value={body}
        ></textarea>
        <label>Blog author:</label>
        <select onChange={(e) => setAuthor(e.target.value)} value={author}>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {isPending && <button disabled>Adding blog...</button>}
        {!isPending && <button>Add blog</button>}
      </form>
    </div>
  );
};

export default Create;
