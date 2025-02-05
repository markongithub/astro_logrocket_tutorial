import { actions } from 'astro:actions';
import { useState } from "react";

export function Like({ postId, initial }: { postId: string, initial: number }) {
    const [likes, setLikes] = useState(initial);
    const [liked, setLiked] = useState(false);
    return (
        <button
            onClick={async () => {
                const newLiked: boolean = !liked;
                const newLikes = await actions.like.orThrow({ postId, liked: newLiked });
                setLikes(newLikes);
                setLiked(newLiked);
            }}
        >
            {likes} ❤️
        </button>
    );
}
