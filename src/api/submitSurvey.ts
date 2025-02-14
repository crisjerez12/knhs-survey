import supabase from "../lib/supabase";

const satisfactionScores = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree",
  "N/A",
];

function convertToNumericScore(answer: string): number {
  const index = satisfactionScores.indexOf(answer);
  if (index === -1) {
    throw new Error(`Invalid satisfaction answer: ${answer}`);
  }
  return 5 - index;
}

export async function submitSurvey(data: any) {
  const responded = localStorage.getItem("responded");
  if (responded) return;

  localStorage.setItem("responded", JSON.stringify("yes"));
  const { ccAnswers, clientInfo, satisfactionAnswers } = data;
  const response = {
    cc1: ccAnswers.cc1,
    cc2: ccAnswers.cc2,
    cc3: ccAnswers.cc3,
    age: clientInfo.age,
    clientType: clientInfo.clientType,
    region: clientInfo.region,
    sex: clientInfo.sex,
    serviceAvailed: clientInfo.serviceAvailed,
    satisfaction1: convertToNumericScore(satisfactionAnswers.satisfaction1),
    satisfaction2: convertToNumericScore(satisfactionAnswers.satisfaction2),
    satisfaction3: convertToNumericScore(satisfactionAnswers.satisfaction3),
    satisfaction4: convertToNumericScore(satisfactionAnswers.satisfaction4),
    satisfaction5: convertToNumericScore(satisfactionAnswers.satisfaction5),
    satisfaction6: convertToNumericScore(satisfactionAnswers.satisfaction6),
    satisfaction7: convertToNumericScore(satisfactionAnswers.satisfaction7),
    satisfaction8: convertToNumericScore(satisfactionAnswers.satisfaction8),
    satisfaction9: convertToNumericScore(satisfactionAnswers.satisfaction9),
  };

  await supabase.from("tbl_online_response").insert([response]);
}
