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
        courseId: "aavP_NnrXS8",
        title: "10 Chess tips",
        desc: "Quick, actionable advice to immediately improve your general decision-making.",
        thumbnail: "https://i.ytimg.com/vi/aavP_NnrXS8/maxresdefault.jpg",
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
    {
        courseId: "ylpAHvPlafc",
        title: "How to analyze",
        desc: "Learn how to review your games, spot mistakes, and find better alternatives.",
        thumbnail: "https://i.ytimg.com/vi/ylpAHvPlafc/maxresdefault.jpg",
    },
];

const intermediateCourse = [
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

const professionalCourse = [
    {
        title: "World",
        desc: "alkdjflajflsjdf",
        thumbnail: "/images/thumbnail2.jpg",
    },
];

const puzzles = [
    // "8/8/8/3p4/3R4/8/8/8 b",
    "r3r1k1/p4ppp/2p2n2/1p6/3P1qb1/2NQR3/PPB2PP1/R1B3K1 w - - 5,e3g3 e8e1 g1h2 e1c1 a1c1 f4h6 h2g1 h6c1",
    "Q1b2r1k/p2np2p/5bp1/q7/5P2/4B3/PPP3PP/2KR1B1R w - - 1,d1d7 a5e1 d7d1 e1e3 c1b1 e3b6",
    "1k1r4/pp3pp1/2p1p3/4b3/P3n1P1/8/KPP2PN1/3rBR1R b - - 2,b8c7 e1a5 b7b6 f1d1",
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
    professionalCourse,
    puzzles,
    pieceImages,
};
