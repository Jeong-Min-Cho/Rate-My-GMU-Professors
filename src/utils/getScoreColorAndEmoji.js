const GetOverallScoreColor = (score) => {
  if (score >= 3.5) {
    return {
      color: "bg-green-600",
      emoji: score == 5.0 ? "💪" : "👍",
      comment: score == 5.0 ? "Must Take" : "Excellent",
    };
  } else if (score >= 2.5) {
    return { color: "bg-yellow-400", emoji: "👌", comment: "Fine" };
  }
  return { color: "bg-red-500", emoji: "🤞", comment: "Good Luck" };
};

const GetEasyScoreColor = (score) => {
  if (score >= 70) {
    return { color: "bg-green-600", emoji: score == 100 ? "🥰" : "😊" };
  } else if (score >= 35) {
    return { color: "#FFC300", emoji: "😐" };
  }
  return { color: "bg-red-500", emoji: "😱" };
};

const GetDifficultyColor = (score) => {
  if (score >= 4.0) {
    return { color: "bg-red-500", emoji: score == 5.0 ? "🚫" : "🌶️" };
  } else if (score >= 2.5) {
    return { color: "bg-yellow-400", emoji: "🆗" };
  }
  return { color: "bg-green-600", emoji: "🍰" };
};

export { GetOverallScoreColor, GetEasyScoreColor, GetDifficultyColor };
