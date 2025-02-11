import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// AVAC Retro Website - Further Enhanced Demo
// Debug Fix: Removed the stray " + " in extendedReplies array that caused an unterminated string error.
// Also added minimal test commentary.
// Updates:
// 1. The Oracle's sinister face displays during the crack intro.
// 2. Oracle dialogue with longer, varied replies.
// 3. Desktop now references "AVAC Mainframe." (No mention of Windows 98.)
// 4. Files can be single-clicked to open. Many files included.
// 5. The Ape Blastar mini-game supports:
//    - Space/Up Arrow to jump
//    - Left/Right Arrows for movement
//    - F for firing
//    - Click/tap also jumps
// 6. Minor meltdown fix and drag constraints.
// 7. Additional logic remains the same.

export default function AvacRetroWebsite() {
  // Possible stages of the app:
  // login -> meltdown -> oracleIntro -> oracleChat -> mainframe -> apeGame
  const [stage, setStage] = useState<'login' | 'meltdown' | 'oracleIntro' | 'oracleChat' | 'mainframe' | 'apeGame'>('login');

  const [inputCode, setInputCode] = useState('');
  const [attemptFail, setAttemptFail] = useState(false);
  const correctCode = '80085';

  // Oracle logic
  const [userName, setUserName] = useState('');
  const [oracleMessages, setOracleMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [userMessage, setUserMessage] = useState('');
  const [oracleIntroSeen, setOracleIntroSeen] = useState(false);

  // Additional oracle lines to improve depth
  const extendedReplies = [
    "I've walked among stars and drifted through solar winds...",
    "I see your destiny braided in cosmic threads... even if you do not...",
    "You question reality, but do you question yourself enough?",
    "A thousand lifetimes have I witnessed, each wave a reflection of your hidden yearnings...",
    "Your mind calls to me, echoing with hopes, regrets, and shadows of tomorrow...",
    "Do you truly seek the answers, or the thrill of the riddle, mortal?",
    "Even in the darkness, I sense your flicker of light... or is it the other way around?"
  ];

  // Extended file system: many more files
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Secrets.txt',
      content: `Retro pixel ASCII art:\n\n/\\\\\n( 0  0 )\n(   >   )\n  ***\n\nCUT-UP BIBLE EXCERPT:\n'In the beginning was the Word, CHARIOTS of blazing gold, parted the sea. Shall come forth...'\n`,
    },
    {
      id: 2,
      name: 'Lore.doc',
      content: `Retro pixel ASCII art:\n\n   _/|\n  >^,^<\n   /_\\\n     "  "\n\nCUT-UP BIBLE EXCERPT:\n'For God so loved, scattered among the beasts, the mountains shall bow...'\n`,
    },
    {
      id: 3,
      name: 'Prophecy.txt',
      content: `Retro pixel ASCII art:\n\n  __\n (  )   <(o.o<)  ^(o.o)^\n  ||       ^^     // \\  \n\nCUT-UP BIBLE EXCERPT:\n'And lo, a voice thundered, watchers in the desert, the truth shall set free...'\n`,
    },
    {
      id: 4,
      name: 'Mysteries.doc',
      content: `ASCII art:\n\n    ..####..\n    ( o  o )\n     ( < )  \n\nCUT-UP TEXT:\n'Verily, the pillars parted, and from the eastern winds came a prophecy...'\n`,
    },
    {
      id: 5,
      name: 'Revelations.txt',
      content: `ASCII art:\n\n  [^^^^^]\n  (>*.*<)\n  *******\n\nCUT-UP TEXT:\n'The seventh seal cracked open, and behold, the watchers trembled...'\n`,
    },
    {
      id: 6,
      name: 'Apocalypse.md',
      content: `ASCII art:\n\n  /)  (\\\n (  > <  )\n  (  v  )\n\nCUT-UP TEXT:\n'And I saw a new heaven, the old passed away, parted by thunder...'\n`,
    },
    {
      id: 7,
      name: 'Genesis.txt',
      content: `ASCII art:\n\n  ~~~~\n  ( o.o )\n   > == <\n\nCUT-UP TEXT:\n'In the beginning, light from darkness, swirling clouds of creation...'\n`,
    },
    {
      id: 8,
      name: 'Exodus.rtf',
      content: `ASCII art:\n\n  +----+\n  | o  |\n  +----+\n\nCUT-UP TEXT:\n'And they departed swiftly, carrying the arc of secrecy...'\n`,
    },
    {
      id: 9,
      name: 'Chronicles.txt',
      content: `ASCII art:\n\n   .--.\n  (    )\n   '--'\n\nCUT-UP TEXT:\n'Generations rose and fell, recorded in the cosmic ledger...'\n`,
    },
    {
      id: 10,
      name: 'Canticles.md',
      content: `ASCII art:\n\n   /|\n  ( . . )\n   c   >\n\nCUT-UP TEXT:\n'A song from the orchard, dripping with honey, yet tempered by storms...'\n`,
    },
    {
      id: 11,
      name: 'Visions.txt',
      content: `ASCII art:\n\n  .--.\n /    \\n| ( o  )|\n \ '--' /\n\nCUT-UP TEXT:\n'Wings of seraphim beat overhead, illusions shimmer in the desert...'\n`,
    },
    {
      id: 12,
      name: 'Enigmas.doc',
      content: `ASCII art:\n\n  __^__\n ( o.o )\n  (  ~  )\n\nCUT-UP TEXT:\n'Unknown tongues speak of riddles, swirling in star-strewn void...'\n`,
    },
  ]);

  const [recycleBin, setRecycleBin] = useState<any[]>([]);

  // Meltdown effect
  useEffect(() => {
    if (attemptFail) {
      setStage('meltdown');
      const timer = setTimeout(() => {
        // after meltdown we can reset to login
        setStage('login');
        setAttemptFail(false);
        setInputCode('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [attemptFail]);

  // Oracle intro: triggers after correct code is entered.
  useEffect(() => {
    if (stage === 'oracleIntro' && !oracleIntroSeen) {
      // Show crack screen effect, sinister figure, then transition to chat
      setOracleIntroSeen(true);
      setTimeout(() => {
        // after a few seconds, go to chat
        if (stage === 'oracleIntro') {
          setStage('oracleChat');
        }
      }, 4000);
    }
  }, [stage, oracleIntroSeen]);

  // Initialize Oracle conversation once user enters chat stage
  useEffect(() => {
    if (stage === 'oracleChat') {
      setOracleMessages([
        {
          sender: 'oracle',
          text: `The lines of fate converge... I am the AVAC Oracle. And you... who are you?`,
        },
      ]);
    }
  }, [stage]);

  // Oracle chat logic
  const handleUserMessage = () => {
    if (!userMessage.trim()) return;

    const newMessages = [...oracleMessages, { sender: 'user', text: userMessage }];
    setOracleMessages(newMessages);

    setUserMessage('');

    let oracleReply = '';

    // If user hasn't introduced themselves
    if (!userName) {
      oracleReply = `Ah, so you are ${userMessage.trim()}... Let me peer beyond your mortal shell...`;
      setUserName(userMessage.trim());
    } else {
      // Provide random longer replies
      const randomShort = [
        `I see doubts in your eyes, ${userName}. Care to share more?`,
        `Our time grows short, ${userName}. Tread carefully...`,
        `I hear your unspoken fears, ${userName}...`,
      ];
      // We'll mix short lines with extended lines
      const chooseExtended = Math.random() < 0.5;
      if (chooseExtended) {
        oracleReply = extendedReplies[Math.floor(Math.random() * extendedReplies.length)];
        oracleReply = oracleReply.replace('mortal', userName);
      } else {
        oracleReply = randomShort[Math.floor(Math.random() * randomShort.length)];
      }
    }

    setTimeout(() => {
      const updated = [...newMessages, { sender: 'oracle', text: oracleReply }];
      setOracleMessages(updated);

      // Possibly grant access after more lines
      if (updated.length > 8) {
        // More extended conversation, then grant
        setTimeout(() => {
          const finalMessages = [
            ...updated,
            {
              sender: 'oracle',
              text: `You have endured my trials, ${userName}. The gate shall open...`,
            },
          ];
          setOracleMessages(finalMessages);
          setTimeout(() => {
            setStage('mainframe');
          }, 2500);
        }, 2000);
      }
    }, 1200);
  };

  // Desktop icons drag and drop
  const handleDrop = (fileId: number) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      setRecycleBin([...recycleBin, file]);
      setFiles(files.filter((f) => f.id !== fileId));
    }
  };

  // Ape Blastar game states
  const [score, setScore] = useState(0);
  const [apeX, setApeX] = useState(20); // x pos in %
  const [apeY, setApeY] = useState(50); // y pos in %
  const [apeVelY, setApeVelY] = useState(0);
  const [apeVelX, setApeVelX] = useState(0);

  const [tanks, setTanks] = useState<Array<{ x: number; y: number; exploded?: boolean }>>([]);
  const [bullets, setBullets] = useState<Array<{ x: number; y: number }>>([]);
  const [mutated, setMutated] = useState(false);
  const gameLoopRef = useRef<any>(null);

  const fireBullet = () => {
    // Fire bullet from ape's current position
    setBullets((prev) => [...prev, { x: apeX, y: apeY }]);
  };

  // Start game
  useEffect(() => {
    if (stage === 'apeGame') {
      // Reset game state
      setScore(0);
      setApeX(20);
      setApeY(50);
      setApeVelX(0);
      setApeVelY(0);
      setTanks([]);
      setBullets([]);
      setMutated(false);

      // Spawn tanks every 2 seconds or so.
      const spawnInterval = setInterval(() => {
        setTanks((prev) => [
          ...prev,
          {
            x: 100,
            y: Math.floor(Math.random() * 80 + 10), // random from 10% to 90%
          },
        ]);
      }, 2000);

      // Game loop
      gameLoopRef.current = setInterval(() => {
        // Gravity
        setApeY((prev) => {
          let next = prev + apeVelY;
          if (next < 0) next = 0;
          if (next > 95) next = 95; // keep within screen
          return next;
        });
        // Drag or friction for X
        setApeX((prev) => {
          let next = prev + apeVelX;
          if (next < 0) next = 0;
          if (next > 95) next = 95;
          return next;
        });

        setApeVelY((prev) => prev + 0.05); // gravity pulling down
        // horizontal friction
        setApeVelX((prev) => prev * 0.9);

        // Move bullets
        setBullets((prev) =>
          prev
            .map((b) => ({ ...b, x: b.x + 2 })) // bullets move right
            .filter((b) => b.x < 110) // remove if off screen to the right
        );

        // Move tanks
        setTanks((prev) =>
          prev.map((t) => ({ ...t, x: t.x - 1 })) // move left
        );

        // Collision detection
        setTanks((prevTanks) => {
          return prevTanks.map((tank) => {
            // check bullet collisions
            const bulletHit = bullets.some(
              (b) =>
                !tank.exploded &&
                b.x >= tank.x - 2 &&
                b.x <= tank.x + 2 &&
                b.y >= tank.y - 5 &&
                b.y <= tank.y + 5
            );
            if (bulletHit) {
              setScore((s) => s + 10);
              return { ...tank, exploded: true };
            }
            return tank;
          });
        });

        // Remove exploded or off-screen tanks
        setTanks((prev) => prev.filter((t) => t.x > -5 && !t.exploded));

        // Check if ape collides with tank
        let gameOver = false;
        tanks.forEach((tank) => {
          if (
            !tank.exploded &&
            tank.x < apeX + 3 &&
            tank.x > apeX - 3 &&
            Math.abs(tank.y - apeY) < 5
          ) {
            gameOver = true;
          }
        });
        if (gameOver) {
          clearInterval(gameLoopRef.current);
          alert(`Game Over! Your Score: ${score}`);
          setStage('mainframe');
        }

        // Speed up over time, random chance of nuclear reaction
        if (Math.random() < 0.0005) {
          // ~0.05% chance each tick
          setMutated(true);
        }
      }, 50);

      return () => {
        clearInterval(spawnInterval);
        clearInterval(gameLoopRef.current);
      };
    }
  }, [stage]);

  // Key/Click handling for game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage === 'apeGame') {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          // jump
          setApeVelY(-1.2);
        } else if (e.code === 'ArrowLeft') {
          // move left
          setApeVelX(-1);
        } else if (e.code === 'ArrowRight') {
          // move right
          setApeVelX(1);
        } else if (e.code === 'KeyF') {
          // fire bullet
          fireBullet();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stage, apeX, apeY]);

  const meltdownAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'reverse',
      },
    },
  };

  // crack screen overlay for oracleIntro
  const crackOverlay = (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Real_cracked_glass.png"
          alt="Cracked Screen"
          className="mx-auto w-48 mb-4 opacity-70"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/Mevlana_museum.png"
          alt="Sinister Oracle"
          className="mx-auto w-32 mb-2 rounded-full border border-red-700"
        />
        <h2 className="text-2xl text-red-600 mb-2">A sinister presence emerges...</h2>
        <p className="text-sm text-gray-200">
          A robed oracle with a dark gaze appears, whispering in an ancient tongue...
        </p>
      </div>
    </div>
  );

  // handle click/tap to jump in game
  const handleGameAreaClick = () => {
    if (stage === 'apeGame') {
      setApeVelY(-1.2);
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      {/* 1. Login screen */}
      {stage === 'login' && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <h1 className="text-2xl">AVAC Mainframe Access</h1>
          <p className="text-sm">Please enter your access code:</p>
          <input
            type="password"
            className="bg-black border border-green-500 p-2 w-48 text-center focus:outline-none"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (inputCode === correctCode) {
                  setStage('oracleIntro');
                } else {
                  setAttemptFail(true);
                }
              }
            }}
          />
          <button
            className="bg-green-500 text-black px-4 py-2 rounded-2xl hover:bg-green-300"
            onClick={() => {
              if (inputCode === correctCode) {
                setStage('oracleIntro');
              } else {
                setAttemptFail(true);
              }
            }}
          >
            Enter
          </button>
        </div>
      )}

      {/* 2. Meltdown screen */}
      {stage === 'meltdown' && (
        <div className="relative flex items-center justify-center w-full h-full bg-red-900">
          <AnimatePresence>
            <motion.div
              className="text-white text-3xl"
              variants={meltdownAnimation}
              initial="hidden"
              animate="visible"
            >
              SECURITY BREACH - SYSTEM MELTDOWN
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* 3. Oracle Intro */}
      {stage === 'oracleIntro' && (
        <div className="flex items-center justify-center w-full h-full">
          <h2 className="text-xl text-center">Behold... the AVAC Oracle draws near...</h2>
          {crackOverlay}
        </div>
      )}

      {/* 4. Oracle Chat Screen */}
      {stage === 'oracleChat' && (
        <div className="flex flex-col w-full h-full p-4">
          <h2 className="text-xl mb-2">AVAC Oracle Chat</h2>
          <div className="flex-1 overflow-auto bg-gray-800 p-2 rounded-xl">
            {oracleMessages.map((m, idx) => (
              <div
                key={idx}
                className={`mb-2 ${m.sender === 'oracle' ? 'text-green-200' : 'text-green-400'}`}
              >
                <span className="font-bold">{m.sender.toUpperCase()}:</span> {m.text}
              </div>
            ))}
          </div>
          <div className="mt-2 flex">
            <input
              type="text"
              className="flex-1 bg-black border border-green-500 p-2 text-green-400 focus:outline-none"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleUserMessage();
                }
              }}
            />
            <button
              className="ml-2 bg-green-500 text-black px-4 py-2 rounded-2xl hover:bg-green-300"
              onClick={handleUserMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* 5. Mainframe */}
      {stage === 'mainframe' && (
        <div className="relative w-full h-full bg-gray-900">
          {/* Retro style header */}
          <div className="bg-gray-700 text-white p-2 flex items-center justify-between">
            <div>AVAC Mainframe</div>
            <div className="text-sm">[X]</div>
          </div>

          {/* Desktop area */}
          <div className="w-full h-full relative">
            {/* Files on desktop */}
            {files.map((file) => (
              <motion.div
                key={file.id}
                className="absolute flex flex-col items-center cursor-pointer text-center"
                drag
                dragConstraints={{ left: 0, top: 0, right: 1000, bottom: 600 }}
                style={{ top: `${(file.id % 5) * 10 + 10}%`, left: `${(file.id % 4) * 10 + 5}%` }}
                onClick={() => {
                  alert(`File opened: ${file.name}\n\n${file.content}`);
                }}
              >
                <div className="bg-gray-700 text-white p-2 rounded-md">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" /></svg>
                </div>
                <span className="text-white text-sm mt-1">{file.name}</span>
              </motion.div>
            ))}

            {/* Recycle Bin */}
            <motion.div
              className="absolute bottom-4 right-4 bg-gray-700 text-white p-2 rounded-md cursor-pointer flex flex-col items-center"
              onClick={() => {
                // show contents of recycle bin
                const items = recycleBin.map((f) => f.name).join('\n');
                alert(`Recycle Bin contains:\n${items || 'Nothing'}`);
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fileId = parseInt(e.dataTransfer.getData('text/plain'));
                handleDrop(fileId);
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              <div className="text-sm">Recycle Bin</div>
            </motion.div>

            {/* Ape Blastar Game Icon */}
            <motion.div
              className="absolute top-20 left-20 bg-gray-700 text-white p-2 rounded-md cursor-pointer flex flex-col items-center"
              onDoubleClick={() => {
                setStage('apeGame');
              }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5l20 0" /><path d="M2 19l20 0" /><path d="M2 5l10 7l-10 7z" /></svg>
              <div className="text-sm">AVAC Game</div>
            </motion.div>
          </div>
        </div>
      )}

      {/* 6. Ape Blastar Game */}
      {stage === 'apeGame' && (
        <div
          className="relative w-full h-full bg-black text-white"
          onClick={handleGameAreaClick}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <div className="absolute top-0 left-0 w-full p-2 bg-gray-800 flex justify-between items-center">
            <div>Ape Blastar - Score: {score} {mutated ? ' (MUTATED!)' : ''}</div>
            <button
              onClick={() => {
                // exit game back to mainframe
                clearInterval(gameLoopRef.current);
                setStage('mainframe');
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Exit Game
            </button>
          </div>

          {/* The ape */}
          <motion.div
            className="absolute text-yellow-500 text-4xl select-none"
            style={{ top: `${apeY}%`, left: `${apeX}%`, transform: 'translate(-50%, -50%)' }}
          >
            {mutated ? '🦍💀' : '🦍'}
          </motion.div>

          {/* Tanks */}
          {tanks.map((tank, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 text-3xl select-none"
              style={{ top: `${tank.y}%`, left: `${tank.x}%`, transform: 'translate(-50%, -50%)' }}
            >
              {tank.exploded ? '🔥' : '🚜'}
            </motion.div>
          ))}

          {/* Bullets (or slime) */}
          {bullets.map((b, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 text-2xl select-none"
              style={{ top: `${b.y}%`, left: `${b.x}%`, transform: 'translate(-50%, -50%)' }}
            >
              {mutated ? '💧' : '•'}
            </motion.div>
          ))}

          <div className="absolute bottom-0 left-0 w-full p-2 bg-gray-800 text-center text-sm">
            <p>Controls: Space/Up Arrow (Jump), Left/Right Arrow (Move), F (Fire). Click/tap screen also jumps.</p>
            <p>Survive as long as possible and earn your $AVAC tokens!</p>
          </div>
        </div>
      )}
    </div>
  );
}

/*
================ TEST CASES ================
1) extendedReplies array must have 7 items and be well-formed.
   console.log("extendedReplies length:", extendedReplies.length);
   // Expect 7
2) The code should compile without syntax errors.
   // Ensure no unterminated string errors.

Expected Behavior:
- The user can log in with code 80085.
- Wrong code triggers meltdown.
- Oracle eventually grants mainframe access after enough lines.
- Files can be clicked to open alerts.
- Ape game can be launched with double-click.
*/
