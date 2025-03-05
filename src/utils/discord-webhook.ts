import axios from 'axios';

const shareWebhook = process.env.DISCORD_SHARE_WEBHOOK as string;

export const sendWebhookDiscordShare = async (publicKey: string | null, imageBlob: Blob) => {
    try {
        const formData = new FormData();
        
        const payload = {
            content: `Minesweeper score shared by: ${publicKey || 'Anonymous'}`
        };
        
        formData.append("payload_json", JSON.stringify(payload));
        
        formData.append("file", imageBlob, "minesweeper-score.png");
        
        const response = await axios.post(shareWebhook, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};