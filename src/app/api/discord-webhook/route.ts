import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const shareWebhook = process.env.DISCORD_SHARE_WEBHOOK as string;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const publicKey = formData.get('publicKey') as string;
        const file = formData.get('file') as Blob;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }
        
        const discordFormData = new FormData();
        const payload = {
            content: `Minesweeper score shared by: ${publicKey || 'Anonymous Player'}`
        };
        
        discordFormData.append('payload_json', JSON.stringify(payload));
        discordFormData.append('file', file, 'minesweeper-score.png');
        
        const response = await axios.post(shareWebhook, discordFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return NextResponse.json({ success: true, status: response.status });
    } catch (error) {
        console.error('Error sending Discord webhook:', error);
        return NextResponse.json({ error: 'Failed to send webhook' }, { status: 500 });
    }
};