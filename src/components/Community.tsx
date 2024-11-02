import React, { useState } from 'react';
import './Community.css'; // Ensure you have a CSS file for styling

const Community: React.FC = () => {
    const [postContent, setPostContent] = useState<string>('');
    const [posts, setPosts] = useState<string[]>([]);

    const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (postContent.trim()) {
            setPosts([...posts, postContent]);
            setPostContent(''); // Clear the input after posting
        }
    };

    return (
        <div className="community-container">
            <h2>Community Posts</h2>
            <form onSubmit={handlePostSubmit} className="post-form">
                <textarea
                    value={postContent}
                    onChange={handlePostChange}
                    placeholder="What's on your mind?"
                    className="post-input"
                    rows={4}
                    required
                />
                <button type="submit" className="submit-post-button">Post</button>
            </form>
            <div className="posts-list">
                {posts.length === 0 ? (
                    <p>No posts yet. Be the first to share!</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="post">
                            <p>{post}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Community;
