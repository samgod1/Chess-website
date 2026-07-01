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
        link: "https://youtu.be/ej_fnsdsksA?si=DS5rrFojh0WLgsFH",
    },
    {
        title: "Basic checkmate patterns",
        desc: "Master essential checkmating techniques to finish your games successfully.",
        thumbnail: "https://i.ytimg.com/vi_webp/Wjvy_TH1qQs/maxresdefault.webp",
        link: "https://youtu.be/Wjvy_TH1qQs?si=928MP97DDDPjF4RV",
    },
    {
        title: "Chess notation",
        desc: "Understand how to read and write chess moves using algebraic notation.",
        thumbnail: "https://i.ytimg.com/vi_webp/b6PR885Rgb8/maxresdefault.webp",
        link: "https://youtu.be/b6PR885Rgb8?si=HRkjNfoR33HvJdMC",
    },
    {
        title: "Board vision",
        desc: "Improve your ability to scan the board and spot tactical threats quickly.",
        thumbnail: "https://i.ytimg.com/vi/kMn0Vf1zEdg/maxresdefault.jpg",
        link: "https://youtu.be/kMn0Vf1zEdg?si=-4QwGp5zXkp8wTwZ",
    },
    {
        title: "10 Chess tips",
        desc: "Quick, actionable advice to immediately improve your general decision-making.",
        thumbnail: "https://i.ytimg.com/vi/aavP_NnrXS8/maxresdefault.jpg",
        link: "https://youtu.be/aavP_NnrXS8?si=CAjmSVbcTPfLxYLx",
    },
    {
        title: "The best beginner opening",
        desc: "A reliable and straightforward opening strategy to start your games strong.",
        thumbnail: "https://i.ytimg.com/vi/TemLSMDKSMw/maxresdefault.jpg",
        link: "https://youtu.be/TemLSMDKSMw?si=K6vaG6AzaSMDP-Nm",
    },
    {
        title: "The Caro-Kann Defense",
        desc: "An introduction to a solid, resilient opening choice for Black against 1.e4.",
        thumbnail: "https://i.ytimg.com/vi/rmbU97iftC8/maxresdefault.jpg",
        link: "https://youtu.be/rmbU97iftC8?si=2JZciuIq1DtYTmOQ",
    },
    {
        title: "How to analyze",
        desc: "Learn how to review your games, spot mistakes, and find better alternatives.",
        thumbnail: "https://i.ytimg.com/vi/ylpAHvPlafc/maxresdefault.jpg",
        link: "https://youtu.be/ylpAHvPlafc?si=MTBQEVH6S1w_MyrO",
    },
];

const intermediateCourse = [
    {
        title: "Hello",
        desc: "alkdjflajflsjdf",
        thumbnail: "/images/thumbnail2.jpg",
        link: "",
    },
    {
        title: "Hello",
        desc: "alkdjflajflsjdf",
        thumbnail: "/images/thumbnail2.jpg",
        link: "",
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
