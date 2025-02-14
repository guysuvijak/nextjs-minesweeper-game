'use client';

import { useEffect, useState } from 'react';
import { Peer, DataConnection } from 'peerjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const MATCHMAKING_KEY = 'xo_game_matchmaking';

interface GameState {
  board: string[];
  currentTurn: string;
  mySymbol: string;
  winner: string | null;
  isDraw: boolean;
  readyToRestart: boolean;
}

interface GameMove {
  type: 'MOVE' | 'RESTART_REQUEST';
  index: number;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export default function Home() {
  const [peerId, setPeerId] = useState('');
  const [peer, setPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<DataConnection | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [opponentId, setOpponentId] = useState('');
  const [error, setError] = useState('');
  const [opponentReadyToRestart, setOpponentReadyToRestart] = useState(false);
  console.log(opponentId)
  
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(''),
    currentTurn: '',
    mySymbol: '',
    winner: null,
    isDraw: false,
    readyToRestart: false
  });

  const checkWinner = (board: string[]): string | null => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board: string[]): boolean => {
    return board.every(cell => cell !== '') && !checkWinner(board);
  };

  useEffect(() => {
    const initPeer = () => {
      try {
        //const newPeer = new Peer({
        //  host: 'localhost',
        //  port: 9000,
        //  path: '/myapp',
        //  debug: 3
        //});

        const newPeer = new Peer({
          host: 'nextjs-game-webrtc.vercel.app',
          secure: true, // สำหรับ HTTPS
          port: 443,    // สำหรับ HTTPS
          debug: 3
        });

        newPeer.on('open', (id) => {
          setPeerId(id);
          localStorage.setItem(MATCHMAKING_KEY, JSON.stringify([]));
        });

        newPeer.on('connection', handleConnection);
        newPeer.on('error', handleError);

        setPeer(newPeer);

        return () => {
          removeFromMatchmaking();
          newPeer.destroy();
        };
      } catch (err) {
        setError('Failed to initialize peer connection');
        console.error(err);
      }
    };

    initPeer();
  },[]);

  const startNewGame = () => {
    const isStarter = Math.random() < 0.5;
    const mySymbol = isStarter ? 'X' : 'O';
    
    setGameState({
      board: Array(9).fill(''),
      currentTurn: 'X',
      mySymbol,
      winner: null,
      isDraw: false,
      readyToRestart: false
    });
    setOpponentReadyToRestart(false);
  };

  const handleConnection = (conn: DataConnection) => {
    setConnection(conn);
    setOpponentId(conn.peer);
    setIsSearching(false);
    removeFromMatchmaking();

    startNewGame();

    function isGameMove(data: unknown): data is GameMove {
      if (!data || typeof data !== 'object') return false;
      const move = data as Record<string, unknown>;
      return (
        (move.type === 'MOVE' || move.type === 'RESTART_REQUEST') &&
        (move.index === undefined || typeof move.index === 'number')
      );
    }

    conn.on('data', (data: unknown) => {
      if (!isGameMove(data)) return;
      
      if (data.type === 'MOVE' && typeof data.index === 'number') {
        setGameState(prev => {
          const newBoard = [...prev.board];
          newBoard[data.index] = prev.mySymbol === 'X' ? 'O' : 'X';
          
          const winner = checkWinner(newBoard);
          const isDraw = checkDraw(newBoard);
    
          return {
            ...prev,
            board: newBoard,
            currentTurn: prev.mySymbol,
            winner,
            isDraw
          };
        });
      } else if (data.type === 'RESTART_REQUEST') {
        setOpponentReadyToRestart(true);
        
        if (gameState.readyToRestart) {
          startNewGame();
        }
      }
    });

    conn.on('close', () => {
      setConnection(null);
      setOpponentId('');
      setOpponentReadyToRestart(false);
      setGameState({
        board: Array(9).fill(''),
        currentTurn: '',
        mySymbol: '',
        winner: null,
        isDraw: false,
        readyToRestart: false
      });
    });
  };

  const handleError = (err: Error) => {
    setError(err.message);
    setIsSearching(false);
    removeFromMatchmaking();
  };

  const removeFromMatchmaking = () => {
    try {
      const currentPool = JSON.parse(localStorage.getItem(MATCHMAKING_KEY) || '[]');
      const updated = currentPool.filter((id: string) => id !== peerId);
      localStorage.setItem(MATCHMAKING_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error removing from matchmaking:', err);
    }
  };

  const startMatchmaking = async () => {
    if (!peer || isSearching) return;

    setIsSearching(true);
    setError('');

    try {
      const currentPool = JSON.parse(localStorage.getItem(MATCHMAKING_KEY) || '[]');
      const availablePeers = currentPool.filter((id: string) => id !== peerId);

      if (availablePeers.length > 0) {
        const opponent = availablePeers[0];
        const conn = peer.connect(opponent, { reliable: true });

        conn.on('open', () => {
          handleConnection(conn);
        });

        conn.on('error', () => {
          const remaining = availablePeers.filter((id: string) => id !== opponent);
          localStorage.setItem(MATCHMAKING_KEY, JSON.stringify(remaining));
          setError('Connection failed, retrying...');
          startMatchmaking();
        });
      } else {
        localStorage.setItem(MATCHMAKING_KEY, JSON.stringify([peerId]));
      }
    } catch (err) {
      setError('Matchmaking failed' + err);
      setIsSearching(false);
    }
  };

  const handleMove = (index: number) => {
    if (!connection || 
        gameState.board[index] !== '' || 
        gameState.currentTurn !== gameState.mySymbol || 
        gameState.winner || 
        gameState.isDraw) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.mySymbol;

    const winner = checkWinner(newBoard);
    const isDraw = checkDraw(newBoard);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentTurn: prev.mySymbol === 'X' ? 'O' : 'X',
      winner,
      isDraw
    }));

    connection.send({ type: 'MOVE', index });
  };

  const requestRestart = () => {
    if (!connection) return;
    
    setGameState(prev => ({ ...prev, readyToRestart: true }));
    connection.send({ type: 'RESTART_REQUEST' });

    // If opponent is already ready, start new game
    if (opponentReadyToRestart) {
      startNewGame();
    }
  };

  const cancelMatchmaking = () => {
    setIsSearching(false);
    removeFromMatchmaking();
  };

  const canRestart = gameState.readyToRestart && opponentReadyToRestart;
  const isGameOver = gameState.winner || gameState.isDraw;

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <Card className='max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-center'>XO Game</CardTitle>
        </CardHeader>
        
        <CardContent className='space-y-4'>
          {!connection ? (
            <>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-500'>Your ID:</span>
                <Badge variant='secondary' className='font-mono'>{peerId}</Badge>
              </div>
              
              {error && (
                <Alert variant='destructive'>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                className='w-full'
                onClick={isSearching ? cancelMatchmaking : startMatchmaking}
                disabled={!peer}
              >
                {isSearching ? 'Cancel Search' : 'Find Match'}
              </Button>
              
              {isSearching && (
                <p className='text-sm animate-pulse text-center text-gray-500'>
                  Searching for players...
                </p>
              )}
            </>
          ) : (
            <>
              <div className='text-center space-y-2 mb-4'>
                <Badge variant='outline' className='mb-2'>
                  Playing as: {gameState.mySymbol}
                </Badge>
                
                {!isGameOver && (
                  <Alert>
                    <AlertDescription>
                      {gameState.currentTurn === gameState.mySymbol ? 
                        'Your turn' : 'Opponent turn'}
                    </AlertDescription>
                  </Alert>
                )}

                {gameState.winner && (
                  <Alert variant={gameState.winner === gameState.mySymbol ? 'default' : 'destructive'}>
                    <AlertDescription>
                      {gameState.winner === gameState.mySymbol ? 'You won!' : 'Opponent won!'}
                    </AlertDescription>
                  </Alert>
                )}

                {gameState.isDraw && (
                  <Alert>
                    <AlertDescription>Game is a draw!</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className='grid grid-cols-3 gap-2 mb-4'>
                {gameState.board.map((cell, index) => (
                  <Button
                    key={index}
                    variant={cell ? 'secondary' : 'outline'}
                    className='h-20 text-2xl font-bold'
                    onClick={() => handleMove(index)}
                    disabled={cell !== '' || 
                             gameState.currentTurn !== gameState.mySymbol ||
                             isGameOver as boolean}
                  >
                    {cell}
                  </Button>
                ))}
              </div>

              {isGameOver && (
                <div className='text-center'>
                  <Button
                    onClick={requestRestart}
                    disabled={gameState.readyToRestart}
                  >
                    {canRestart ? 'Starting new game...' :
                     gameState.readyToRestart ? 'Waiting for opponent...' :
                     'Play Again'}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}