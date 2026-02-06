import { Objection } from "@/types/guided";

export const commonObjections: Objection[] = [
  {
    id: "obj-cost",
    objection: "The solution is too expensive for our budget.",
    response:
      "I understand budget is a key consideration. Our pricing is designed to scale with your usage, so you only pay for what you need. Many customers see a positive ROI within the first quarter through reduced manual effort and faster time-to-insight. Let me walk you through a cost-benefit analysis tailored to your use case.",
    dataPoints: [
      "Average customer ROI of 3.5x within the first 12 months.",
      "Flexible pricing tiers starting with a free trial.",
      "Reduction in manual processing costs by up to 60%.",
    ],
  },
  {
    id: "obj-accuracy",
    objection: "How can we trust the accuracy of AI-generated outputs?",
    response:
      "That is an excellent question and one we take very seriously. Our models are built on IBM's foundation models with rigorous testing and validation. We provide confidence scores, citations, and source linking so users can verify every output. Additionally, you can fine-tune models on your own data to improve domain-specific accuracy.",
    dataPoints: [
      "Built-in confidence scoring on all outputs.",
      "Citation and source-linking for full traceability.",
      "Customer-reported accuracy rates above 95% after fine-tuning.",
    ],
  },
  {
    id: "obj-security",
    objection: "We have strict data security and compliance requirements.",
    response:
      "Security and compliance are foundational to our platform. We offer deployment options including on-premises, private cloud, and dedicated tenancy to meet your requirements. Our platform is compliant with SOC 2, HIPAA, GDPR, and other major frameworks. Your data is never used to train shared models.",
    dataPoints: [
      "SOC 2 Type II, HIPAA, and GDPR compliant.",
      "On-premises and private cloud deployment options available.",
      "Data isolation -- customer data is never shared or used for model training.",
    ],
  },
  {
    id: "obj-integration",
    objection: "We are concerned about integration with our existing systems.",
    response:
      "Our platform is designed for seamless integration. We provide RESTful APIs, SDKs for major programming languages, and pre-built connectors for popular enterprise tools like Salesforce, ServiceNow, and SAP. Our professional services team can also assist with custom integrations to ensure a smooth deployment.",
    dataPoints: [
      "RESTful APIs and SDKs for Python, Java, and Node.js.",
      "Pre-built connectors for 20+ enterprise platforms.",
      "Average integration time of 2-4 weeks with professional services support.",
    ],
  },
  {
    id: "obj-vendor-lock",
    objection: "We do not want to be locked into a single vendor.",
    response:
      "We share that philosophy. Our platform is built on open standards and supports open-source model formats. You can export your data and models at any time. We also support hybrid and multi-cloud deployments, so you maintain flexibility and control over your AI strategy.",
    dataPoints: [
      "Support for open-source model formats (ONNX, Hugging Face).",
      "Full data and model export capabilities.",
      "Multi-cloud support across AWS, Azure, GCP, and IBM Cloud.",
    ],
  },
  {
    id: "obj-team-skills",
    objection: "Our team does not have the AI expertise to use this effectively.",
    response:
      "That is a common concern, and we have built our platform to be accessible to users at all skill levels. The no-code interface allows business users to get started without any programming. For technical teams, we offer comprehensive documentation, training programs, and dedicated customer success managers to help your team ramp up quickly.",
    dataPoints: [
      "No-code interface for business users with drag-and-drop workflows.",
      "Free training and certification programs included with enterprise plans.",
      "Dedicated customer success manager assigned to every enterprise account.",
    ],
  },
];
