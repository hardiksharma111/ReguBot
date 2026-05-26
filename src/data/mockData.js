const mock = {
  cards: [
    {
      id: "c1",
      source: "RBI/2026/042",
      title: "Implement mandatory data localization protocols for all active credit card log trails within local on-shore data centers.",
      department: "IT",
      priority: "High",
      countdown: { text: "3 days left", status: "amber" },
      stage: "Pending"
    },
    {
      id: "c2",
      source: "SEBI/HO/MIRSD/P/2026/18",
      title: "Update client onboarding forms to capture additional beneficial ownership details for NRI accounts matching updated KYC guidelines.",
      department: "KYC",
      priority: "Medium",
      countdown: { text: "12 days left", status: "neutral" },
      stage: "In Progress"
    },
    {
      id: "c3",
      source: "RBI/2026/011",
      title: "Standardize the computation framework for interest rates offered on short-term MSME development loans.",
      department: "Lending",
      priority: "High",
      countdown: { text: "Overdue - 2 days ago", status: "red" },
      stage: "Awaiting Validation",
      uploaded: "MSME_Lending_Policy_v2.pdf"
    }
  ]
};

export default mock;
