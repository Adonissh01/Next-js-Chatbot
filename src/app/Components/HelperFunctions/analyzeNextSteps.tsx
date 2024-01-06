const data = require('./data.json');

export const analyzeNextSteps = (step : number, userResponse : string) => {
  const responseKey = userResponse.toLowerCase();

  if (step === 0) {
    return {
      purpose: "specify field",
      message: data[step].message.replace('%s', userResponse),
      options: data[step].options
    };
  } else if (data[responseKey]) {
    return data[responseKey];
  } else {
    return data.default;
  }
};
