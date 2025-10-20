// server/api/linkedin.js
import axios from "axios";

export default defineEventHandler(async (event) => {
    const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN; // bewaar in .env
    try {
        // Eerst je profiel ophalen
        const me = await axios.get("https://api.linkedin.com/v2/me", {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });

        const personUrn = me.data.id;

        // Dan je posts ophalen
        const posts = await axios.get(
            `https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:${personUrn})&count=10`,
            {
                headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            }
        );

        return posts.data.elements.map((post) => {
            const content =
                post.specificContent["com.linkedin.ugc.ShareContent"].shareCommentary
                    ?.text || "";
            const media =
                post.specificContent["com.linkedin.ugc.ShareContent"].media?.[0]
                    ?.media || null;

            return {
                id: post.id,
                text: content,
                media,
                created: post.created.time,
            };
        });
    } catch (err) {
        console.error("LinkedIn API-fout:", err.response?.data || err.message);
        throw createError({
            statusCode: 500,
            message: "Kon LinkedIn posts niet ophalen",
        });
    }
});
