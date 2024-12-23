import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const cards = [
  { suit: '♥️', value: 'A' },
  { suit: '♥️', value: '2' },
  { suit: '♥️', value: '3' },
  { suit: '♥️', value: '4' },
  { suit: '♥️', value: '5' },
  { suit: '♥️', value: '6' },
  { suit: '♥️', value: '7' },
  { suit: '♥️', value: '8' },
  { suit: '♥️', value: '9' },
  { suit: '♥️', value: '10' },
  { suit: '♥️', value: 'J' },
  { suit: '♥️', value: 'Q' },
  { suit: '♥️', value: 'K' },

  { suit: '♦️', value: 'A' },
  { suit: '♦️', value: '2' },
  { suit: '♦️', value: '3' },
  { suit: '♦️', value: '4' },
  { suit: '♦️', value: '5' },
  { suit: '♦️', value: '6' },
  { suit: '♦️', value: '7' },
  { suit: '♦️', value: '8' },
  { suit: '♦️', value: '9' },
  { suit: '♦️', value: '10' },
  { suit: '♦️', value: 'J' },
  { suit: '♦️', value: 'Q' },
  { suit: '♦️', value: 'K' },

  { suit: '♣️', value: 'A' },
  { suit: '♣️', value: '2' },
  { suit: '♣️', value: '3' },
  { suit: '♣️', value: '4' },
  { suit: '♣️', value: '5' },
  { suit: '♣️', value: '6' },
  { suit: '♣️', value: '7' },
  { suit: '♣️', value: '8' },
  { suit: '♣️', value: '9' },
  { suit: '♣️', value: '10' },
  { suit: '♣️', value: 'J' },
  { suit: '♣️', value: 'Q' },
  { suit: '♣️', value: 'K' },

  { suit: '♠️', value: 'A' },
  { suit: '♠️', value: '2' },
  { suit: '♠️', value: '3' },
  { suit: '♠️', value: '4' },
  { suit: '♠️', value: '5' },
  { suit: '♠️', value: '6' },
  { suit: '♠️', value: '7' },
  { suit: '♠️', value: '8' },
  { suit: '♠️', value: '9' },
  { suit: '♠️', value: '10' },
  { suit: '♠️', value: 'J' },
  { suit: '♠️', value: 'Q' },
  { suit: '♠️', value: 'K' }
];

const dealerCards = [
  { suit: '♥️', value: 'A' },
  { suit: '♥️', value: '2' },
  { mistery: true },
]

function App() {
  const dialogRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      dialogRef.current.open();
    }, 1200);
  }, []);

  const handleHit = () => {
    setTimeout(() => {
      dialogRef.current.close();
    }, 1000);
  };

  const handleStay = () => {
    setTimeout(() => {
      dialogRef.current.close();
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <div className='table'>
        <div className='row rotate'>
          <div className="col">
            <PlayerCards cards={[]}>
              <Player score={10} username='Todor' />
            </PlayerCards>
          </div>
          <div className="col">
            <PlayerCards cards={[]}>
              <Player score={10} username='Todor' />
            </PlayerCards>
          </div>
          <div className="col center">
            <DealerCards cards={dealerCards}>
              <Player score={18} username='Dealer' />
            </DealerCards>
            <PlayerCards cards={[]}>
              <Player score={10} username='Todor' />
            </PlayerCards>
          </div>
          <div className="col">
            <PlayerCards cards={[]}>
              <Player score={10} username='Todor' />
            </PlayerCards>
          </div>
          <div className="col">
            <PlayerSeat />
          </div>
        </div>
        <h1 className='table-name'>Casino Royal</h1>
      </div>
      {/* <div className='stats'>
        <Stat title='Balance' value='$ 200,03' />
        <Stat title='Total Bet' value='$ 0' />
      </div> */}
      <section className='stats'>
        <Stat title='Balance' value='$ 200,03' />
        <Stat title='Total Bet' value='$ 0' />
      </section>
      <Chat />
      <ActionDialog doHit={handleHit} doStay={handleStay} ref={dialogRef} />
    </>
  )
}

function Chat() {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <aside className={`chat-wrapper ${open ? null : 'closed'}`}>
      <div>
        <button className='close-chat' onClick={handleMenu}>
          {
            open ? <i className="fa-solid fa-xmark" /> : <i className="fa-solid fa-message" />
          }
        </button>
      </div>
      <div className='chat-messages'>
        <p className='message'>
          <span className='author'>Todor</span>
          <span className='content'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, repellat?</span>
        </p>
      </div>
      <form className='chat'>
        <textarea placeholder='Type your message' />
        <button type='submit'>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </aside>
  );
}

