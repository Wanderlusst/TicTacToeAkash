import React, { use } from 'react'

function test() {
    const [board, setBoard] = React.useState(Array(9).fill(null));
    const [next, isNext] = React.useState(true);
    const [winner, setWinner] = React.useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = next ? 'X' : 'O';
        setBoard(newBoard);
        isNext(!next);
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                break;
            }
        }

        if (!board.includes(null)) {
            setWinner('Draw');
        }
    }

    React.useEffect(() => {
        checkWinner();
    }, [board]);


    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
    };



    return (
        <div className='flex flex-col items-center gap-10'>
            'welcome to tic tac toe'
            {
                winner && (
                    <div>
                        <h1>{winner == 'X' ? 'Player 1' : 'Player 2'} wins</h1>
                        {
                            <>
                            {window?.alert(winner == 'X' ? 'Player 1' : 'Player 2' + ' wins')}
                            </>
                            
                        }
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleReset}>Play Again</button>
                    </div>
                )
            }


            <div className='grid grid-cols-3 gap-3 items-center max-w-2xl '>
                {
                    board.map((value, index) => (
                        <div key={index} className='text-center border-2 border-black w-14 h-14 cursor-pointer' onClick={() => handleClick(index)}>
                            {value}
                        </div>
                    ))

                }
            </div>


        </div>
    )
}

export default test
