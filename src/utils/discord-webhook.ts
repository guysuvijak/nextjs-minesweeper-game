interface DataProps {
    publicKey: string | null;
    imageBlob: Blob;
};

export const sendWebhookDiscordShare = async (data: DataProps) => {
    try {
        const formData = new FormData();
        formData.append('publicKey', data.publicKey || 'Anonymous Player');
        formData.append('file', data.imageBlob, 'minesweeper-score.png');
        
        const response = await fetch('/api/discord-webhook', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error calling webhook API:', error);
        throw error;
    }
};