const ActionDialog = forwardRef(({ doHit, doStay }, ref) => {
  const dialogRef = useRef();
  const [{ hit, stay }, setActions] = useState({ hit: false, stay: false });

  const reset = () => setActions({ hit: false, stay: false });

  useImperativeHandle(ref, () => (
    {
      open() {
        reset();
        dialogRef.current.show();
      },
      close() {
        dialogRef.current.close();
      },
      reset() {
        reset();
      }
    }
  ), []);

  const decisionNotMade = !hit && !stay;

  const handleHit = () => {
    setActions(prev => ({ ...prev, stay: true }));
    decisionNotMade && doHit();
  };

  const handleStay = () => {
    setActions(prev => ({ ...prev, hit: true }));
    decisionNotMade && doStay();
  };

  return (
    <dialog ref={dialogRef} className='action-dialog'>
      <div className='actions-wrapper'>
        {/* Add timer here */}
        <p className='title'>Make your decision</p>
        <div className='action-btn-wrapper'>
          <button className={`action-btn hit ${hit && 'disabled'}`} disabled={hit} onClick={handleHit}>
            <span>
              <i className="fa-solid fa-plus" />
            </span>
            <span>
              Hit
            </span>
          </button>
          <button className={`action-btn stay ${stay && 'disabled'}`} disabled={stay} onClick={handleStay}>
            <span>
              <i className="fa-solid fa-minus" />
            </span>
            <span>
              Stay
            </span>
          </button>
        </div>
      </div>
    </dialog>
  );
});

function Card({ suit, value, mistery = false }) {
  return mistery ? (
    <div className='card mistery'>
      <span>?</span>
    </div>
  ) : (
    <div className="card">
      <div className="corner top-left">
        <span>{suit}</span>
        <span>{value}</span>
      </div>
      <div className="suit">{suit}</div>
      <div className="corner bottom-right">
        <span>{value}</span>
        <span>{suit}</span>
      </div>
    </div>
  );
}

function DealerCards({ children, cards }) {
  return (
    <div className='cards'>
      {children}
      <div className='cards-box'>
        <ul className='cards-list'>
          {
            cards.map(card => <li><Card {...card} /></li>)
          }
        </ul>
      </div>
    </div>
  );
}

function PlayerCards({ children, cards }) {
  return (
    <div className='cards'>
      <div className='cards-box'>
        {
          cards.map(card => <Card {...card} />)
        }
      </div>
      {children}
    </div>
  );
}

function Player({ username, score }) {
  return (
    <div className='player'>
      <p className='username'>{username}</p>
      <div className='player-box' />
      <span className='score'>{score}</span>
    </div>
  );
}

function PlayerSeat() {
  return (
    <div className='player-seat'>
      <div className='player-box' />
      <button className='join-btn'>
        Take a seat
      </button>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <p className='stat'>
      <span>{title}</span>
      <strong>{value}</strong>
    </p>
  );
}

function Navigation() {
  return (
    <nav>
      <h1>Royal</h1>
      <ul>
        <li>
          <button className='nav-btn' title='Invite'>
            <i className="fa-solid fa-link" />
          </button>
        </li>
        <li>
          <button className='nav-btn' title='Log out'>
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default App
