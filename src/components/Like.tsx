import { actions } from 'astro:actions';
import { useState } from "react";

export function Like({ postId, initial }: { postId: string, initial: number }) {
    const [likes, setLikes] = useState(initial);
    const [liked, setLiked] = useState(false);
    return (
        <button
            onClick={async () => {
                const newLikes = await actions.like({ postId, liked });
                setLikes(newLikes);
                setLiked(!liked)
            }}
        >
            {likes} ❤️
        </button>
    );
}
