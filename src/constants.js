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

export { coursesTextArray, visualizedMoves };
