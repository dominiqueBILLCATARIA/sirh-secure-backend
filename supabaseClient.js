// supabaseClient.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Importer ws pour Node.js 18
let WebSocket;
try {
    WebSocket = require('ws');
} catch (e) {
    console.log('⚠️ WebSocket package not installed, using native WebSocket');
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Configuration avec support WebSocket pour Node.js 18
const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        params: {
            eventsPerSecond: 10
        },
        ...(WebSocket && { transport: WebSocket })
    },
    auth: {
        persistSession: false
    }
});

module.exports = supabase;
