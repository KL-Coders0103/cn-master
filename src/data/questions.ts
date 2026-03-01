export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface QuestionBank {
  [key: string]: Question[];
}

export const questionBank: QuestionBank = {
  OSI: [
    {
      question: "How many layers are in OSI model?",
      options: ["4", "5", "7", "6"],
      answer: "7",
    },
    {
      question: "Which layer handles routing?",
      options: [
        "Transport Layer",
        "Network Layer",
        "Session Layer",
        "Application Layer",
      ],
      answer: "Network Layer",
    },
  ],

  TCPIP: [
    {
      question: "How many layers are in TCP/IP model?",
      options: ["2", "3", "4", "7"],
      answer: "4",
    },
    {
      question: "Which protocol is used for web browsing?",
      options: ["FTP", "HTTP", "SMTP", "SNMP"],
      answer: "HTTP",
    },
  ],
};