import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';

const NotificationFeed: React.FC = () => {
    const [commentNotifications, setCommentNotifications] = useState<string[]>([]);
    const [reactionNotifications, setReactionNotifications] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            onConnect: () => {
                console.log('Conectado al WebSocket!');
                setIsConnected(true);

                client.subscribe('/topic/comments/new', message => {
                    console.log('Nueva notificación de comentario:', message.body);
                    setCommentNotifications(prev => [message.body, ...prev]);
                });

                client.subscribe('/topic/reactions/new', message => {
                    console.log('Nueva notificación de reacción:', message.body);
                    setReactionNotifications(prev => [message.body, ...prev]);
                });
            },

            onStompError: (frame) => {
                console.error('Error STOMP:', frame);
                setIsConnected(false);
            },
            onDisconnect: () => {
                console.log('Desconectado del WebSocket.');
                setIsConnected(false);
            },
            debug: (str) => {
                // console.log('STOMP Debug:', str);
            },
        });

        client.activate();

        return () => {
            if (client.connected) {
                client.deactivate();
                console.log('Desactivando conexión WebSocket.');
            }
        };
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Notificaciones en Tiempo Real
            </h1>

            <div className={`p-3 mb-4 rounded-lg text-white ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                Estado del WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Nuevos Comentarios</h2>
                    {commentNotifications.length === 0 ? (
                        <p className="text-gray-500">Esperando nuevos comentarios...</p>
                    ) : (
                        <ul className="space-y-3">
                            {commentNotifications.map((notification, index) => (
                                <li key={index} className="bg-blue-50 p-3 rounded-md text-blue-800 border border-blue-200">
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Nuevas Reacciones</h2>
                    {reactionNotifications.length === 0 ? (
                        <p className="text-gray-500">Esperando nuevas reacciones...</p>
                    ) : (
                        <ul className="space-y-3">
                            {reactionNotifications.map((notification, index) => (
                                <li key={index} className="bg-purple-50 p-3 rounded-md text-purple-800 border border-purple-200">
                                    {notification}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationFeed;