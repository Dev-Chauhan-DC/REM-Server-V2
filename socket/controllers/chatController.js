const chatService = require('../../services/chatServices')

module.exports = (socket, io) => {



    socket.on('sendMessage', async (data) => {



        const result = await chatService.create({
            conversation_id: data.conversation_id,
            sender_id: socket.user.id,
            message: data.message
        })

        // Emit the message to all users in the conversation
        io.emit(`receiveMessage-${data.conversation_id}`, result);
    });
};
