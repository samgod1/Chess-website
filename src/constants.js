const coursesText =
    "Brand has courses for all levels of players. The courses are structured precisely to help you improve quickly. The courses are designed by top chess players with decades of experience.";
const coursesTextArray = coursesText.split(" ");

const visualizedMoves = [
    { move: "kc3", top: "4%", left: "-15%" },
    { move: "qg2", top: "-5%", right: "4%" },
    { move: "bd1", top: "-8%", left: "5%" },
    { move: "e5", top: "18%", right: "-5%" },
    { move: "qa3", top: "20%", left: "-30%" },
    { move: "be6", top: "3%", right: "-18%" },
    { move: "e4", top: "34%", left: "-10%" },
    { move: "rh7", top: "18%", left: "-4%" },
    { move: "kf6", top: "22%", right: "-25%" },
    { move: "rd8", top: "35%", right: "-2%" },
];

const beginnerCourse = [
    {
        courseId: "ej_fnsdsksA",
        title: "How to play chess",
        desc: "Learn the basic rules, how pieces move, and the ultimate goal of the game.",
        thumbnail: "https://i.ytimg.com/vi_webp/ej_fnsdsksA/maxresdefault.webp",
    },
    {
        courseId: "Wjvy_TH1qQs",
        title: "Basic checkmate patterns",
        desc: "Master essential checkmating techniques to finish your games successfully.",
        thumbnail: "https://i.ytimg.com/vi_webp/Wjvy_TH1qQs/maxresdefault.webp",
    },
    {
        courseId: "b6PR885Rgb8",
        title: "Chess notation",
        desc: "Understand how to read and write chess moves using algebraic notation.",
        thumbnail: "https://i.ytimg.com/vi_webp/b6PR885Rgb8/maxresdefault.webp",
    },
    {
        courseId: "kMn0Vf1zEdg",
        title: "Board vision",
        desc: "Improve your ability to scan the board and spot tactical threats quickly.",
        thumbnail: "https://i.ytimg.com/vi/kMn0Vf1zEdg/maxresdefault.jpg",
    },
    {
        courseId: "TemLSMDKSMw",
        title: "The best beginner opening",
        desc: "A reliable and straightforward opening strategy to start your games strong.",
        thumbnail: "https://i.ytimg.com/vi/TemLSMDKSMw/maxresdefault.jpg",
    },
    {
        courseId: "rmbU97iftC8",
        title: "The Caro-Kann Defense",
        desc: "An introduction to a solid, resilient opening choice for Black against 1.e4.",
        thumbnail: "https://i.ytimg.com/vi/rmbU97iftC8/maxresdefault.jpg",
    },
];

const intermediateCourse = [
    {
        courseId: "aavP_NnrXS8",
        title: "10 Chess tips",
        desc: "Quick, actionable advice to immediately improve your general decision-making.",
        thumbnail: "https://i.ytimg.com/vi/aavP_NnrXS8/maxresdefault.jpg",
    },
    {
        courseId: "akBKIsl167Q",
        title: "Every chess tactic",
        desc: "A comprehensive breakdown of essential tactical patterns to spot winning opportunities.",
        thumbnail: "https://i.ytimg.com/vi/akBKIsl167Q/maxresdefault.jpg",
    },
    {
        courseId: "KbjRYez_me0",
        title: "Every Chess Tip",
        desc: "Core strategic principles and advice to elevate your positional understanding.",
        thumbnail: "https://i.ytimg.com/vi/KbjRYez_me0/maxresdefault.jpg",
    },
    {
        courseId: "u8MKyE9Qt8I",
        title: "How to make a plan",
        desc: "Learn how to evaluate a position and formulate an effective middlegame strategy.",
        thumbnail: "https://i.ytimg.com/vi/u8MKyE9Qt8I/maxresdefault.jpg",
    },
    {
        courseId: "tO3Xhz7c-rg",
        title: "Basic endgames",
        desc: "Master critical endgame concepts and techniques to cleanly convert your advantages.",
        thumbnail: "https://i.ytimg.com/vi/tO3Xhz7c-rg/maxresdefault.jpg",
    },
    {
        courseId: "9Ga9dP3bvN8",
        title: "How to calculate in chess",
        desc: "Improve your visualization and systematically calculate concrete variations.",
        thumbnail: "https://i.ytimg.com/vi/9Ga9dP3bvN8/maxresdefault.jpg",
    },
    {
        courseId: "ylpAHvPlafc",
        title: "How to analyze",
        desc: "Learn how to review your games, spot mistakes, and find better alternatives.",
        thumbnail: "https://i.ytimg.com/vi/ylpAHvPlafc/maxresdefault.jpg",
    },
    {
        courseId: "wdwxErflrY0",
        title: "Time management",
        desc: "Practical strategies to handle clock pressure and avoid critical mistakes under time trouble.",
        thumbnail: "https://i.ytimg.com/vi/wdwxErflrY0/maxresdefault.jpg",
    },
    {
        courseId: "Vlpx04FeELI",
        title: "How to actually get better at chess",
        desc: "A structured approach to efficient training habits and meaningful rating growth.",
        thumbnail: "https://i.ytimg.com/vi/Vlpx04FeELI/maxresdefault.jpg",
    },
];

