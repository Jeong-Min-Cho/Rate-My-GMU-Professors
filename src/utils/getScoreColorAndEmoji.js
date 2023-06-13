const COLORS = {
  GREEN: "bg-green-600",
  YELLOW: "bg-yellow-400",
  RED: "bg-red-500",
};

const EMOJIS = {
  STRONG: "💪",
  GOOD: "👍",
  FINE: "👌",
  NEUTRAL: "😐",
  LUCK: "🤞",
  HAPPY: "🥰",
  SURPRISED: "😱",
  HOT: "🌶️",
  OK: "🆗",
  CAKE: "🍰",
  FORBIDDEN: "🚫",
};

const COMMENTS = {
  MUST_TAKE: "Must Take",
  EXCELLENT: "Excellent",
  FINE: "Fine",
  GOOD_LUCK: "Good Luck",
};

const GetOverallScoreColor = (score) => {
  if (score >= 3.5) {
    return {
      color: COLORS.GREEN,
      emoji: score === 5.0 ? EMOJIS.STRONG : EMOJIS.GOOD,
      comment: score === 5.0 ? COMMENTS.MUST_TAKE : COMMENTS.EXCELLENT,
    };
  } else if (score >= 2.5) {
    return {
      color: COLORS.YELLOW,
      emoji: EMOJIS.FINE,
      comment: COMMENTS.FINE,
    };
  }
  return {
    color: COLORS.RED,
    emoji: EMOJIS.LUCK,
    comment: COMMENTS.GOOD_LUCK,
  };
};

const GetEasyScoreColor = (score) => {
  if (score >= 70) {
    return {
      color: COLORS.GREEN,
      emoji: score === 100 ? EMOJIS.HAPPY : EMOJIS.NEUTRAL,
    };
  } else if (score >= 35) {
    return {
      color: COLORS.YELLOW,
      emoji: EMOJIS.NEUTRAL,
    };
  }
  return {
    color: COLORS.RED,
    emoji: EMOJIS.SURPRISED,
  };
};

const GetDifficultyColor = (score) => {
  if (score >= 4.0) {
    return {
      color: COLORS.RED,
      emoji: score === 5.0 ? EMOJIS.FORBIDDEN : EMOJIS.HOT,
    };
  } else if (score >= 2.5) {
    return {
      color: COLORS.YELLOW,
      emoji: EMOJIS.OK,
    };
  }
  return {
    color: COLORS.GREEN,
    emoji: EMOJIS.CAKE,
  };
};

export { GetOverallScoreColor, GetEasyScoreColor, GetDifficultyColor };
