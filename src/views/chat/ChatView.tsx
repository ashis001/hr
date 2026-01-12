'use client'

import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'

const ChatView = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([
        { role: 'ai', text: 'Hello! How can I help you today?' }
    ])

    const handleSendMessage = () => {
        if (!message.trim()) return

        // Add user message to history
        const newHistory = [...chatHistory, { role: 'user', text: message }]
        setChatHistory(newHistory)
        setMessage('')

        // Simulate AI response for testing
        setTimeout(() => {
            setChatHistory(prev => [...prev, { role: 'ai', text: 'This is a test response. Integrate your AI module here!' }])
        }, 1000)
    }

    return (
        <Card sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar src='/images/avatars/1.png' />
                <Box>
                    <Typography variant='h6'>AI Chat Assistant</Typography>
                    <Typography variant='body2' color='success.main'>Online</Typography>
                </Box>
            </Box>
            <Divider />

            <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {chatHistory.map((chat, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: chat.role === 'user' ? 'row-reverse' : 'row',
                            gap: 3,
                            alignItems: 'flex-start'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                bg: chat.role === 'user' ? 'primary.main' : 'secondary.main'
                            }}
                        >
                            {chat.role === 'user' ? 'U' : 'AI'}
                        </Avatar>
                        <Box
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                maxWidth: '70%',
                                bgcolor: chat.role === 'user' ? 'primary.main' : 'action.selected',
                                color: chat.role === 'user' ? 'primary.contrastText' : 'text.primary',
                                boxShadow: 1
                            }}
                        >
                            <Typography variant='body1'>{chat.text}</Typography>
                        </Box>
                    </Box>
                ))}
            </CardContent>

            <Divider />
            <Box sx={{ p: 4, display: 'flex', gap: 3, alignItems: 'center' }}>
                <TextField
                    fullWidth
                    placeholder='Type your message...'
                    variant='outlined'
                    size='small'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color='primary' onClick={handleSendMessage} sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                    <i className='ri-send-plane-2-line' />
                </IconButton>
            </Box>
        </Card>
    )
}

export default ChatView
