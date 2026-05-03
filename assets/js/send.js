function sendMail() {
  // Gather service inputs first
  const services = [];

  const serviceInputs = [
    "service-website",
    "service-seo",
    "service-local-seo",
    "service-google-ads",
    "service-social",
    "service-content",
    "service-email",
    "service-branding",
    "service-ecommerce",
    "service-not-sure",
  ];

  serviceInputs.forEach((id) => {
    const value = document.getElementById(id).value.trim();
    if (value !== "") {
      services.push(value);
    }
  });

  // Gather stage inputs
  const startup = document.getElementById("startup").value;
  const growing = document.getElementById("growing").value;
  const expanding = document.getElementById("expanding").value;

  // Website inputs
  const websiteGood = document.getElementById("website-good").value;
  const websiteNeedsHelp = document.getElementById("website-needs-help").value;
  const websiteBasic = document.getElementById("website-basic").value;
  const websiteNo = document.getElementById("website-no").value;

  // Budget inputs
  const budget1 = document.getElementById("budget1").value;
  const budget2 = document.getElementById("budget2").value;
  const budget3 = document.getElementById("budget3").value;
  const budget4 = document.getElementById("budget4").value;
  const budget5 = document.getElementById("budget5").value;
  const budget6 = document.getElementById("budget6").value;

  // Decision inputs
  const decisionMaker = document.getElementById("decision-yes").value;
  const decisionPartner = document.getElementById("decision-partner").value;
  const decisionTeam = document.getElementById("decision-team").value;

  // Marketing inputs
  const marketingNo = document.getElementById("marketing-no").value;
  const marketingDiy = document.getElementById("marketing-diy").value;
  const marketingAgency = document.getElementById("marketing-agency").value;
  const marketingMixed = document.getElementById("marketing-mixed").value;

  // Final params object
  const params = {
    subject: "Webtech Ninjas: New Strategy Session Request",

    company: document.getElementById("businessName").value,
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    industry: document.getElementById("industry").value,
    startup,
    growing,
    expanding,
    stage: startup || growing || expanding,

    teamSize: document.getElementById("teamSize").value,

    websiteGood,
    websiteNeedsHelp,
    websiteBasic,
    websiteNo,
    website: websiteGood || websiteNeedsHelp || websiteBasic || websiteNo,

    primaryGoal: document.getElementById("primaryGoal").value,
    services,

    currentChallenges: document.getElementById("currentChallenges").value,

    budget1,
    budget2,
    budget3,
    budget4,
    budget5,
    budget6,
    budget: budget1 || budget2 || budget3 || budget4 || budget5 || budget6,

    timeline: document.getElementById("timeline").value,

    decisionMaker,
    decisionPartner,
    decisionTeam,
    decision: decisionMaker || decisionPartner || decisionTeam,

    successMetric: document.getElementById("successMetric").value,
    competitiveAdvantage: document.getElementById("competitiveAdvantage").value,
    mainCompetitors: document.getElementById("mainCompetitors").value,

    marketingNo,
    marketingDiy,
    marketingAgency,
    marketingMixed,
    marketing: marketingNo || marketingDiy || marketingAgency || marketingMixed,
  };

  console.log(params); // or send via fetch to your endpoint
  emailjs
    .send("service_dtvncdq", "template_prqpjdc", params)
    .then(console.log("Email sent successfully!"));
}