const advanceCourse = [
    {
        courseId: "J-7_RbF1USU",
        title: "10 rules to get better than 95% of players",
        desc: "Learn ten essential rules to elevate your game and outperform the vast majority of players.",
        thumbnail: "https://i.ytimg.com/vi/J-7_RbF1USU/maxresdefault.jpg",
    },
    {
        courseId: "eJTtVlgOg2w",
        title: "How to use pawns",
        desc: "Understand pawn structures and how to effectively utilize your pawns to control the board.",
        thumbnail: "https://i.ytimg.com/vi/eJTtVlgOg2w/maxresdefault.jpg",
    },
    {
        courseId: "YKEXns2Ed_0",
        title: "Spotting weaknesses",
        desc: "Learn how to identify and exploit tactical and positional weaknesses in your opponent's camp.",
        thumbnail: "https://i.ytimg.com/vi/YKEXns2Ed_0/maxresdefault.jpg",
    },
    {
        courseId: "O1keZYdPgD0",
        title: "The woodpecker method",
        desc: "Master this repetitive puzzle-solving technique to dramatically improve your tactical vision.",
        thumbnail: "https://i.ytimg.com/vi/O1keZYdPgD0/maxresdefault.jpg",
    },
    {
        courseId: "IvxhIozo_zo",
        title: "Play endgame like magnus",
        desc: "Discover the endgame principles and grinding techniques used by World Champion Magnus Carlsen.",
        thumbnail: "https://i.ytimg.com/vi/IvxhIozo_zo/maxresdefault.jpg",
    },
];

