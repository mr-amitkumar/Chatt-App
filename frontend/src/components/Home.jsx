import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [user] = useState(() => {
    const loggedInUser = localStorage.getItem("user");
    return loggedInUser ? JSON.parse(loggedInUser) : null;
  });
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        // Handling both possible response structures (array or object containing array)
        setPosts(response.data.posts || response.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Updated logic: added 'async' and passing 'e' correctly
  const handlePostSubmit = async (e) => {
    if (e.key === "Enter" && postText.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:8000/api/posts", {
          text: postText,
          firstname: user?.firstname || "Anonymous",
        });

        // Add the new post from DB to the top of the UI list
        setPosts([response.data, ...posts]);
        setPostText(""); // Clear input
      } catch (error) {
        console.error("Failed to save post:", error);
      }
    }
  };

  return (
    <div className="text-white h-screen">
      <div className="flex justify-evenly ">
        {/* for posts  */}
        <div className="h-screen w-full border-r-2 border-gray-900 flex flex-col">
          <h1 className="text-center text-2xl tracking-widest w-full border-b-2 border-gray-900 py-2">
            Post
          </h1>
          <div className="text-center mt-3 ">
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onKeyDown={handlePostSubmit}
              placeholder="Write your thought here....."
              className="bg-transparent text-white placeholder:font-sans border-2 border-blue-900 px-10 py-2 rounded-3xl w-[90%] outline-none focus:border-orange-800 transition-all duration-500"
            />
          </div>

          {/* Render the posts list */}
          <div className="flex-1 overflow-y-auto no-scrollbar px-5 mt-5 space-y-4 pb-10">
            {posts.map((post) => (
              <div key={post._id} className="bg-[#111] p-4 rounded-xl border border-gray-800 shadow-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-blue-400 font-bold">@{post.firstname}</span>
                  <span className="text-gray-500 text-xs">{post.time}</span>
                </div>
                <p className="text-gray-300">{post.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* for the followers */}
        <div className="h-screen w-full">
          <h1 className="text-center text-2xl tracking-widest w-full border-b-2 border-gray-900 py-2">
            Followers
          </h1>
          <div className="flex-1 overflow-y-auto p-4 text-gray-500 italic text-center">
            No followers to display yet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;