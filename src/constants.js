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
        title: "How to play chess",
        desc: "Learn the basic rules, how pieces move, and the ultimate goal of the game.",
        thumbnail:
            "https://i.ytimg.com/vi/ej_fnsdsksA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDgBUmc1d3kCk5nsV1SrmerFHin7A",
    },
    {
        title: "Basic checkmate patterns",
        desc: "Master essential checkmating techniques to finish your games successfully.",
        thumbnail: "https://i.ytimg.com/vi_webp/Wjvy_TH1qQs/maxresdefault.webp",
    },
    {
        title: "Chess notation",
        desc: "Understand how to read and write chess moves using algebraic notation.",
        thumbnail: "https://i.ytimg.com/vi_webp/b6PR885Rgb8/maxresdefault.webp",
    },
    {
        title: "Board vision",
        desc: "Improve your ability to scan the board and spot tactical threats quickly.",
        thumbnail: "https://i.ytimg.com/vi/kMn0Vf1zEdg/maxresdefault.jpg",
    },
    {
        title: "10 Chess tips",
        desc: "Quick, actionable advice to immediately improve your general decision-making.",
        thumbnail: "https://i.ytimg.com/vi/aavP_NnrXS8/maxresdefault.jpg",
    },
    {
        title: "The best beginner opening",
        desc: "A reliable and straightforward opening strategy to start your games strong.",
        thumbnail: "https://i.ytimg.com/vi/TemLSMDKSMw/maxresdefault.jpg",
    },
    {
        title: "The Caro-Kann Defense",
        desc: "An introduction to a solid, resilient opening choice for Black against 1.e4.",
        thumbnail: "https://i.ytimg.com/vi/rmbU97iftC8/maxresdefault.jpg",
    },
    {
        title: "How to analyze",
        desc: "Learn how to review your games, spot mistakes, and find better alternatives.",
        thumbnail: "https://i.ytimg.com/vi/ylpAHvPlafc/maxresdefault.jpg",
    },
];

const intermediateCourse = [
    {
        title: "Every chess tactic",
        desc: "A comprehensive breakdown of essential tactical patterns to spot winning opportunities.",
        thumbnail: "https://i.ytimg.com/vi/akBKIsl167Q/maxresdefault.jpg",
    },
    {
        title: "Every Chess Tip",
        desc: "Core strategic principles and advice to elevate your positional understanding.",
        thumbnail: "https://i.ytimg.com/vi/KbjRYez_me0/maxresdefault.jpg",
    },
    {
        title: "How to make a plan",
        desc: "Learn how to evaluate a position and formulate an effective middlegame strategy.",
        thumbnail: "https://i.ytimg.com/vi/u8MKyE9Qt8I/maxresdefault.jpg",
    },
    {
        title: "Basic endgames",
        desc: "Master critical endgame concepts and techniques to cleanly convert your advantages.",
        thumbnail: "https://i.ytimg.com/vi/tO3Xhz7c-rg/maxresdefault.jpg",
    },
    {
        title: "How to calculate in chess",
        desc: "Improve your visualization and systematically calculate concrete variations.",
        thumbnail: "https://i.ytimg.com/vi/9Ga9dP3bvN8/maxresdefault.jpg",
    },
    {
        title: "Time management",
        desc: "Practical strategies to handle clock pressure and avoid critical mistakes under time trouble.",
        thumbnail: "https://i.ytimg.com/vi/wdwxErflrY0/maxresdefault.jpg",
    },
    {
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
        link: "",
    },
];

export {
    coursesTextArray,
    visualizedMoves,
    beginnerCourse,
    intermediateCourse,
    professionalCourse,
};