const puzzles = [
    "6Qk/p1p3pp/4N3/1p6/2q1r1n1/2B5/PP4PP/3R1R1K b - - 0 28,h8g8 f1f8",
    "2kr1b1r/p1p2pp1/2pqb3/7p/3N2n1/2NPB3/PPP2PPP/R2Q1RK1 w - - 2 13,d4e6 d6h2",
    "5kr1/ppR3p1/3R3p/8/1r1n4/8/1P3PPP/2K5 b - - 4 31,d4b5 d6d8",
    "6k1/1Q4p1/p1p4p/3pP3/P3bq2/2N4P/1P4PK/5B2 w - - 1 26,h2h1 f4f1 h1h2 f1g2",
    "6k1/2q2p1p/4pPp1/4P3/p1pP1P2/RrP5/6QP/4B1K1 b - - 0 33,b3a3 g2a8 c7b8 a8b8",
    "5rk1/5Rpp/1q1p4/2pB4/6Q1/2b4P/Pr4P1/6K1 b - - 0 29,f8f7 g4c8 b6d8 c8d8",
    "5k2/1R4p1/p2bpr1p/3rN3/3P4/8/P1R2pPP/5K2 b - - 1 34,d6e5 c2c8 d5d8 c8d8",
    "3r2k1/1Rp1qpp1/7p/8/5Q2/1PP5/5PPP/3r1RK1 w - - 5 26,b7c7 d1f1 g1f1 d8d1",
    "2r3k1/p4pp1/1pPR2r1/8/1P2p3/P1Q1B1pq/4PP1P/2R3K1 w - - 0 34,d6g6 h3h2 g1f1 h2h1",
    "2rq2k1/1p3p1p/p3p1pP/3pP1Q1/1P1P4/5N2/2R2PP1/6K1 b - - 0 39,d8g5 c2c8 g5d8 c8d8",
    "8/kp6/p7/8/8/2Q2b2/PPPq1P1b/R5K1 w - - 2 30,g1h2 d2f2 h2h3 f2g2 h3h4 g2g4",
    "4rr1k/p1pp3p/1p4p1/3Q4/2P4q/8/PP2RPPP/R5K1 w - - 5 19,a1e1 h4f2 e2f2 e8e1 f2f1 e1f1",
    "5r1k/5prp/1p1N1Q2/p7/1P2p3/P2n2q1/2B4R/5R1K w - - 3 32,d6f5 d3f2 h2f2 g3h3 f2h2 h3f1",
    "r2q3k/5Pb1/2n3Bp/3p2pP/pp1P2Q1/6B1/1PP5/6K1 b - - 0 39,g7d4 g4d4 c6d4 g3e5 d8f6 e5f6",
    "5R2/p2rp1k1/7p/1p3Qp1/3P1p2/1BP5/P1Pq1KPP/8 w - - 7 33,f2f3 d2e3 f3g4 e3e2 g4h3 e2h5",
    "5rk1/1Q3ppp/8/4P1b1/qp1p4/3P2P1/1B4BP/2R3K1 w - - 3 29,c1c8 g5e3 g1h1 a4d1 g2f1 d1f1",
    "8/P7/8/4bBp1/6Pp/1R5K/3r4/5k2 w - - 1 46,b3f3 f1g1 f3f1 g1f1 a7a8q d2h2",
    "2r5/p1p2k1p/2R3p1/5p2/4rK1P/P3P1P1/5P2/2R5 w - - 3 28,f4g5 h7h6 g5h6 c8h8 h6g5 e4g4",
    "6k1/2p1bRp1/1rB3Kp/r3P3/pp6/6P1/PP5P/3R4 b - - 5 38,e7f8 f7f8 g8f8 d1d8 f8e7 d8e8",
    "3r2k1/R4p1p/1Q3bp1/1B1b3r/PP4q1/4P1P1/3N1PP1/1R4K1 w - - 1 28,b6f6 h5h1 g1h1 g4h3 h1g1 h3g2",
    "6k1/p2Q4/3p2p1/8/3qPn2/5P2/PPR3PP/6K1 w - - 2 37,c2f2 f4e2 g1h1 d4d1 f2f1 d1f1",
    "1r1r3k/q3Nppp/3Qb3/8/8/P2B2P1/1PP5/1K5R b - - 4 35,h7h6 h1h6 g7h6 d6e5 f7f6 e5f6",
    "r3kb1r/5ppp/p4n1q/1p3P2/3BB1Q1/8/PPP3PP/3RR1K1 b kq - 0 18,f6g4 e4c6 e8d8 d4b6 d8c8 e1e8",
    "2r1Q1k1/p4ppp/1pp5/2b3Bn/2P5/5P1q/PPP2P1P/3RR1K1 b - - 6 22,c8e8 e1e8 c5f8 e8f8 g8f8 d1d8",
    "6k1/pp2rnp1/2p5/3p3B/3P2Q1/1P6/PKPq4/5R2 b - - 3 32,f7h6 f1f8 g8f8 g4c8 e7e8 c8e8",
    "8/8/4p1p1/1r1p1kP1/1P1P1P2/6Kp/1R6/8 b - - 1 44,h3h2 b2e2 h2h1n g3f3 e6e5 e2e5",
    "5rk1/pppq2pp/8/2Q5/5B2/P5P1/1n5P/5RK1 b - - 1 31,b2a4 c5f8 g8f8 f4d6 f8g8 f1f8",
    "rnb2rk1/ppp1pp1p/6pQ/4P2P/4p3/8/PqP2PP1/3RKBNR b K - 1 12,c8f5 h6f8 g8f8 d1d8 f8g7 h5h6",
    "1r2r1kb/2q1Bp1p/3R2B1/p7/5P2/1Pp4P/P1Q3R1/1K6 b - - 0 33,h7g6 d6g6 f7g6 c2g6 h8g7 g6g7",
    "r2q1b1r/pp2nQpk/8/3P1N1p/2Pn1PP1/N2p2P1/PP6/R1B1K2R b KQ - 0 17,e7f5 h1h5 f5h6 h5h6 h7h6 f7h5",
];

const pieceImages = {
    r: "black-rook.png",
    b: "black-bishop.png",
    q: "black-queen.png",
    n: "black-knight.png",
    k: "black-king.png",
    p: "black-pawn.png",
    R: "white-rook.png",
    B: "white-bishop.png",
    Q: "white-queen.png",
    N: "white-knight.png",
    K: "white-king.png",
    P: "white-pawn.png",
};

export {
    coursesTextArray,
    visualizedMoves,
    beginnerCourse,
    intermediateCourse,
    advanceCourse,
    puzzles,
    pieceImages,
};
